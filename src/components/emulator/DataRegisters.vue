<script setup lang="ts">
import { inject, computed } from 'vue';
import { GlobalState } from '../../state';
import AbacusEmulator from '@/abacus/abacus';
import RegisterTable from '../RegisterTable.vue';

const globalState: GlobalState = inject('globalState') || {} as GlobalState;
const emulator: AbacusEmulator = inject('emulator') || {} as AbacusEmulator;

const dataAddresses = globalState.program.data_registers.map((r) => r.address);

const registers = computed(() => {
    const combinedAddresses = [...dataAddresses, ...emulator.createdAddresses];
    return Array.from(emulator.registers.values())
        .filter((r) => combinedAddresses.includes(r.address));
});
</script>

<template>
    <RegisterTable :editable="false" :title="'Data'" :registers="registers" />
</template>

<style scoped>
.current-register {
    background-color: chocolate;
    font-weight: bold;
    transition: background-color 0.2s ease;
}
</style>
