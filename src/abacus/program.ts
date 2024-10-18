import { OperationType } from "./operation_type.ts";

export interface Operation {
    code: string; // 1 byte for the operation code
    operation_type: OperationType;
}

export class Register {
    address: string = ''; // 3 bytes for the address
    value: string = ''; // 4 bytes -> 1 byte for the operation code and 3 bytes for the operand
    comment: string = '';
    opcode: () => string = () => this.value.slice(0, 1);
    operand: () => string = () => this.value.slice(-3);

    constructor(address: string, value: string, comment: string = '') {
        this.address = address;
        this.value = value.padStart(4, '0');
        this.comment = comment;
    }

}

export interface Program {
    name: string;
    description: string;
    operations: Operation[];
    aux_registers: Register[];
    registers: Register[];
}
