<template>
  <Dialog :open="needRefresh" class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center">
      <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
      <div
        class="flex w-96 transform flex-col gap-2 rounded-2xl bg-white p-4 shadow-xl"
      >
        <DialogTitle class="text-2xl font-bold text-gray-800">
          Update verfügbar
        </DialogTitle>
        <DialogDescription> App neuladen? </DialogDescription>
        <div class="flex justify-end gap-4">
          <RoundedButton @click="updateServiceWorker()" type="flat">
            <template #default>Ok</template>
          </RoundedButton>
          <RoundedButton @click="close()" type="flat">
            <template #default>Abbrechen</template>
          </RoundedButton>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import RoundedButton from "./RoundedButton.vue";
import { useRegisterSW } from "virtual:pwa-register/vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
} from "@headlessui/vue";

const { needRefresh, updateServiceWorker } = useRegisterSW();

function close() {
  needRefresh.value = false;
}
</script>
