<template>
  <button
    class="fixed right-8 bottom-24 z-10 inline-flex h-14 w-14 items-center justify-center rounded-full px-2 font-semibold"
    :class="additionalButtonClasses"
    type="button"
  >
    <span class="icon-md">
      <slot>question_mark</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    type?: "primary" | "raised" | "flat";
  }>(),
  {
    type: "primary",
  }
);

const additionalButtonClasses = computed(() => {
  if (props.type == "primary") {
    return "bg-red-500 border-0 text-white";
  } else if (props.type == "raised") {
    return "bg-white border-2 border-red-500 text-red-500";
  } else {
    return "text-red-500";
  }
});
</script>
