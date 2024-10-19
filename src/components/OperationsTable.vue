<script setup lang="ts">
import { inject } from 'vue';
import { OperationTypes } from './../abacus/operation_type';
import { GlobalState } from './../state';

const globalState: GlobalState = inject('globalState');
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
          <td>
            <input v-if="globalState.mode === 'edit'" v-model="operation.code" />
            <span v-else>{{ operation.code }}</span>
          </td>
          <td>
            <span>{{ operation.operation_type.name }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
