<template>
  <div class="fixed z-50">
    <div
      class="fixed inset-0 min-h-screen overflow-y-auto bg-black opacity-40"
    ></div>
    <div class="fixed inset-0 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingSpinner from "./LoadingSpinner.vue";
</script>
