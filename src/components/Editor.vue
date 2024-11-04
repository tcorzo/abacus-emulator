<script setup lang="ts">
import OperationsTable from './editor/EditOperationsTable.vue';
import RegisterTable from './editor/RegisterTable.vue';
import { inject } from 'vue';
import { GlobalState } from '../state';

const globalState: GlobalState = inject('globalState') || {} as GlobalState;
</script>

<template>
  <div id="editor">
    <OperationsTable />
    <RegisterTable :title="'Registros Auxiliares'" :registers="globalState.program.aux_registers" />
    <RegisterTable :title="'Program'" :registers="globalState.program.registers" class="editor-table" />
    <RegisterTable :title="'Data'" :registers="globalState.program.data_registers" class="editor-table" />
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
