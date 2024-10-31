<script setup lang="ts">
import { inject } from 'vue';
import { GlobalState } from './../state';
import ProgramRegisters from './emulator/ProgramRegisters.vue';
import AuxRegisters from './emulator/AuxRegisters.vue';

const globalState: GlobalState = inject('globalState') || {} as GlobalState;
</script>

<template>
  <div id="emulator">
    <AuxRegisters></AuxRegisters>
    <ProgramRegisters></ProgramRegisters>

    <div>

      <div id="emulator-controls">
        <div id="emulator-status">
          <div>
            <h4>Acumulador</h4>
            <p>{{ globalState.emulator.accumulator }}</p>
          </div>
          <div>
            <h4>Dirección actual</h4>
            <p>{{ globalState.emulator.current_address }}</p>
          </div>
        </div>
        <div id="emulator-actions">
          <button @click="globalState.emulator.step" :disabled="globalState.mode !== 'run'">Step</button>
          <button @click="globalState.emulator.run" :disabled="globalState.mode !== 'run'">Run ▶️</button>
        </div>
      </div>

    </div>

  </div>

</template>

<style scoped>
#emulator {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 20px;
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
