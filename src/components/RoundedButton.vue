<template>
  <button
    class="h-10 rounded-lg md:hover:shadow-lg md:hover:shadow-red-500/50 md:hover:-translate-y-1 transition-all px-2 py-1 font-semibold flex items-center justify-center gap-2"
    :class="isPrimary ? 'bg-red-500 border-0 text-white' : 'bg-white border-2 border-red-500 text-red-500'"
  >
    
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';

const props = defineProps({
  type: {
    type: String,
    default: "primary",
    validator: (val: string) => ["primary", "secondary"].includes(val),
  }
});
const isPrimary = computed(() => props.type == "primary")
</script>