<template>
  <RoundedButton class="w-10" :type="type">
    <span class="icon-md">
      <slot></slot>
    </span>
  </RoundedButton>
</template>

<script setup lang="ts">
import RoundedButton from "@/components/RoundedButton.vue";

const props = defineProps({
  type: {
    type: String,
    default: "primary",
    validator: (val: string) => ["primary", "secondary"].includes(val),
  },
});
</script>
