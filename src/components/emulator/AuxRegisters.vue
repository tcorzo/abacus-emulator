<script setup lang="ts">
import { computed, inject, } from 'vue';
import { GlobalState } from '../../state';
import AbacusEmulator from '@/abacus/abacus';
import RegisterTable from '../RegisterTable.vue';

const globalState: GlobalState = inject('globalState') || {} as GlobalState;
const emulator: AbacusEmulator = inject('emulator') || {} as AbacusEmulator;

const auxAddresses = computed(() => globalState.program.aux_registers.map((r) => r.address))

const registers = computed(
    () => Array.from(emulator.registers.values())
        .filter((r) => auxAddresses.value.includes(r.address))
);
</script>

<template>
    <RegisterTable :editable="false" :title="'Registros Auxiliares'" :registers="registers" />
</template>

<style scoped>
.current-register {
    background-color: chocolate;
    font-weight: bold;
    transition: background-color 0.2s ease;
}
</style>
