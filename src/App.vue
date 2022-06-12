<template>
  <ReloadPWA />
  <div class="h-full w-full overflow-auto bg-stone-200">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import ReloadPWA from "@/components/ReloadPWA.vue";
</script>
