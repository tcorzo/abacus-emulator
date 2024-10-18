import { assertEquals, assertThrows } from "jsr:@std/assert";
import AbacusEmulator from "../../src/abacus/abacus.ts";
import { Program, Register } from "../../src/abacus/program.ts";
import { Execution } from "../../src/abacus/execution.ts";
import { OperationTypes } from "../../src/constants/operation_type.ts";

Deno.test("AbacusEmulator should throw error if no program is loaded", () => {
    const emulator = new AbacusEmulator();
    assertThrows(() => {
        emulator.run();
    }, Error, "No program loaded");
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
                    execute: (execution: Execution) => {
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
    assertEquals(emulator['program'], program);

    // Run the emulator
    emulator.run();

    // Ensure the execution finished correctly
    assertEquals(emulator['execution'].current_address, '000');
});
