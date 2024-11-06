<script setup lang="ts">
import { inject } from 'vue';
import { GlobalState } from '@/state';

const globalState: GlobalState = inject('globalState') || {} as GlobalState;

const onCellEditComplete = (event: any) => {
    let { data, newValue, field } = event;
    data[field] = newValue;
};
</script>

<template>
    <Card class="flex-initial">
        <template #title>Operaciones</template>
        <template #content>
            <DataTable scrollable scrollHeight="75vh" :value="globalState.program.operations" editMode="cell"
                @cell-edit-complete="onCellEditComplete" :pt="{
                    table: { style: 'min-width: 25rem' },
                    column: {
                        bodycell: ({ state }) => ({
                            class: [{ '!py-0': state['d_editing'] }]
                        })
                    }
                }" style="height: 100%;">
                <Column field="code" header="Código">
                    <template #body="{ data, field }">
                        {{ data[field] }}
                    </template>
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" autofocus fluid />
                    </template>
                </Column>
                <Column field="name" header="Operación">
                    <template #body="{ data }">
                        {{ data.operation_type.name }}
                    </template>
                </Column>

            </DataTable>
        </template>
    </Card>
</template>
