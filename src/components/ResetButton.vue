<script setup lang="ts">
import { resetProgram } from './../state';
</script>

<template>
  <Button icon="pi pi-trash" @click="resetProgram()" severity="secondary" text />
</template>
