<script setup lang="ts">
import { inject, defineComponent } from 'vue';
import { OperationTypes } from './../abacus/operation_type';
import { GlobalState } from '@/state';
import { Register } from '@/abacus/program';

const globalState: GlobalState = inject('globalState');
</script>

<template>
  <div>
    <h3>Programa</h3>
    <table>
      <thead>
        <tr>
          <th>0x</th>
          <th>Valor</th>
          <th>Comentario</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(register, index) in globalState.program.registers" :key="index">
          <td>
            <input v-if="globalState.mode === 'edit'" v-model="register.address" />
            <span v-else>{{ register.address }}</span>
          </td>
          <td>
            <input v-if="globalState.mode === 'edit'" v-model="register.value" />
            <span v-else>{{ register.value }}</span>
          </td>
          <td>
            <input v-if="globalState.mode === 'edit'" v-model="register.comment" />
            <span v-else>{{ register.comment }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
