<script setup lang="ts">
import {inject,ref} from 'vue';
import { ProgramImporter } from './../abacus/importer';
import { GlobalState } from '@/state';

const globalState: GlobalState = inject('globalState');

const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const program = ProgramImporter.importFromCSV(content);
      globalState.program = program;
    };
    reader.readAsText(file);
  }
};
</script>

<template>
    <div class="file-upload">
      <input
        type="file"
        ref="fileInput"
        accept=".csv"
        style="display: none"
        @change="handleFileUpload"
      >
      <button @click="triggerFileInput" class="upload-button">
        Cargar programa 📁
      </button>
    </div>
</template>
