<script setup lang="ts">
import { provide } from 'vue';
import { globalState, toggleMode } from './state';

import Emulator from './components/Emulator.vue';
import Editor from './components/Editor.vue';

provide('globalState', globalState);

</script>

<template>
  <div id="app">
    <button @click="toggleMode" class="mode-toggle">
      {{ globalState.mode === 'edit' ? 'Ejecutar ▶️' : 'Editar ✏️' }}
    </button>

    <Editor v-if="globalState.mode === 'edit'"></Editor>
    <Emulator v-if="globalState.mode === 'run'"></Emulator>
  </div>
</template>

<style>
#app {
  padding: 20px;
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

.aux-table,
.operations-table,
.program-table {
  flex: 1;
  margin: 0 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: center;
}
</style>
