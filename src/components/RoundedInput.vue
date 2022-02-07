<template>
  <div
    class="bg-stone-200 border-0 rounded-xl flex ring-red-500 py-0 px-2 items-center gap-2"
    :class="noRing? '' : 'focus-within:ring-2'"
    ref="inputContainer"
  >
    <slot name="before"></slot>
    <div class="relative grow py-2" @click="focusInput">
      <div
        v-if="label.length > 0"
        class="text-stone-500 text-sm"
      >
        {{label}}
      </div>
      <input
        :type="inputType"
        class="w-full bg-transparent focus:ring-0 border-0 p-0 align-middle"
        v-model="internalModelValue"
        ref="inputElement"
      >
    </div>
    <button
      v-if="clearable"
      class="icon-md"
      @click="clearInput"
    >clear</button>
    <slot name="after"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  inputType: {
    type: String,
    default: "text",
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  noRing: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue'])

const inputElement = ref<HTMLInputElement>();
const inputContainer = ref<HTMLDivElement>();
const internalModelValue = ref<String>("");


watchEffect(() => {
  internalModelValue.value = props.modelValue.toString();
});
watchEffect(() => {
  inputContainer.value?.scrollIntoView({
    block: "nearest"
  });
  emit('update:modelValue', internalModelValue.value);
});
function focusInput(){
  inputElement.value?.focus();
}
function clearInput(){
  internalModelValue.value = "";
  focusInput();
}

defineExpose({focusInput});
</script>