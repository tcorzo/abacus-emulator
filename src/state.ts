import { Program } from "./abacus/program.ts";
import { reactive, watch } from 'vue';
import { OperationTypes, getOperationTypeById } from "./abacus/operation_type.ts";
import { Register } from "./abacus/program.ts";
import AbacusEmulator from "./abacus/abacus.ts";

export interface GlobalState {
    mode: 'edit' | 'run';
    program: Program;
}

const defaultProgram = new Program({
    name: 'New Program',
    description: 'A new program',
    operations: [
        { code: '0', operation_type: OperationTypes.IMMEDIATE_LOAD },
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
        new Register({ address: '2F0', value: '0000', comment: 'Auxiliary 1' }),
    ],
    registers: [
        new Register({ address: '100', value: '0000', comment: 'Registro 100' }),
        new Register({ address: '101', value: '0000', comment: 'Registro 101' }),
        new Register({ address: '102', value: '0000', comment: 'Registro 102' }),
        new Register({ address: '103', value: '0000', comment: 'Registro 103' }),
    ],
    data_registers: [],
});

// Function to load program from localStorage
function loadSavedProgram(): Program {
    const savedProgram = localStorage.getItem('abacusProgram');
    if (!savedProgram)
        return defaultProgram;

    try {
        const parsed = JSON.parse(savedProgram);
        // Reconstruct Register objects
        parsed.aux_registers = parsed.aux_registers.map((r: any) => new Register(r));
        parsed.registers = parsed.registers.map((r: any) => new Register(r));
        parsed.operations = parsed.operations.map((o: any) => {
            const operation_type = getOperationTypeById(o.operation_type.id);
            if (!operation_type) {
                throw new Error(`Operation type ${o.operation_type.name} not found`);
            }
            return { code: o.code, operation_type };
        });
        parsed.data_registers = parsed.data_registers.map((r: any) => new Register(r));
        return new Program({
            name: parsed.name,
            description: parsed.description,
            operations: parsed.operations,
            aux_registers: parsed.aux_registers,
            registers: parsed.registers,
            data_registers: parsed.data_registers,
        });
    } catch (e) {
        console.error('Failed to parse saved program:', e);
    }

    return defaultProgram;
}

export const globalState = reactive({
    mode: 'edit',
    program: loadSavedProgram(),
    emulator: new AbacusEmulator(),
});

// Watch for changes in the program and save to localStorage
watch(() => globalState.program, (newProgram) => {
    localStorage.setItem('abacusProgram', JSON.stringify(newProgram));
}, { deep: true });

export function toggleMode() {
    globalState.mode = globalState.mode === 'edit' ? 'run' : 'edit';
}

export function resetProgram() {
    globalState.program = defaultProgram;
    localStorage.removeItem('abacusProgram');
}
