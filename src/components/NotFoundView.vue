<template>
  <div class="flex h-full flex-col justify-center">
    <div class="flex flex-col gap-4 rounded-xl bg-white p-4">
      <h1 class="text-center text-7xl">404</h1>
      <p class="text-center">Die Seite existiert leider nicht. 😔</p>
      <RoundedButton @click="$router.push('/')">Zur Startseite</RoundedButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import RoundedButton from "./RoundedButton.vue";
</script>
