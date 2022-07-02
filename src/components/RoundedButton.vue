<template>
  <button
    class="inline-flex h-10 items-center justify-center rounded-lg px-2 font-semibold"
    :class="additionalButtonClasses"
    :type="buttonType"
    :disabled="disabled"
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
    disabled?: boolean;
  }>(),
  {
    type: "flat",
    buttonType: "button",
    disabled: false,
  }
);
const slots = useSlots();

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
  if (slots.default && slots.icon) {
    additionalClasses += " gap-2";
  }
  return additionalClasses;
});
</script>
