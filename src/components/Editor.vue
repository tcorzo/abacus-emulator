<script setup lang="ts">
import UploadProgramButton from './editor/UploadProgramButton.vue';

import OperationsTable from './editor/EditOperationsTable.vue';
import { resetProgram } from './../state';
import DownloadButton from './editor/DownloadButton.vue';
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
    <UploadProgramButton>
    </UploadProgramButton>
    <DownloadButton></DownloadButton>

    <Button @click="resetProgram()">
      Reset Program 🔄
    </Button>
  </div>
</template>

<style scoped>
#editor {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
</style>
