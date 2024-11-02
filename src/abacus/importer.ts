import { Operation, Program, Register } from './program.ts';
import { OperationType, getOperationTypeById } from '../abacus/operation_type.ts';

export class ProgramImporter {
    static importFromCSV(content: string): Program {
        const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        let section: 'OPERATIONS' | 'AUX' | 'PROGRAM' | null = null;
        const operations: Operation[] = [];
        const auxRegisters: Register[] = [];
        const registers: Register[] = [];

        for (const line of lines) {
            const [col1, col2, col3] = line.split(',').map(col => col.trim());

            if (col1 === 'OPERATIONS' || col1 === 'AUX' || col1 === 'PROGRAM') {
                section = col1 as 'OPERATIONS' | 'AUX' | 'PROGRAM';
                continue;
            }

            // Skip header rows
            if (col1 === 'OPCODE' || col1 === 'ADDR' || col1 === 'OPERATION' || col1 === 'VALUE' || col1 === 'COMMENT') {
                continue;
            }

            switch (section) {
                case 'OPERATIONS': {
                    if (!col1 || !col2) continue;
                    const operationType = getOperationTypeById(col2);
                    if (!operationType)
                        throw new Error(`Unknown operation type: ${col2}`);

                    operations.push({ code: col1, operation_type: operationType as OperationType });
                    break;
                }
                case 'AUX': {
                    if (!col1) continue;
                    auxRegisters.push(new Register({
                        address: col1,
                        value: col2 || '0000',
                        comment: col3 || ''
                    }));
                    break;
                }
                case 'PROGRAM': {
                    if (!col1) continue;
                    registers.push(new Register({
                        address: col1,
                        value: col2 || '0000',
                        comment: col3 || ''
                    }));
                    break;
                }
            }
        }

        return new Program({
            name: 'imported_program',
            description: '',
            operations,
            aux_registers: auxRegisters,
            registers
        });
    }
}
