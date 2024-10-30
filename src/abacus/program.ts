import { OperationType } from "./operation_type.ts";

export interface Operation {
    code: string; // 1 byte for the operation code
    operation_type: OperationType;
}

export class Register {
    address: string = ''; // 3 bytes for the address
    value: string = ''; // 4 bytes -> 1 byte for the operation code and 3 bytes for the operand
    comment: string = '';

    constructor({ address, value, comment = '' }: { address: string, value: string, comment: string }) {
        this.address = address;
        this.value = value.padStart(4, '0');
        this.comment = comment;
    }

    public get opcode(): string {
        return this.value.slice(0, 1);
    }

    public get operand(): string {
        return this.value.slice(-3);
    }

}

export interface Program {
    name: string;
    description: string;
    operations: Operation[];
    aux_registers: Register[];
    registers: Register[];
}
