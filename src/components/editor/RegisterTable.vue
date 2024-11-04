<script setup lang="ts">
import { Register } from '@/abacus/program';

const onCellEditComplete = (event: any) => {
    let { data, newValue, field } = event;
    data[field] = newValue;
};

const columns = [
    { field: 'address', header: '0x' },
    { field: 'value', header: 'Valor' },
    { field: 'comment', header: 'Comentario' },
];

const props = defineProps<{
    title: string
    registers: Register[]
}>()
</script>

<template>
    <Card>
        <template #title>{{ props.title }}</template>
        <template #content>
            <DataTable scrollable scrollHeight="400px" :value="props.registers" editMode="cell"
                @cell-edit-complete="onCellEditComplete" :pt="{
                    table: { style: 'min-width: 25rem' },
                    column: {
                        bodycell: ({ state }) => ({
                            class: [{ '!py-0': state['d_editing'] }]
                        })
                    }
                }">
                <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"
                    style="width: 33%">
                    <template #body="{ data, field }">
                        {{ data[field] }}
                    </template>
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" autofocus fluid />
                    </template>
                </Column>
            </DataTable>
        </template>
    </Card>
</template>
