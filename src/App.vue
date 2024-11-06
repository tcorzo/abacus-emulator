<script setup lang="ts">
import { provide } from 'vue';
import { globalState, toggleMode } from './state';

import Emulator from './components/Emulator.vue';
import Editor from './components/Editor.vue';

import ResetButton from './components/ResetButton.vue';
import UploadButton from './components/UploadButton.vue';
import DownloadButton from './components/DownloadButton.vue';

provide('globalState', globalState);

</script>

<template>
  <div id="app" class="h-screen flex flex-col">
    <Toolbar class="!rounded-none !rounded-b-lg">
      <template #start>
        <div class="flex gap-2">
          <Button :label="globalState.mode === 'edit' ? 'Ejecutar' : 'Editar'"
            :icon="`pi ${globalState.mode === 'edit' ? 'pi-play' : 'pi-pen-to-square'}`" @click="toggleMode" />
          <ResetButton />
          <UploadButton />
        </div>
      </template>


      <template #end>
        <DownloadButton />
      </template>
    </Toolbar>

    <Editor v-if="globalState.mode === 'edit'"></Editor>
    <Emulator v-if="globalState.mode === 'run'"></Emulator>

    <div class="fixed bottom-5 right-5">
      <a href="https://github.com/tcorzo/abacus-emulator" target="_blank" rel="noopener noreferrer">
        <i class="pi pi-github !text-4xl"></i>
      </a>
    </div>
  </div>
</template>
