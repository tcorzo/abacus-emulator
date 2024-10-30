import { expect } from "jsr:@std/expect";
import { ProgramImporter } from "@/abacus/importer.ts";
import { OperationTypes } from "@/abacus/operation_type.ts";

Deno.test("ProgramImporter should correctly import a program from CSV", async () => {
    const csvContent = await Deno.readTextFile(
        new URL("fixtures/example_program.csv", import.meta.url)
    );

    const program = ProgramImporter.importFromCSV(csvContent);

    // Test operations section
    expect(program.operations.length).toBe(9);
    expect(program.operations[0]).toEqual({
        code: '0',
        operation_type: OperationTypes.INMEDIATE_LOAD
    });
    expect(program.operations[8]).toEqual({
        code: 'F',
        operation_type: OperationTypes.END
    });

    // Test aux registers section
    expect(program.aux_registers.length).toBe(8);
    expect(program.aux_registers[0]).toEqual({
        address: '2F0',
        value: '0000',
        comment: 'AUX 0'
    });
    expect(program.aux_registers[7]).toEqual({
        address: '2F7',
        value: '0000',
        comment: 'X'
    });

    // Test program registers section
    expect(program.registers.length).toBe(16);
    expect(program.registers[0]).toEqual({
        address: '500',
        value: '12F5',
        comment: 'Carga Ptr X'
    });
    expect(program.registers[13]).toEqual({
        address: '50D',
        value: 'FCCC',
        comment: 'Fin de Programa'
    });
});
