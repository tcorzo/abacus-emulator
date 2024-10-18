import { expect } from "jsr:@std/expect";

import AbacusEmulator from "../../src/abacus/abacus.ts";
import { Program, Register } from "../../src/abacus/program.ts";
import { Execution } from "../../src/abacus/execution.ts";
import { OperationTypes } from "../../src/constants/operation_type.ts";

Deno.test("AbacusEmulator should throw error if no program is loaded", () => {
    const emulator = new AbacusEmulator();
    expect(() => {
        emulator.run();
    }).toThrow('No program loaded');
});

Deno.test("AbacusEmulator should load a program and run without errors", () => {
    const program: Program = {
        name: 'Test program',
        description: 'Test program description',
        registers: [
            { address: '001', opcode: () => '0' } as Register,
            { address: '002', opcode: () => '0' } as Register,
            { address: '003', opcode: () => 'F' } as Register
        ],
        aux_registers: [],
        operations: [
            {
                code: '0',
                operation_type: {
                    name: 'NOP',
                    description: 'No operation',
                    execute: (_: Execution) => {
                        // No operation
                    }
                }
            },
            {
                code: 'F',
                operation_type: OperationTypes.END
            }
        ]
    };

    const emulator = new AbacusEmulator();
    emulator.loadProgram(program);

    // Ensure the program is loaded correctly
    expect(emulator['program']).toEqual(program);

    // Run the emulator
    emulator.run();

    // Ensure the execution finished correctly
    expect(emulator['execution'].current_address).toEqual('000');
});

