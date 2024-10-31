<script setup lang="ts">
import { inject } from 'vue';
import { GlobalState } from './../../state';

const globalState: GlobalState = inject('globalState') || {} as GlobalState;
</script>

<template>
  <div>
    <h3>Operaciones</h3>
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Operación</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(operation, index) in globalState.program.operations" :key="index">
          <td> <input v-model="operation.code" /> </td>
          <td> <span>{{ operation.operation_type.name }}</span> </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
