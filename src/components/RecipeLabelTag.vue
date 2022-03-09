<template>
  <component
    :is="closeable ? 'button' : 'span'"
    class="inline-flex items-center gap-1 rounded-xl px-2 py-1"
    :class="categoryClasses"
  >
    <span>{{ name }}</span>
    <span v-if="closeable" class="icon-sm">close</span>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  name: String,
  category: String,
  closeable: {
    type: Boolean,
    default: false,
    requried: false,
  },
});

const categoryClasses = computed(() => {
  if (props.category === "diet") {
    return "border-lime-700 bg-lime-100 text-lime-700";
  } else if (props.category === "complexity") {
    return "border-sky-800 bg-sky-100 text-sky-800";
  } else if (props.category === "cuisine") {
    return "border-amber-600 bg-amber-100 text-amber-600";
  } else {
    return "border-red-800 bg-red-100 text-red-800";
  }
});
</script>
