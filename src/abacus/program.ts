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

    public clone(): Register {
        return new Register({ address: this.address, value: this.value, comment: this.comment });
    }

}

export class Program {
    name: string;
    description: string;
    operations: Operation[];
    aux_registers: Register[];
    registers: Register[];

    constructor(name: string, description: string, operations: Operation[], aux_registers: Register[], registers: Register[]) {
        this.name = name;
        this.description = description;
        this.operations = operations;
        this.aux_registers = aux_registers;
        this.registers = registers;
    }

    public clone(): Program {
        return new Program(
            this.name,
            this.description,
            [...this.operations],
            this.aux_registers.map(r => r.clone()),
            this.registers.map(r => r.clone())
        );
    }

}
