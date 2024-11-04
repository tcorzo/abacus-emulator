<script setup lang="ts">
import OperationsTable from './editor/EditOperationsTable.vue';
import RegisterTable from './editor/RegisterTable.vue';
import { inject } from 'vue';
import { GlobalState } from '../state';

const globalState: GlobalState = inject('globalState') || {} as GlobalState;
</script>

<template>
  <div id="editor">
    <div class="tables-container">
      <RegisterTable :title="'Registros Auxiliares'" :registers="globalState.program.aux_registers" />
      <OperationsTable class="operations-table" />
    </div>
    <RegisterTable :title="'Program'" :registers="globalState.program.registers" />
    <RegisterTable :title="'Data'" :registers="globalState.program.data_registers" />
  </div>
</template>

<style scoped>
#editor {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
</style>
