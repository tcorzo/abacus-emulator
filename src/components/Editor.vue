<script setup lang="ts">
import UploadProgramButton from './editor/UploadProgramButton.vue';

import EditAuxTable from './editor/EditAuxTable.vue';
import OperationsTable from './editor/EditOperationsTable.vue';
import ProgramTable from './editor/EditProgramTable.vue';
import { resetProgram } from './../state';
import DownloadButton from './editor/DownloadButton.vue';
</script>

<template>
  <div id="editor">
    <div class="tables-container">
      <EditAuxTable class="aux-table" />
      <OperationsTable class="operations-table" />
    </div>
    <ProgramTable class="program-table" />

    <UploadProgramButton></UploadProgramButton>
    <DownloadButton></DownloadButton>

    <button @click="resetProgram">
      Reset Program 🔄
    </button>
  </div>
</template>

<style scoped>
#editor {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
</style>
