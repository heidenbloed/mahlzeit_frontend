<template>
  <section class="rounded-xl bg-stone-100 p-2">
    <h2 v-if="title" class="mb-2 text-lg font-semibold">
      {{ title }}
    </h2>
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
}>();
</script>
