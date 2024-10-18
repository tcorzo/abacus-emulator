import type AbacusEmulator from "./abacus.ts";

export interface OperationType {
    name: string;
    description: string;
    execute: (this: AbacusEmulator) => void;
}

export const INMEDIATE_LOAD: OperationType = {
    name: 'Carga Inmediata',
    description: 'Carga el valor del registro actual en el acumulador',
    execute: function (this: AbacusEmulator) {
        const register = this.getRegister(this.current_address);
        this.accumulator = register.operand();
    }
};

export const LOAD: OperationType = {
    name: 'Carga',
    description: 'Carga el valor del registro con dirección = valor del registro actual en el acumulador',
    execute: function (this: AbacusEmulator) {
        const currentRegister = this.getRegister(this.current_address);
        const register = this.getRegister(currentRegister.operand());
        this.accumulator = register.operand(); // TODO check if this is correct
    }
};

export const STORE: OperationType = {
    name: 'Almacena',
    description: 'Almacena AC en',
    execute: function (this: AbacusEmulator) {
        const currentRegister = this.getRegister(this.current_address);
        const register = this.getRegister(currentRegister.operand());
        register.value = this.accumulator;
    }
};

export const ADD: OperationType = {
    name: 'Suma',
    description: 'Suma AC con',
    execute: function (this: AbacusEmulator) {
        const register = this.getRegister(this.current_address);
        this.accumulator = (
            parseInt(this.accumulator, 16) + parseInt(register.operand(), 16)
        ).toString(16).padStart(4, '0');
    }
};

export const SUBTRACT: OperationType = {
    name: 'Resta',
    description: 'Resta AC con',

    execute: function (this: AbacusEmulator) {
        const register = this.getRegister(this.current_address);
        if (register === undefined) {
            throw new Error(`Register at address ${this.current_address} is undefined`);
        }

        this.accumulator = (
            parseInt(this.accumulator, 16) - parseInt(register.operand(), 16)
        ).toString(16).padStart(4, '0');
    }
};

export const NOT: OperationType = {
    name: 'NOT',
    description: 'NOT AC',
    execute: function (this: AbacusEmulator) {
        this.accumulator = (
            (~parseInt(this.accumulator, 16) & 0xFFFF)
        ).toString(16).padStart(4, '0').toUpperCase();
    }
};

export const BIF_IF_EQ: OperationType = {
    name: 'Bifurca si AC = 0',
    description: 'Bifurca si (AC == 0)',
    execute: function (this: AbacusEmulator) {
        if (this.accumulator === '0000') {
            const register = this.getRegister(this.current_address);
            this.current_address = register.operand();
        }
    }
};

export const BIF_IF_L: OperationType = {
    name: 'Bifurca si AC < 0',
    description: 'Bifurca si (AC < 0)',
    execute: function (this: AbacusEmulator) {
        if (parseInt(this.accumulator, 16) < 0) {
            const register = this.getRegister(this.current_address);
            if (register === undefined) {
                throw new Error(`Register at address ${this.current_address} is undefined`);
            }

            this.current_address = register.operand();
        }
    }
};

export const BIF_IF_G: OperationType = {
    name: 'Bifurca si AC > 0',
    description: 'Bifurca si (AC > 0)',
    execute: function (this: AbacusEmulator) {
        if (parseInt(this.accumulator, 16) > 0) {
            const register = this.getRegister(this.current_address);
            if (register === undefined) {
                throw new Error(`Register at address ${this.current_address} is undefined`);
            }

            this.current_address = register.operand();
        }
    }
};

const END: OperationType = {
    name: 'Fin de Programa',
    description: 'Termina la ejecución',
    execute: function (this: AbacusEmulator) {
        this.current_address = '000';
    }
};

export const OperationTypes = {
    INMEDIATE_LOAD,
    LOAD,
    STORE,
    ADD,
    SUBTRACT,
    NOT,
    BIF_IF_EQ,
    BIF_IF_L,
    BIF_IF_G,
    END
};
