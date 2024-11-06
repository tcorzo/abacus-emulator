<script setup lang="ts">
import { GlobalState } from '@/state';
import { ProgramExporter, ExportFormat, ExportFormats } from '../abacus/exporter';
import { inject } from 'vue';

const globalState: GlobalState = inject('globalState') || {} as GlobalState;

function saveProgram(exportFormat: ExportFormat) {
    const csv = ProgramExporter.export(globalState.program, exportFormat);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${globalState.program.name}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

const formats: ExportFormat[] = Object.values(ExportFormats);
const items = formats.map((format) => ({ label: format.name, command: () => saveProgram(format) }));
</script>

<template>
    <SplitButton icon="pi pi-download" label="Save" @click="saveProgram(ExportFormats.CSV)" :model="items" />
</template>
