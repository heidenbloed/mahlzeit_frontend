<template>
  <dialog class="fixed z-50" :open="open">
    <div
      class="fixed inset-0 min-h-screen overflow-y-auto bg-black opacity-40"
    ></div>
    <div class="fixed inset-0 flex flex-row items-center justify-center p-2">
      <div
        class="flex w-96 max-w-full flex-col gap-2 rounded-xl bg-white p-4 shadow-xl"
      >
        <h2 class="text-2xl font-semibold" v-if="title">
          {{ title }}
        </h2>
        <p>
          <slot name="message"></slot>
        </p>
        <div class="flex flex-row justify-end gap-4">
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  open?: boolean;
  title?: string;
}>();
</script>
