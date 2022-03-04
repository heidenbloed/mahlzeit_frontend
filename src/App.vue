<template>
  <ReloadPWA />
  <div class="w-screen h-screen bg-stone-200 overflow-auto">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import ReloadPWA from "@/components/ReloadPWA.vue";
</script>
