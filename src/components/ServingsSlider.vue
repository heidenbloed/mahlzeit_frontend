<template>
  <div class="flex gap-4 my-2 w-full md:w-auto items-center">
    <span class="icon-md">people</span>
    <span class="block md:hidden w-4">{{numServings}}</span>
    <input 
      type="range"
      v-model.number="numServings"
      min="1"
      max="15"
      class="grow block md:hidden accent-red-500"
    >
    <RoundedInput
      inputType="number"
      class="w-20 hidden md:block"
      v-model.number="numServings"
    />
    {{numServings}}
  </div>
</template>

<script setup lang="ts">
import RoundedInput from "@/components/RoundedInput.vue";
import { ref, watchEffect } from "vue";


const props = defineProps<{
  modelValue: number
}>();
const emit = defineEmits(["update:modelValue"]);

const numServings = ref(props.modelValue);
watchEffect(() => emit("update:modelValue", numServings.value));
</script>