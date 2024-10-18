import { Execution } from "../abacus/execution.ts";

export interface OperationType {
    name: string;
    description: string;
    execute: (execution: Execution) => void;
}

export const LOAD: OperationType = {
    name: 'Carga',
    description: 'Carga inmediata',
    execute: (execution: Execution) => {
        const register = execution.registers.get(execution.current_address);
        if (register === undefined) {
            throw new Error(`Register at address ${execution.current_address} is undefined`);
        }

        execution.accumulator = register.value;
    }
};
export const STORE: OperationType = {
    name: 'Almacena',
    description: 'Almacena AC en',
    execute: (execution: Execution) => {
        const register = execution.registers.get(execution.current_address);
        if (register === undefined) {
            throw new Error(`Register at address ${execution.current_address} is undefined`);
        }

        register.value = execution.accumulator;
    }
};
export const ADD: OperationType = {
    name: 'Suma',
    description: 'Suma AC con',
    execute: (execution: Execution) => {
        const register = execution.registers.get(execution.current_address);
        if (register === undefined) {
            throw new Error(`Register at address ${execution.current_address} is undefined`);
        }

        execution.accumulator = (
            parseInt(execution.accumulator, 16) + parseInt(register.operand(), 16)
        ).toString(16).padStart(4, '0');
    }
};
export const SUBTRACT: OperationType = {
    name: 'Resta',
    description: 'Resta AC con',

    execute: (execution: Execution) => {
        const register = execution.registers.get(execution.current_address);
        if (register === undefined) {
            throw new Error(`Register at address ${execution.current_address} is undefined`);
        }

        execution.accumulator = (
            parseInt(execution.accumulator, 16) - parseInt(register.operand(), 16)
        ).toString(16).padStart(4, '0');
    }
};
export const NOT: OperationType = {
    name: 'NOT',
    description: 'NOT AC',
    execute: (execution: Execution) => {
        execution.accumulator = (
            ~parseInt(execution.accumulator, 16)
        ).toString(16).padStart(4, '0');
    }
};
export const BIF_IF_EQ: OperationType = {
    name: 'Bifurca si AC = 0',
    description: 'Bifurca si (AC == 0)',
    execute: (execution: Execution) => {
        if (execution.accumulator === '0000') {
            const register = execution.registers.get(execution.current_address);
            if (register === undefined) {
                throw new Error(`Register at address ${execution.current_address} is undefined`);
            }

            execution.current_address = register.operand();
        }
    }
};
export const BIF_IF_L: OperationType = {
    name: 'Bifurca si AC < 0',
    description: 'Bifurca si (AC < 0)',
    execute: (execution: Execution) => {
        if (parseInt(execution.accumulator, 16) < 0) {
            const register = execution.registers.get(execution.current_address);
            if (register === undefined) {
                throw new Error(`Register at address ${execution.current_address} is undefined`);
            }

            execution.current_address = register.operand();
        }
    }
};
export const BIF_IF_G: OperationType = {
    name: 'Bifurca si AC > 0',
    description: 'Bifurca si (AC > 0)',
    execute: (execution: Execution) => {
        if (parseInt(execution.accumulator, 16) > 0) {
            const register = execution.registers.get(execution.current_address);
            if (register === undefined) {
                throw new Error(`Register at address ${execution.current_address} is undefined`);
            }

            execution.current_address = register.operand();
        }
    }
};
const END: OperationType = {
    name: 'Fin de Programa',
    description: 'Termina la ejecución',
    execute: (execution: Execution) => {
        execution.current_address = '000';
    }
};

export const OperationTypes = {
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
