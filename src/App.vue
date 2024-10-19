<script setup lang="ts">
import { provide } from 'vue';
import { globalState, toggleMode } from './state';

import AuxTable from '/src/components/AuxTable.vue';
import OperationsTable from '/src/components/OperationsTable.vue';
import ProgramTable from '/src/components/ProgramTable.vue';

provide('globalState', globalState);
</script>


<template>
  <div id="app">
    <div id="editor">
      <div class="tables-container">
        <AuxTable class="aux-table"/>
        <OperationsTable class="operations-table"/>
      </div>
      <ProgramTable @update-aux="updateAux" class="program-table"/>
    </div>
    <button @click="toggleMode" class="mode-toggle">
      {{ globalState.mode === 'edit' ? 'Ejecutar ▶️' : 'Editar ✏️' }}
    </button>
  </div>
</template>

<style>
#app {
  padding: 20px;
}

#editor {
  display: flex;
  flex-direction: row;
  align-items: top;
}

.mode-toggle {
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.tables-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
}

.aux-table, .operations-table, .program-table {
  flex: 1;
  margin: 0 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: center;
}
</style>
