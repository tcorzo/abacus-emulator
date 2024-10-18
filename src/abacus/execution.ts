import { Register } from "./program.ts";


export interface Execution {
    accumulator: string; // 4 bytes
    current_address: string; // 3 bytes for the address
    registers: Map<string, Register>; // 3 bytes for the address
}
