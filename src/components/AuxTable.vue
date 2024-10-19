<script setup lang="ts">
import { inject } from 'vue';
import { ref, onMounted } from 'vue';

const globalState = inject('globalState');
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
            <input v-if="globalState.mode === 'edit'" v-model="aux.address " />
            <span v-else>{{ aux.address }}</span>
          </td>
          <td>{{ aux.value }}</td>
          <td>{{ aux.comment }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
