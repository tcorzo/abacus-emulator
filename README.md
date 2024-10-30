# Abacus Emulator 🧮

A simple emulator for a basic computer architecture, built with TypeScript and
Deno.

## Setup Development Environment

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

## Usage

Checkout the [example_program.csv](test/fixtures/example_program.csv), use it as
a template for your own programs.

## Roadmap

- [x] Implement basic functionality
- [ ] Add breakpoints
- [ ] Show errors in the UI
- [ ] Separate Data registers from Instruction registers
- [ ] Export program to CSV
- [ ] Indicate current register in the UI
- [ ] Flash register when it changes
