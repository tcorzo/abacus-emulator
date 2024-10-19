import { Program } from "./abacus/program.ts";
import { reactive } from 'vue';
import { OperationTypes } from "./abacus/operation_type.ts";
import { Register } from "./abacus/program.ts";

export interface GlobalState {
    mode: 'edit' | 'run';
    program: Program;
}

export const globalState: GlobalState = reactive({
    mode: 'edit',
    program: {
        name: 'New Program',
        description: 'A new program',
        operations: [
            { code: '0', operation_type: OperationTypes.INMEDIATE_LOAD },
            { code: '1', operation_type: OperationTypes.LOAD },
            { code: '2', operation_type: OperationTypes.STORE },
            { code: '3', operation_type: OperationTypes.ADD },
            { code: '4', operation_type: OperationTypes.NOT },
            { code: '7', operation_type: OperationTypes.JUMP_IF_ZERO },
            { code: '8', operation_type: OperationTypes.JUMP_IF_NEGATIVE },
            { code: '9', operation_type: OperationTypes.JUMP_IF_POSITIVE },
            { code: 'F', operation_type: OperationTypes.END },
        ],
        aux_registers: [
            new Register({ address: '2F0', value: '0000', comment: 'Auxiliar 1' }),
        ],
        registers: [
            new Register({ address: '100', value: '0000', comment: 'Registro 100' }),
            new Register({ address: '101', value: '0000', comment: 'Registro 101' }),
            new Register({ address: '102', value: '0000', comment: 'Registro 102' }),
            new Register({ address: '103', value: '0000', comment: 'Registro 103' }),
        ],
    } as Program,
});

export function toggleMode() {
    globalState.mode = globalState.mode === 'edit' ? 'run' : 'edit';
}
