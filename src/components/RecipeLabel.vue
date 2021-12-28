<template>
  <span 
    class=" px-2 py-0 rounded-xl border"
    :class="categoryClasses"
  >
    {{name}}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  name: string,
  category: string
}>();

const categoryClasses = computed(() => {
  if (props.category === "diet"){
    return "border-lime-700 bg-lime-100 text-lime-700"
  }
  else if (props.category === "complexity"){
    return "border-sky-800 bg-sky-100 text-sky-800"
  }
  else if (props.category === "cuisine"){
    return "border-amber-600 bg-amber-100 text-amber-600"
  }
  else {
    return "border-stone-800 bg-stone-100 text-stone-800"
  }
});
</script>