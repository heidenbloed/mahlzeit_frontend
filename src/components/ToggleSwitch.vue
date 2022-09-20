<template>
  <label :for="id" class="relative inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      v-model="_modelValue"
      :id="id"
      class="peer sr-only"
      :disabled="disabled"
    />
    <div
      class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:transition-all after:content-[''] peer-checked:bg-red-300 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500"
      :class="disabled ? 'after:bg-gray-200' : 'after:bg-white'"
    ></div>
    <span
      class="ml-3 align-middle"
      :class="disabled ? 'text-gray-400' : 'text-black'"
    >
      <slot></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    id: string;
    modelValue?: boolean;
    disabled?: boolean;
  }>(),
  {
    modelValue: false,
    disabled: false,
  }
);
const emit = defineEmits(["update:modelValue"]);

const _modelValue = ref(props.modelValue);
watch(_modelValue, (newVal, prevVal) => {
  emit("update:modelValue", newVal);
});
watch(
  () => props.modelValue,
  (newVal, prevVal) => {
    if (_modelValue.value != newVal) {
      _modelValue.value = newVal;
    }
  }
);
</script>
