import { expect } from "jsr:@std/expect";
import { ProgramExporter } from "@/abacus/exporter.ts";
import { Program, Register } from "@/abacus/program.ts";
import { OperationTypes } from "@/abacus/operation_type.ts";

Deno.test("ProgramExporter should export a program to CSV format", () => {
    const program = new Program({
        name: 'Test Program',
        description: 'Test Description',
        registers: [
            new Register({ address: '100', value: 'L001', comment: 'Load value' }),
            new Register({ address: '101', value: 'S201', comment: 'Store result' }),
            new Register({ address: '102', value: 'FFFF', comment: 'End' })
        ],
        aux_registers: [
            new Register({ address: '001', value: '1234', comment: 'Initial value' })
        ],
        operations: [
            {
                code: 'L',
                operation_type: OperationTypes.LOAD
            },
            {
                code: 'S',
                operation_type: OperationTypes.STORE
            },
            {
                code: 'F',
                operation_type: OperationTypes.END
            }
        ],
        data_registers: [
            new Register({ address: '201', value: '0000', comment: 'Result' })
        ]
    });

    const expected =
        'OPERATIONS,,\n' +
        'OPCODE,OPERATION,\n' +
        'L,LOAD,\n' +
        'S,STORE,\n' +
        'F,END,\n' +
        '\n' +
        'AUX,,\n' +
        'ADDR,VALUE,COMMENT\n' +
        '001,1234,Initial value\n' +
        '\n' +
        'PROGRAM,,\n' +
        'ADDR,VALUE,COMMENT\n' +
        '100,L001,Load value\n' +
        '101,S201,Store result\n' +
        '102,FFFF,End\n' +
        '\n' +
        'DATA,,\n' +
        'ADDR,VALUE,COMMENT\n' +
        '201,0000,Result';

    const result = ProgramExporter.exportToCSV(program);
    expect(result).toEqual(expected);
});

Deno.test("ProgramExporter should handle empty program sections", () => {
    const program = new Program({
        name: 'Empty Program',
        description: 'Empty Description',
        registers: [],
        aux_registers: [],
        operations: [],
        data_registers: []
    });

    const expected =
        'OPERATIONS,,\n' +
        'OPCODE,OPERATION,\n' +
        '\n' +
        'AUX,,\n' +
        'ADDR,VALUE,COMMENT\n' +
        '\n' +
        'PROGRAM,,\n' +
        'ADDR,VALUE,COMMENT\n' +
        '\n' +
        'DATA,,\n' +
        'ADDR,VALUE,COMMENT';

    const result = ProgramExporter.exportToCSV(program);
    expect(result).toEqual(expected);
});
