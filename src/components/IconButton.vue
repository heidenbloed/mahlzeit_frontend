<template>
  <RoundedButton
    class="w-12 h-12"
    :type="type"
  >
    <div
      class="material-icons-outlined text-2xl"
    >
      <slot></slot>
    </div>
  </RoundedButton>
</template>

<script setup lang="ts">
import RoundedButton from '@/components/RoundedButton.vue';

const props = defineProps({
  type: {
    type: String,
    default: "primary",
    validator: (val: string) => ["primary", "secondary"].includes(val),
  }
});
</script>