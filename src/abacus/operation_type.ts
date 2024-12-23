import type AbacusEmulator from "./abacus.ts";

export interface OperationType {
    id: string;
    name: string;
    execute: (this: AbacusEmulator) => void;
}

export const IMMEDIATE_LOAD: OperationType = {
    id: 'IMMEDIATE_LOAD',
    name: 'Carga Inmediata',
    execute: function (this: AbacusEmulator) {
        this.accumulator = this.current_register.operand;
    }
};

export const LOAD: OperationType = {
    id: 'LOAD',
    name: 'Carga',
    execute: function (this: AbacusEmulator) {
        const register = this.getRegister(this.current_register.operand);
        this.accumulator = register.value;
    }
};

export const STORE: OperationType = {
    id: 'STORE',
    name: 'Almacena',
    execute: function (this: AbacusEmulator) {
        const register = this.getRegister(this.current_register.operand);
        register.value = this.accumulator;
    }
};

export const ADD: OperationType = {
    id: 'ADD',
    name: 'Suma',
    execute: function (this: AbacusEmulator) {
        const register = this.getRegister(this.current_register.operand);
        this.accumulator = (
            parseInt(this.accumulator, 16) + parseInt(register.value, 16)
        ).toString(16);
    }
};

export const NOT: OperationType = {
    id: 'NOT',
    name: 'NOT',
    execute: function (this: AbacusEmulator) {
        this.accumulator = (
            (~parseInt(this.accumulator, 16) & 0xFFFF)
        ).toString(16);
    }
};

export const JUMP_IF_ZERO: OperationType = {
    id: 'JUMP_IF_ZERO',
    name: 'Bifurca si AC = 0',
    execute: function (this: AbacusEmulator) {
        if (this.accumulator === '0000')
            this.current_address = this.current_register.operand;
    }
};

export const JUMP_IF_NEGATIVE: OperationType = {
    id: 'JUMP_IF_NEGATIVE',
    name: 'Bifurca si AC < 0',
    execute: function (this: AbacusEmulator) {
        if ((parseInt(this.accumulator, 16) & 0x8000) !== 0) {
            const value = parseInt(this.accumulator, 16) - 0x10000;
            if (value < 0) {
                this.current_address = this.current_register.operand;
            }
        }
    }
};

export const JUMP_IF_POSITIVE: OperationType = {
    id: 'JUMP_IF_POSITIVE',
    name: 'Bifurca si AC > 0',
    execute: function (this: AbacusEmulator) {
        const value = parseInt(this.accumulator, 16);
        if (value < 0x8000 && value > 0) {
            this.current_address = this.current_register.operand;
        }
    }
};

const END: OperationType = {
    id: 'END',
    name: 'Fin de Program',
    execute: function (this: AbacusEmulator) {
        this.finished = true;
    }
};

export const OperationTypes = {
    IMMEDIATE_LOAD,
    LOAD,
    STORE,
    ADD,
    NOT,
    JUMP_IF_ZERO,
    JUMP_IF_NEGATIVE,
    JUMP_IF_POSITIVE,
    END
};

export function getOperationTypeById(id: string): OperationType | undefined {
    return Object.values(OperationTypes).find(operationType => operationType.id === id);
}
