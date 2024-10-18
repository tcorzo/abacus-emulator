import { Register } from "./program.ts";


export class Execution {
    accumulator: string; // 4 bytes
    current_address: string; // 3 bytes for the address
    private registers: Map<string, Register>; // 3 bytes for the address

    constructor(accumulator: string, current_address: string, registers: Map<string, Register>) {
        this.accumulator = accumulator;
        this.current_address = current_address;
        this.registers = registers;
    }

    getRegister(address: string): Register {
        let register = this.registers.get(address);
        if (register === undefined) {
            register = new Register(address, '0000');
            this.registers.set(address, register);
        }

        return register;
    }

    setRegister(address: string, register: Register) {
        this.registers.set(address, register);
    }
}
