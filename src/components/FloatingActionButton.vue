<template>
  <button
    class="fixed right-8 bottom-24 z-10 inline-flex h-14 w-14 items-center justify-center rounded-full px-2 font-semibold"
    :class="additionalButtonClasses"
    type="button"
    :disabled="disabled"
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
    disabled?: boolean;
  }>(),
  {
    type: "primary",
    disabled: false,
  }
);

const additionalButtonClasses = computed(() => {
  let additionalClasses = "";
  if (props.type == "primary") {
    additionalClasses += "border-0 text-white";
    if (props.disabled) {
      additionalClasses += " bg-gray-300";
    } else {
      additionalClasses += " bg-red-500";
    }
  } else if (props.type == "raised") {
    additionalClasses += "bg-white border-2";
    if (props.disabled) {
      additionalClasses += " border-gray-300 text-gray-300";
    } else {
      additionalClasses += " border-red-500 text-red-500";
    }
  } else {
    if (props.disabled) {
      additionalClasses += " text-gray-300";
    } else {
      additionalClasses += " text-red-500";
    }
  }
  return additionalClasses;
});
</script>
