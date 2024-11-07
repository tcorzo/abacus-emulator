<template>
    <Card class="flex-initial">
        <template #title>{{ props.title }}</template>
        <template #content>
            <ContextMenu v-if="props.editable" ref="cm" :model="menuModel" @hide="selectedRegister = null" />
            <DataTable :value="props.registers" :editMode="editMode" scrollable scrollHeight="75vh"
                @cell-edit-complete="onCellEditComplete" :contextMenu="props.editable"
                v-model:contextMenuSelection="selectedRegister" @rowContextmenu="onRowContextMenu" :pt="{
                    table: { style: 'min-width: 25rem' },
                    column: {
                        bodycell: ({ state }) => ({
                            class: [{ '!py-0': state['d_editing'] }]
                        })
                    }
                }" style="height: 100%;">
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

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { Register } from './../abacus/program';

const props = defineProps({
    title: String,
    registers: {
        type: Array as PropType<Register[]>,
        required: true
    },
    editable: {
        type: Boolean,
        required: false,
        default(_: any) {
            return false;
        }
    }
})

const editMode = props.editable ? 'cell' : undefined

const columns = [
    { field: 'address', header: '0x' },
    { field: 'value', header: 'Valor' },
    { field: 'comment', header: 'Comentario' },
];

// Editable table
const onCellEditComplete = (event: any) => {
    let { data, newValue, field } = event;
    data[field] = newValue;
};

// Context menu
const cm = ref();
const selectedRegister = ref();
const menuModel = ref([
    { label: 'Insert Above', icon: 'pi pi-fw pi-arrow-up', command: () => insertAbove(selectedRegister.value) },
    { label: 'Insert Below', icon: 'pi pi-fw pi-arrow-down', command: () => insertBelow(selectedRegister.value) },
    { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => deleteRegister(selectedRegister.value) }
]);
const onRowContextMenu = (event) => {
    cm.value.show(event.originalEvent);
};
const deleteRegister = (register: Register) => {
    props.registers.splice(props.registers.indexOf(register), 1);
};
const insertAbove = (register: Register) => {
    const index = props.registers.indexOf(register);
    props.registers.splice(index, 0, new Register({ address: '000', value: '0000', comment: '' }));
};
const insertBelow = (register: Register) => {
    const index = props.registers.indexOf(register);
    props.registers.splice(index + 1, 0, new Register({ address: '000', value: '0000', comment: '' }));
};
</script>
