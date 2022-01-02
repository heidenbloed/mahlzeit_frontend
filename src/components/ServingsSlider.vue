<template>
  <div class="flex gap-4 my-2 w-full md:w-auto">
    <span class="icon-md">people</span>
    <span class="block md:hidden">{{numServings}}</span>
    <input 
      type="range"
      v-model="numServings"
      min="1"
      max="15"
      class="grow block md:hidden accent-red-500"
    >
    <input
      type="number"
      v-model="numServings"
      class="w-20 hidden md:block bg-gray-200 rounded-xl px-2 py-0"
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
  defaultNumServings: number
}>();

const numServings = ref(props.defaultNumServings);
watchEffect(() => emit("update:modelValue", numServings.value));
</script>