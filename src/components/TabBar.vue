<template>
  <header class="fixed bottom-0 z-20 h-16 w-full md:top-0">
    <div
      class="shadow-t-lg mx-auto grid h-full auto-cols-fr grid-flow-col place-items-center rounded-t-xl bg-white px-2 md:container md:rounded-b-xl md:rounded-t-none md:shadow-lg"
    >
      <div class="hidden md:block">
        <slot name="logo"></slot>
      </div>
      <slot name="buttons"></slot>
    </div>
  </header>
  <div class="flex h-full w-full flex-col">
    <div class="mb-4 hidden h-16 shrink-0 md:block"></div>
    <div
      class="container relative mx-auto grow scroll-mt-5 pb-2 md:pb-4"
      ref="appContainer"
    >
      <slot name="content"></slot>
    </div>
    <div class="h-16 shrink-0 md:hidden"></div>
  </div>
  <footer class="fixed bottom-16 right-0 max-w-full md:right-16">
    <slot name="footer"></slot>
  </footer>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";

const appContainer = ref<HTMLDivElement | null>(null);
provide("appContainer", appContainer);
</script>

<style>
* {
  @apply scroll-mb-16 md:scroll-mt-16;
}
</style>
