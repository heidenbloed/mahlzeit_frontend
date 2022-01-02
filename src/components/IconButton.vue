<template>
  <RoundedButton
    class="w-10 h-10 flex justify-center items-center"
    :type="type"
  >
    <div
      class="icon-md"
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