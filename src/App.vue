<template>
  <ReloadPWA />
  <div class="min-w-screen min-h-screen bg-stone-200">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import ReloadPWA from "@/components/ReloadPWA.vue";
</script>
