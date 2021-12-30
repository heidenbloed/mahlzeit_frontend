<template>
  <section class="p-2 bg-stone-100 rounded-xl">
    <h2 class="font-semibold text-lg mb-2">
      {{title}}
    </h2>
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string,
}>();
</script>