import { expect } from "jsr:@std/expect";
import AbacusEmulator from "../../src/abacus/abacus.ts";
import { Program, Register } from "../../src/abacus/program.ts";
import { OperationTypes } from "../../src/abacus/operation_type.ts";

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
                    execute: function (this: AbacusEmulator) {
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
    expect(emulator.current_address).toEqual('000');
});

Deno.test("AbacusEmulator should load a value from aux register, negate it, and store it in register 201 using predefined operation types", () => {
    const program: Program = {
        name: 'Negate and Store',
        description: 'Loads a value from aux register, negates it, and stores it in register 201',
        registers: [
            new Register('100', 'L001'),
            new Register('101', 'NCCC'),
            new Register('102', 'S201'),
            new Register('103', 'FFFF')
        ],
        aux_registers: [new Register('001', '0123')],
        operations: [
            {
                code: 'L',
                operation_type: OperationTypes.LOAD
            },
            {
                code: 'N',
                operation_type: OperationTypes.NOT
            },
            {
                code: 'S',
                operation_type: OperationTypes.STORE
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

    // Ensure the value is negated and stored correctly
    expect(emulator.getRegister('201').value).toEqual('FEDC');
});
