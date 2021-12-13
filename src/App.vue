<template>
  <ReloadPWA/>
  <div class="min-w-screen min-h-screen bg-stone-200">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import ReloadPWA from "@/components/ReloadPWA.vue";
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');
</style>