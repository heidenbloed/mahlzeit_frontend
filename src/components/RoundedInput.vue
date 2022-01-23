<template>
  <div
    class="bg-stone-200 rounded-xl flex ring-red-500 px-2 items-center gap-2"
    :class="noRing? '' : 'focus-within:ring-2'"
  >
    <slot name="before"></slot>
    <div class="relative grow py-2" @click="focusInput">
      <div
        v-show="label.length > 0"
        class="text-stone-500 text-sm"
      >
        {{label}}
      </div>
      <input
        :type="inputType"
        class="w-full bg-transparent focus:ring-0 border-0 p-0"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        v-model="inputStr"
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
import { onMounted, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
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
  }
});

const inputElement = ref<HTMLInputElement>();
const inputStr = ref<String>(props.modelValue);


function focusInput(){
  inputElement.value?.focus();
}
function clearInput(){
  inputStr.value = "";
  focusInput();
}

defineExpose({focusInput});

onMounted(() => console.log(props.modelValue));
</script>