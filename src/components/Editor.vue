<script setup lang="ts">
import OperationsTable from './editor/OperationsTable.vue';
import RegisterTable from './RegisterTable.vue';
import { inject } from 'vue';
import { GlobalState } from '../state';

const globalState: GlobalState = inject('globalState') || {} as GlobalState;
</script>

<template>
  <div id="editor">
    <OperationsTable />
    <RegisterTable editable :title="'Registros Auxiliares'" :registers="globalState.program.aux_registers" />
    <RegisterTable editable :title="'Program'" :registers="globalState.program.registers" />
    <RegisterTable editable :title="'Data'" :registers="globalState.program.data_registers" />
  </div>
</template>

<style scoped>
#editor {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  padding: 2rem;
  flex: 1;
  height: 100%;
  overflow: hidden;
}
</style>
