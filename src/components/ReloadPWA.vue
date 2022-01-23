<template>
  <Dialog :open="needRefresh" class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <DialogOverlay class="fixed inset-0 bg-black opacity-30"/>
      <div class="w-96 p-4 bg-white shadow-xl rounded-2xl transform flex flex-col gap-2">
        <DialogTitle class="text-2xl font-bold text-gray-800">
          Update verfügbar
        </DialogTitle>
        <DialogDescription>
          App neuladen?
        </DialogDescription>
        <div class="flex gap-4 justify-end">
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
import RoundedButton from "@/components/RoundedButton.vue";
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