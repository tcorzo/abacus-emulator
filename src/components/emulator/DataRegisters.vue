<script setup lang="ts">
import { inject, } from 'vue';
import { GlobalState } from '../../state';

const globalState: GlobalState = inject('globalState') || {} as GlobalState;

const programAddresses = globalState.program.registers.map((r) => r.address)
const registers = Array.from(globalState.emulator.registers.values())
    .filter((r) => programAddresses.includes(r.address));
</script>

<template>
    <div>
        <h3>Emulación</h3>
        <table>
            <thead>
                <tr>
                    <th>0x</th>
                    <th>Valor</th>
                    <th>Comentario</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="register in registers"
                    :class="{ 'current-register': register.address === globalState.emulator.current_address }">
                    <td>
                        <input v-if="globalState.mode === 'edit'" v-model="register.address" />
                        <span v-else>{{ register.address }}</span>
                    </td>
                    <td>
                        <input v-if="globalState.mode === 'edit'" v-model="register.value" />
                        <span v-else>{{ register.value }}</span>
                    </td>
                    <td>
                        <input v-if="globalState.mode === 'edit'" v-model="register.comment" />
                        <span v-else>{{ register.comment }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.current-register {
    background-color: chocolate;
    font-weight: bold;
    transition: background-color 0.2s ease;
}
</style>
