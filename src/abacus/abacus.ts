import { Program, Register } from './program.ts';
import { OperationType } from './operation_type.ts';

export default class AbacusEmulator {
    private program: Program | null = null;
    private operations: Map<string, OperationType> = new Map();
    private _accumulator: string = '0000'; // 4 bytes
    public current_address: string = '000'; // 3 bytes for the address
    public registers: Map<string, Register> = new Map(); // 3 bytes for the address

    constructor() { }

    public get accumulator(): string {
        return this._accumulator;
    }

    public set accumulator(v: string) {
        this._accumulator = v.padStart(4, '0');
    }

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
        const opcode = register.opcode();
        const operation = this.operations.get(opcode);

        if (!operation) {
            console.error(`Unknown operation code: ${opcode} at address ${this.current_address}`);
            // Optionally, you can choose to halt execution or skip to the next instruction
            this.current_address = (parseInt(this.current_address, 16) + 1).toString(16).padStart(3, '0');
            return;
        }

        const old_address = this.current_address;

        try {
            operation.execute.call(this);
        } catch (error) {
            console.error(`Error executing operation ${opcode} at address ${this.current_address}:`, error);
            // Optionally, you can choose to halt execution here
        }

        if (old_address === this.current_address) {
            this.current_address = (parseInt(this.current_address, 16) + 1).toString(16).padStart(3, '0');
        }
    }
}
