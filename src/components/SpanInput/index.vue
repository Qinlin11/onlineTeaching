<template>
    <div class="editable">
        <template v-if="!isEditing">
            <el-tag @click="startEditing">{{ modelValue }}</el-tag>
            <i class="el-icon-edit" @click="startEditing"></i>
        </template>
        <template v-else>
            <el-input
                v-model="inputValue"
                ref="inputRef"
                size="small"
                @blur="finishEditing()"
                @keyup.enter="finishEditing"
            />
            <i class="el-icon-check" @click="finishEditing"></i>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const props = defineProps({
    modelValue: {
        type: [String, undefined],
        default: ''
    }
});

const emits = defineEmits(['update:modelValue']);

const isEditing = ref(false);
const inputValue = ref('');

const inputRef = ref(null);

onMounted(() => {
    nextTick(() => {
        const input = inputRef.value;
        if (input) {
            input.focus();
        }
    });
});

const startEditing = () => {
    inputValue.value = props.modelValue;
    isEditing.value = true;
    nextTick(() => {
        const input = inputRef.value;
        if (input) {
            input.focus();
        }
    });
};

const finishEditing = () => {
    isEditing.value = false;
    emits('update:modelValue', inputValue.value);
};
</script>

<style scoped>
.editable {
    display: inline-block;
}

.editable span {
    cursor: pointer;
}

.editable i {
    margin-left: 5px;
    cursor: pointer;
}
</style>
