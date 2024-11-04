<script setup lang="ts">
import { GlobalState } from '@/state';

import { ProgramExporter } from './../../abacus/exporter';
import { inject } from 'vue';

const globalState: GlobalState = inject('globalState') || {} as GlobalState;

function saveProgram() {
    const csv = ProgramExporter.exportToCSV(globalState.program);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${globalState.program.name}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

</script>

<template>
    <Button @click="saveProgram">
        Save Program 💾
    </Button>
</template>
