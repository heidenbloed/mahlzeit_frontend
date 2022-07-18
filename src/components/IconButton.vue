<template>
  <RoundedButton
    class="w-10"
    :type="type"
    :buttonType="buttonType"
    :disabled="disabled"
  >
    <span class="icon-md">
      <slot></slot>
    </span>
  </RoundedButton>
</template>

<script setup lang="ts">
import RoundedButton from "./RoundedButton.vue";

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
</script>
