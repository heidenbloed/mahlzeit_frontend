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
    <input
      type="number"
      class="w-24 hidden md:block bg-stone-200 rounded-xl focus:ring-2 focus:ring-red-500 px-2 border-0"
      v-model="numServings"
    />
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