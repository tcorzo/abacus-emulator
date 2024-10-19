<script setup lang="ts">
import { inject } from 'vue';
import { ref, onMounted } from 'vue';

const globalState = inject('globalState');
const newAux = ref({ address: '', value: '', comment: '' });

const addAuxRegister = () => {
  if (newAux.value.address && newAux.value.value && newAux.value.comment) {
    globalState.program.aux_registers.push({ ...newAux.value });
    newAux.value = { address: '', value: '', comment: '' };
  }
};
</script>

<template>
  <div>
    <h3>Registros AUX</h3>
    <table>
      <thead>
        <tr>
          <th>AUX</th>
          <th>Valor Inicial</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(aux, index) in globalState.program.aux_registers" :key="index">
          <td>
            <input v-if="globalState.mode === 'edit'" v-model="aux.address" />
            <span v-else>{{ aux.address }}</span>
          </td>
          <td>
            <input v-if="globalState.mode === 'edit'" v-model="aux.value" />
            <span v-else>{{ aux.value }}</span>
          </td>
          <td>
            <input v-if="globalState.mode === 'edit'" v-model="aux.comment" />
            <span v-else>{{ aux.comment }}</span>
          </td>
        </tr>
        <tr v-if="globalState.mode === 'edit'">
          <td><input v-model="newAux.address" placeholder="New AUX" /></td>
          <td><input v-model="newAux.value" placeholder="Initial Value" /></td>
          <td><input v-model="newAux.comment" placeholder="Description" /></td>
          <td><button @click="addAuxRegister">Add</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
