# Abacus Emulator 🧮

A simple emulator for a basic computer architecture, built with TypeScript and
Deno.

## Features 🎉

- 🛑 **Breakpoints**: Debugging made easy with breakpoints.
- ⏲️ **Timeouts**: Prevent infinite loops with built-in timeouts.
- 📊 **Data Registers**: Clean separation between data and instruction
    registers.
- 📤 **CSV Import/Export**: Import and export your programs in CSV

<!-- - 🏷️ **Label Support**: Support for `#`
labels as jump targets in your code. -->

<!-- - 🌈 **Editor Enhancements**: Syntax highlighting
and autocomplete for operations, labels, AUX, and DATA registers. -->

<!-- - 📤 **Spreadsheet Import/Export**:
Import/Export your programs from/to .csv, .xls, .xlsx, .ods -->

## Setup Development Environment 🛠️

1. Install [Deno](https://deno.land/manual/getting_started/installation)
1. Clone this repository
1. Install the dependencies:

```bash
deno install
```

1. Run development server:

```bash
deno task dev
```

## Usage 🚀

Checkout the [example_program.csv](test/fixtures/example_program.csv), use it as
a template for your own programs.

## Roadmap 🗺️

### Emulator

- [x] Implement basic functionality
- [x] Add breakpoints
- [x] Separate Data registers from Instruction registers
- [x] Timeout for infinite loops
- [ ] `#` labels pre-processor

### CI

- [x] Run tests
- [x] pre-commit hooks

### Tests

- [x] Emulator operations
- [x] CSV import
- [x] CSV export

### UI

- [x] Indicate current register in the UI
- [x] Show execution errors in the UI
- [ ] Flash register when it's value changes
- [ ] Address-agnostic register insert/delete
- [ ] Update starting address in the UI (propagates to all addresses)
- [ ] Improve editor UX
    - [ ] Add syntax highlighting for operations
    - [ ] Add autocomplete for `#` labels
    - [ ] Add autocomplete for AUX registers
    - [ ] Add autocomplete for DATA registers
- [ ] Add support for using `#` labels as jump targets in the code.
    - Labels starting with `#` can be used to mark specific points in the code.
    - These labels can be referenced by jump operations.
    - A pre-processor will replace these labels with actual memory addresses
        before execution.

### Import/Export

- [x] Import program from CSV
- [x] Export program to CSV
    - [ ] Allow enabling/disabling data registers
- [ ] Export program to (.xls, .xlsx, .ods) with nice formatting
    - [ ] Allow enabling/disabling data registers
- [ ] Import program from (.xls, .xslx, .ods)
