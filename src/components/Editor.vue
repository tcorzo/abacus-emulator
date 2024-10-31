<script setup lang="ts">
import { inject, } from 'vue';
import UploadProgramButton from './UploadProgramButton.vue';

import { provide } from 'vue';
import EditAuxTable from './editor/EditAuxTable.vue';
import OperationsTable from './editor/EditOperationsTable.vue';
import ProgramTable from './editor/EditProgramTable.vue';
import { globalState, resetProgram } from './../state';

provide('globalState', inject('globalState'));

</script>

<template>
  <div id="editor">
    <div class="tables-container">
      <EditAuxTable class="aux-table" />
      <OperationsTable class="operations-table" />
    </div>
    <ProgramTable class="program-table" />

    <UploadProgramButton></UploadProgramButton>


    <button @click="resetProgram" v-if="globalState.mode === 'edit'">
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
