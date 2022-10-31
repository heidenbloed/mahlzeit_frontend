<template>
  <ReloadPWA />
  <div class="h-full w-full overflow-auto bg-stone-200" ref="appDiv">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import ReloadPWA from "./components/ReloadPWA.vue";
import { provide, ref } from "vue";

const appDiv = ref<HTMLDivElement | null>(null);
provide("appDiv", appDiv);
</script>
