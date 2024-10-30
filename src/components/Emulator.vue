<script setup lang="ts">
import { inject, } from 'vue';
import { GlobalState } from './../state';

const globalState: GlobalState = inject('globalState') || {} as GlobalState;
const registers = Array.from(globalState.emulator.registers.values());

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
        <tr v-for="register in registers">
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
    <div>
      <h4>Acumulador</h4>
      <p>{{ globalState.emulator.accumulator }}</p>
    </div>
    <div>
      <h4>Dirección actual</h4>
      <p>{{ globalState.emulator.current_address }}</p>
    </div>
    <div>
      <button @click="globalState.emulator.step" :disabled="globalState.mode !== 'run'">Step</button>
    </div>
    <div>
      <button @click="globalState.emulator.run" :disabled="globalState.mode !== 'run'">Run</button>
    </div>
  </div>
</template>
