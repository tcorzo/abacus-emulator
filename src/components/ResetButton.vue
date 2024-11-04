<script setup lang="ts">
import { resetProgram } from './../state';
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();

const confirmReset = (event) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Querés descartar el program actual?',
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Descartar',
      severity: 'danger'
    },
    accept: () => {
      resetProgram();
    },
    reject: () => { }
  });
};
</script>

<template>
  <ConfirmPopup></ConfirmPopup>
  <Button icon="pi pi-trash" @click="confirmReset" severity="danger" outlined text />
</template>
