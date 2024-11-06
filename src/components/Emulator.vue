<script setup lang="ts">
import { inject, provide, reactive, watchEffect } from 'vue';
import { GlobalState } from './../state';
import ProgramRegisters from './emulator/ProgramRegisters.vue';
import AuxRegisters from './emulator/AuxRegisters.vue';
import DataRegisters from './emulator/DataRegisters.vue';
import AbacusEmulator from '../abacus/abacus';
import Error from './emulator/Error.vue';

const globalState: GlobalState = inject('globalState') || {} as GlobalState;

const emulator = reactive(new AbacusEmulator());

watchEffect(() => {
  emulator.loadProgram(globalState.program.clone());
})

provide('emulator', emulator);
</script>

<template>
  <div id="emulator">
    <AuxRegisters></AuxRegisters>
    <ProgramRegisters></ProgramRegisters>
    <DataRegisters></DataRegisters>


    <Card class="flex-initial w-1/6">
      <template #content>
        <div class="flex pb-4 justify-around">
          <IconField class="m-2 w-24">
            <InputIcon class="pi pi-inbox" />
            <InputText class="w-24 !bg-transparent" v-model="emulator.accumulator" disabled />
          </IconField>
          <IconField class="m-2 w-24">
            <InputIcon class="pi pi-database" />
            <InputText class="w-24 !bg-transparent" v-model="emulator.current_address" disabled />
          </IconField>
        </div>
      </template>
      <template #footer>
        <div class="flex pb-4">
          <Error v-if="emulator.error"></Error>
        </div>
        <div class="flex gap-4 mt-1 items-center">
          <Button icon="pi pi-refresh" @click="emulator.reset()" severity="secondary" outlined size="small"
            class="w-min h-min" />
          <Button icon="pi pi-angle-right" label="Step" @click="emulator.step()" :disabled="emulator.finished"
            severity="secondary" outlined class="w-max" />
          <Button icon="pi pi-angle-double-right" label="Run" :disabled="emulator.finished" @click="emulator.run()"
            class="w-max" />
        </div>
      </template>
    </Card>

  </div>

</template>

<style scoped>
#emulator {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  padding: 2rem;
  flex: 1;
  height: 100%;
  overflow: hidden;
}

#emulator-controls {
  padding: 1rem;
  background-color: #3e3d32;
  border-radius: 2rem;
}

#emulator-status {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

#emulator-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.current-register {
  background-color: chocolate;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

@media (prefers-color-scheme: light) {
  #emulator-controls {
    background-color: #f5f5f5;
  }
}
</style>
