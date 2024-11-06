<script setup lang="ts">
import { inject, } from 'vue';
import AbacusEmulator from '@/abacus/abacus';

const emulator: AbacusEmulator = inject('emulator') || {} as AbacusEmulator;
</script>

<template>
    <div class="error-msg flex items-center gap-2 text-wrap w-full">
        <i class="pi pi-thumbs-down-fill"></i>
        <p>{{ emulator.error }}</p>
    </div>
</template>

<style scoped>
.error-msg {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 2rem;
    padding: 1rem;
    margin-top: 1rem;
}
</style>
