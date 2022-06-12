<template>
  <button
    class="inline-flex h-10 items-center justify-center rounded-lg px-2 font-semibold"
    :class="additionalButtonClasses"
    :type="buttonType"
  >
    <span class="icon-md">
      <slot name="icon"></slot>
    </span>
    <span class="font-button text-sm font-semibold uppercase">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

const props = withDefaults(
  defineProps<{
    type?: "primary" | "raised" | "flat";
    buttonType?: "button" | "submit" | "reset";
  }>(),
  {
    type: "flat",
    buttonType: "button",
  }
);
const slots = useSlots();

const additionalButtonClasses = computed(() => {
  let additionalClasses = "";
  if (props.type == "primary") {
    additionalClasses += "bg-red-500 border-0 text-white";
  } else if (props.type == "raised") {
    additionalClasses += "bg-white border-2 border-red-500 text-red-500";
  } else {
    additionalClasses += "text-red-500";
  }
  if (slots.default && slots.icon) {
    additionalClasses += " gap-2";
  }
  return additionalClasses;
});
</script>
