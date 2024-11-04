<script setup lang="ts">
import { provide } from 'vue';
import { globalState, toggleMode } from './state';

import Emulator from './components/Emulator.vue';
import Editor from './components/Editor.vue';

provide('globalState', globalState);

</script>

<template>
  <div id="app">
    <Button @click="toggleMode" class="mode-toggle">
      {{ globalState.mode === 'edit' ? 'Ejecutar ▶️' : 'Editar ✏️' }}
    </Button>

    <Editor v-if="globalState.mode === 'edit'"></Editor>
    <Emulator v-if="globalState.mode === 'run'"></Emulator>
  </div>
</template>
