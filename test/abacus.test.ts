import { expect } from "jsr:@std/expect";
import AbacusEmulator from "@/abacus/abacus.ts";
import { Program, Register } from "@/abacus/program.ts";
import { OperationTypes } from "@/abacus/operation_type.ts";

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
            new Register({ address: '001', value: '0000', comment: '' }),
            new Register({ address: '002', value: '0000', comment: '' }),
            new Register({ address: '003', value: 'FFFF', comment: '' }),
        ],
        aux_registers: [],
        operations: [
            {
                code: '0',
                operation_type: {
                    id: 'NOP',
                    name: 'NOP',
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

Deno.test("AbacusEmulator should load an immediate value into the accumulator", () => {
    const program: Program = {
        name: 'Immediate Load',
        description: 'Loads an immediate value into the accumulator',
        registers: [
            new Register({ address: '100', value: 'I123', comment: '' }),
            new Register({ address: '101', value: 'FFFF', comment: '' }),
        ],
        aux_registers: [],
        operations: [
            {
                code: 'I',
                operation_type: OperationTypes.INMEDIATE_LOAD
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

    // Ensure the immediate value is loaded correctly into the accumulator
    expect(emulator.accumulator).toEqual('0123');
});

Deno.test("AbacusEmulator should load a value from a register into the accumulator", () => {
    const program: Program = {
        name: 'Load Value',
        description: 'Loads a value from a register into the accumulator',
        registers: [
            new Register({ address: '100', value: 'L001', comment: '' }),
            new Register({ address: '101', value: 'FFFF', comment: '' }),
        ],
        aux_registers: [
            new Register({ address: '001', value: '1234', comment: '' })
        ],
        operations: [
            {
                code: 'L',
                operation_type: OperationTypes.LOAD
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

    // Ensure the value is loaded correctly into the accumulator
    expect(emulator.accumulator).toEqual('1234');
});

Deno.test("AbacusEmulator should load a value from aux register, negate it, and store it in register 201 using predefined operation types", () => {
    const program: Program = {
        name: 'Negate and Store',
        description: 'Loads a value from aux register, negates it, and stores it in register 201',
        registers: [
            new Register({ address: '100', value: 'L001', comment: '' }),
            new Register({ address: '101', value: 'NCCC', comment: '' }),
            new Register({ address: '102', value: 'S201', comment: '' }),
            new Register({ address: '103', value: 'FFFF', comment: '' }),
        ],
        aux_registers: [
            new Register({ address: '001', value: '0123', comment: '' })],
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

Deno.test("AbacusEmulator should add values from two registers and store the result in a target register", () => {
    const program: Program = {
        name: 'Add and Store',
        description: 'Adds values from two registers and stores the result in a target register',
        registers: [
            new Register({ address: '100', value: 'A001', comment: '' }),
            new Register({ address: '101', value: 'A002', comment: '' }),
            new Register({ address: '102', value: 'S201', comment: '' }),
            new Register({ address: '103', value: 'FFFF', comment: '' }),
        ],
        aux_registers: [
            new Register({ address: '001', value: '0005', comment: '' }),
            new Register({ address: '002', value: '0003', comment: '' })
        ],
        operations: [
            {
                code: 'A',
                operation_type: OperationTypes.ADD
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

    // Ensure the value is added and stored correctly
    expect(emulator.getRegister('201').value).toEqual('0008');
});

Deno.test("AbacusEmulator should jump to a specific address if the value in the accumulator is zero", () => {
    const program: Program = {
        name: 'Jump If Zero',
        description: 'Jumps to a specific address if the value in the accumulator is zero',
        registers: [
            new Register({ address: '101', value: 'I001', comment: '' }),
            new Register({ address: '102', value: 'J105', comment: '' }),
            new Register({ address: '103', value: 'I000', comment: '' }),
            new Register({ address: '104', value: 'J107', comment: '' }),
            new Register({ address: '105', value: 'S201', comment: '' }),
            new Register({ address: '106', value: 'FFFF', comment: '' }),
            new Register({ address: '107', value: 'I333', comment: '' }),
            new Register({ address: '108', value: 'S201', comment: '' }),
            new Register({ address: '109', value: 'FFFF', comment: '' }),
        ],
        aux_registers: [],
        operations: [
            {
                code: 'I',
                operation_type: OperationTypes.INMEDIATE_LOAD
            },
            {
                code: 'J',
                operation_type: OperationTypes.JUMP_IF_ZERO
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

    // Ensure the jump occurred correctly
    expect(emulator.getRegister('201').value).toEqual('0333');
});


Deno.test("AbacusEmulator should jump to a specific address if the value in the accumulator is negative", () => {
    const program: Program = {
        name: 'Example program',
        description: 'Example program description',
        registers: [
            new Register({ address: '101', value: 'L2F1', comment: '' }),
            new Register({ address: '102', value: 'J105', comment: '' }),
            new Register({ address: '103', value: 'L2F2', comment: '' }),
            new Register({ address: '104', value: 'J107', comment: '' }),
            new Register({ address: '105', value: 'S201', comment: '' }),
            new Register({ address: '106', value: 'FFFF', comment: '' }),
            new Register({ address: '107', value: 'I333', comment: '' }),
            new Register({ address: '108', value: 'S201', comment: '' }),
            new Register({ address: '109', value: 'FFFF', comment: '' }),
        ],
        aux_registers: [
            new Register({ address: '2F1', value: '0001', comment: 'AUX 1' }),
            new Register({ address: '2F2', value: 'FFFF', comment: 'AUX -1' })
        ],
        operations: [
            {
                code: 'I',
                operation_type: OperationTypes.INMEDIATE_LOAD
            },
            {
                code: 'L',
                operation_type: OperationTypes.LOAD
            },
            {
                code: 'J',
                operation_type: OperationTypes.JUMP_IF_NEGATIVE
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

    // Ensure the jump occurred correctly
    expect(emulator.getRegister('201').value).toEqual('0333');
});

Deno.test("AbacusEmulator should jump to a specific address if the value in the accumulator is positive", () => {
    const program: Program = {
        name: 'Jump If Positive',
        description: 'Jumps to a specific address if the value in the accumulator is positive',
        registers: [
            new Register({ address: '101', value: 'L2F1', comment: '' }),
            new Register({ address: '102', value: 'J105', comment: '' }),
            new Register({ address: '103', value: 'L2F2', comment: '' }),
            new Register({ address: '104', value: 'J107', comment: '' }),
            new Register({ address: '105', value: 'S201', comment: '' }),
            new Register({ address: '106', value: 'FFFF', comment: '' }),
            new Register({ address: '107', value: 'I333', comment: '' }),
            new Register({ address: '108', value: 'S201', comment: '' }),
            new Register({ address: '109', value: 'FFFF', comment: '' }),
        ],
        aux_registers: [
            new Register({ address: '2F1', value: '0001', comment: 'AUX 1' }),
            new Register({ address: '2F2', value: 'FFFF', comment: 'AUX -1' })
        ],
        operations: [
            {
                code: 'I',
                operation_type: OperationTypes.INMEDIATE_LOAD
            },
            {
                code: 'L',
                operation_type: OperationTypes.LOAD
            },
            {
                code: 'J',
                operation_type: OperationTypes.JUMP_IF_POSITIVE
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

    // Ensure the jump occurred correctly
    expect(emulator.getRegister('201').value).toEqual('0001');
});

Deno.test("AbacusEmulator should the execution when running the END operation", () => {
    const program: Program = {
        name: 'Example program',
        description: 'Example program description',
        registers: [
            new Register({ address: '200', value: 'FFFF', comment: '' }),
        ],
        aux_registers: [],
        operations: [
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

    // Ensure the jump occurred correctly
    expect(emulator.current_address).toEqual('000');
});
