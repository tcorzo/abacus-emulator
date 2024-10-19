import { Program, Register } from './program.ts';
import { OperationType } from './operation_type.ts';

export default class AbacusEmulator {
    private program: Program | null = null;
    private operations: Map<string, OperationType> = new Map();
    public accumulator: string = '0000'; // 4 bytes
    public current_address: string = '000'; // 3 bytes for the address
    public registers: Map<string, Register> = new Map(); // 3 bytes for the address

    constructor() { }

    public getRegister(address: string): Register {
        let register = this.registers.get(address);
        if (!register) {
            register = new Register({ address: address, value: '0000', comment: '' });
            this.registers.set(address, register);
        }
        return register;
    }

    public setRegister(address: string, register: Register): void {
        this.registers.set(address, register);
    }

    public loadProgram(program: Program): void {
        this.program = program;
        this.accumulator = '0000';
        this.current_address = program.registers[0].address;
        this.registers = new Map(program.registers.map(r => [r.address, r]));

        for (const auxRegister of program.aux_registers) {
            this.setRegister(auxRegister.address, auxRegister);
        }

        for (const operation of program.operations) {
            this.operations.set(operation.code, operation.operation_type);
        }
    }

    public run() {
        if (!this.program) {
            throw new Error('No program loaded');
        }

        while (this.current_address !== '000') {
            this.step();
        }
    }

    public step() {
        if (!this.program) {
            throw new Error('No program loaded');
        }

        if (this.current_address === '000')
            return;

        const register = this.getRegister(this.current_address);

        const operation = this.operations.get(register.opcode());
        if (operation === undefined)
            throw new Error(`Operation with code ${register.opcode()} is undefined`);

        const old_address = this.current_address;

        operation.execute.call(this);

        if (old_address === this.current_address) {
            this.current_address = (
                parseInt(this.current_address, 16) + 1
            ).toString(16).padStart(3, '0');
        }

    }
}
