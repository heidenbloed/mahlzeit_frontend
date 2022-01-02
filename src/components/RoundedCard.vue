<template>
  <li
    class="max-w-full bg-white rounded-xl shadow-xl"
    :class="noWidthLimit ? '' : 'w-[28rem]'"
  >
    <slot></slot>
  </li>
</template>

<script setup lang="ts">
defineProps({
  noWidthLimit: {
    type: Boolean,
    default: false,
    required: false
  }
});
</script>