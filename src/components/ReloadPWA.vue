<template>
  <ConfirmDialog
    :open="needRefresh"
    title="Update verfügbar"
    @confirmed="updateServiceWorker"
    @cancelled="close"
  >
    App neuladen?
  </ConfirmDialog>
</template>

<script setup lang="ts">
import ConfirmDialog from "./ConfirmDialog.vue";
import { useRegisterSW } from "virtual:pwa-register/vue";

const { needRefresh, updateServiceWorker } = useRegisterSW();

function close() {
  needRefresh.value = false;
}
</script>
