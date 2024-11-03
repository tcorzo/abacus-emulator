import { Program } from "@/abacus/program.ts";

export class ProgramExporter {
    static exportToCSV(program: Program): string {
        const lines: string[] = [];

        // Export Operations section
        lines.push('OPERATIONS,,');
        lines.push('OPCODE,OPERATION,');
        program.operations.forEach(operation => {
            lines.push(`${operation.code},${operation.operation_type.id},`);
        });
        lines.push('');

        // Export AUX section
        lines.push('AUX,,');
        lines.push('ADDR,VALUE,COMMENT');
        program.aux_registers.forEach(register => {
            lines.push(`${register.address},${register.value},${register.comment}`);
        });
        lines.push('');

        // Export PROGRAM section
        lines.push('PROGRAM,,');
        lines.push('ADDR,VALUE,COMMENT');
        program.registers.forEach(register => {
            lines.push(`${register.address},${register.value},${register.comment}`);
        });
        lines.push('');

        // Export DATA section
        lines.push('DATA,,');
        lines.push('ADDR,VALUE,COMMENT');
        program.data_registers.forEach(register => {
            lines.push(`${register.address},${register.value},${register.comment}`);
        });

        return lines.join('\n');
    }
}
