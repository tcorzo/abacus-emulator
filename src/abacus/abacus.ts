import { Program, Register } from './program.ts';
import { OperationType } from './operation_type.ts';

export default class AbacusEmulator {
    private program: Program | null = null;
    private operations: Map<string, OperationType> = new Map();
    private _accumulator: string = '0000'; // 4 bytes
    private _current_address: string = '000'; // 3 bytes for the address
    public registers: Map<string, Register> = new Map(); // 3 bytes for the address
    public _breakpoints: string[] = [];

    constructor() { }

    public get accumulator(): string {
        return this._accumulator;
    }

    public set accumulator(v: string) {
        // We slice the least 4 significant bytes to avoid storing overflows
        this._accumulator = v.toUpperCase().slice(-4).padStart(4, '0');
    }

    public get current_address() {
        return this._current_address;
    }

    public set current_address(v: string) {
        this._current_address = v.toUpperCase().padStart(3, '0');
    }

    public get current_register(): Register {
        return this.getRegister(this.current_address);
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

    public addBreakpoint(address: string): void {
        this._breakpoints.push(address);
    }

    public hasBreakpoint(address: string): boolean {
        return this._breakpoints.includes(address);
    }

    /**
     * removeBreakpoint
     */
    public removeBreakpoint(address: string): void {
        const index = this._breakpoints.indexOf(address);
        if (index > -1)
            this._breakpoints.splice(index, 1);

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

        // Continue after current breakpoint
        if (this.hasBreakpoint(this.current_address))
            this.step();

        while (true) {
            // End of program
            if (this.current_address === '000')
                break;

            // Breakpoint
            if (this.hasBreakpoint(this.current_address))
                break;

            this.step();
        }
    }

    public step() {
        if (!this.program)
            throw new Error('No program loaded');

        if (this.current_address === '000')
            return;

        const operation = this.operations.get(this.current_register.opcode);

        if (!operation) {
            console.error(`Unknown operation code: ${this.current_register.opcode} at address ${this.current_address}`);
            throw new Error("Unknown operation code");
        }

        const old_address = this.current_address;

        operation.execute.call(this);

        // Don't increment address if the operation is a jump
        if (old_address === this.current_address)
            this.current_address = this.nextAddress();
    }

    private nextAddress(): string {
        return (parseInt(this.current_address, 16) + 1).toString(16).toUpperCase().padStart(3, '0');
    }
}
