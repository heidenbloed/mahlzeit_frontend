<template>
  <button
    class="h-10 rounded-lg px-2 py-1 font-semibold inline-flex items-center justify-center"
    :class="additionalButtonClasses"
  >
    <span class="icon-md">
      <slot name="icon"></slot>
    </span>
    <span class="font-button font-semibold text-sm uppercase">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: "flat",
    validator: (val: string) => ["primary", "raised", "flat"].includes(val),
  }
});
const slots = useSlots();

const additionalButtonClasses = computed(() => {
  let additionalClasses = ""
  if(props.type == "primary") {
    additionalClasses += "bg-red-500 border-0 text-white";
  } else if(props.type == "raised") {
    additionalClasses += "bg-white border-2 border-red-500 text-red-500";
  } else {
    additionalClasses += "text-red-500";
  }
  if(slots.default && slots.icon) {
    additionalClasses += " gap-2"
  }
  return additionalClasses;
});
</script>