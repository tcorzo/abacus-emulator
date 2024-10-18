import { Program, Register } from './program';
import { Execution } from './execution';

class AbacusEmulator {
    private program: Program | null = null;
    private execution!: Execution;

    loadProgram(program: Program) {
        this.program = program;
        this.execution = {
            accumulator: '0000',
            current_address: program.registers[0].address,
            registers: new Map<string, Register>()
        };

        for (const register of program.registers) {
            this.execution.registers.set(register.address, register);
        }

        for (const auxRegister of program.aux_registers) {
            this.execution.registers.set(auxRegister.address, auxRegister);
        }
    }

    run() {
        if (!this.program) {
            throw new Error('No program loaded');
        }

        while (this.execution.current_address !== '000') {
            const register = this.execution.registers.get(this.execution.current_address);
            if (register === undefined) {
                throw new Error(`Register at address ${this.execution.current_address} is undefined`);
            }

            const operation = this.program.operations.find(operation => operation.code === register.opcode());
            if (operation === undefined) {
                throw new Error(`Operation with code ${register.opcode()} is undefined`);
            }

            const old_address = this.execution.current_address;

            operation.operation_type.execute(this.execution);

            if (old_address === this.execution.current_address) {
                this.execution.current_address = (
                    parseInt(this.execution.current_address, 16) + 1
                ).toString(16).padStart(3, '0');
            }
        }
    }
}

export default AbacusEmulator;
