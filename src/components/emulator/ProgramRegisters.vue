<script setup lang="ts">
import { inject, ref, onMounted, computed } from 'vue';
import { GlobalState } from './../../state';
import AbacusEmulator from '@/abacus/abacus';

const globalState: GlobalState = inject('globalState') || {} as GlobalState;
const emulator: AbacusEmulator = inject('emulator') || {} as AbacusEmulator;

const columns: any[] = [
    { field: 'address', header: '0x' },
    { field: 'value', header: 'Valor' },
    { field: 'comment', header: 'Comentario' },
];

interface Item {
    setBreakpoint: () => void;
    address: string;
    value: string;
    comment: string;
}

const programAddresses = computed(() => globalState.program.registers.map((r) => r.address));

const registers = computed(
    () => Array.from(emulator.registers.values())
        .filter((r) => programAddresses.value.includes(r.address))
);

const items = computed(() => registers.value.map((r) => ({
    setBreakpoint: () => emulator.hasBreakpoint(r.address) ? emulator.removeBreakpoint(r.address) : emulator.addBreakpoint(r.address),
    address: r.address,
    value: r.value,
    comment: r.comment,
})));

const rowClass = (data: Item) => {
    return [{ '!bg-primary !text-primary-contrast': data.address === emulator.current_address }];
};
</script>

<template>
    <Card class="flex-initial">
        <template #title>Program</template>
        <template #content>
            <DataTable scrollable scrollHeight="75vh" :value="items" :rowClass="rowClass" :pt="{
                table: { style: 'min-width: 25rem' },
                column: {
                    bodycell: ({ state }) => ({
                        class: [{ '!py-0': state['d_editing'] }]
                    })
                }
            }" style="height: 100%;">
                <Column key="breakpoint" header=" " field="breakpoint">
                    <template #body="{ data }">
                        <td v-if="emulator.hasBreakpoint(data.address)">
                            <Button icon="pi pi-circle-fill" size="small" severity="danger" text rounded
                                @click="data.setBreakpoint()" />
                        </td>
                        <td v-else>
                            <Button icon="pi pi-circle" size="small" severity="secondary" text rounded
                                @click="data.setBreakpoint()" />
                        </td>
                    </template>
                </Column>
                <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
                    <template #body="{ data, field }">
                        {{ data[field] }}
                    </template>
                </Column>
            </DataTable>
        </template>
    </Card>

</template>

<style scoped>
.current-register {
    background-color: chocolate;
    font-weight: bold;
    transition: background-color 0.2s ease;
}
</style>
