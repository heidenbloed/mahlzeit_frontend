<template>
  <button
    class="w-12 h-12 rounded-lg hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-1 transition-all"
    :class="isPrimary ? 'bg-red-500 border-0' : 'bg-white border-2 border-red-500'"
  >
    <div
      class="material-icons-outlined text-2xl"
      :class="isPrimary ? 'text-white' : 'text-red-500'"
    >
      <slot></slot>
    </div>
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