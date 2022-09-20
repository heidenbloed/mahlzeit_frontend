<template>
  <section class="rounded-xl bg-stone-100 p-2">
    <h2
      v-if="title || icon"
      class="mb-2 flex flex-row gap-2 text-lg font-semibold"
    >
      <span v-if="icon" class="icon-md"> {{ icon }} </span>
      <span v-if="title"> {{ title }} </span>
    </h2>
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  icon?: string;
}>();
</script>
