<script setup lang="ts">
import { inject, } from 'vue';
import { GlobalState } from '../../state';
import { ref } from 'vue';
import { Register } from '../../abacus/program';

const globalState: GlobalState = inject('globalState') || {} as GlobalState;
const newReg = ref({ address: '', value: '', comment: '' });

const addRegister = () => {
  if (newReg.value.address && newReg.value.value && newReg.value.comment) {
    globalState.program.registers.push({ ...newReg.value } as Register);
    newReg.value = { address: '', value: '', comment: '' };
  }
};
</script>

<template>
  <div>
    <h3>Program</h3>
    <table>
      <thead>
        <tr>
          <th>0x</th>
          <th>Valor</th>
          <th>Comentario</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(register, index) in globalState.program.registers" :key="index">
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
        <tr v-if="globalState.mode === 'edit'">
          <td></td>
          <td><input v-model="newReg.address" placeholder="Address" /></td>
          <td><input v-model="newReg.value" placeholder="Initial Value" /></td>
          <td><input v-model="newReg.comment" placeholder="Description" /></td>
          <td><button @click="addRegister">Add</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
