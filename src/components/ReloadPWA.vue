<template>
  <Dialog :open="needRefresh" class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <DialogOverlay class="fixed inset-0 bg-black opacity-30"/>
      <div class="max-w-md p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl rounded-2xl transform">
        <DialogTitle class="text-lg font-bold leading-6 text-gray-900 m-0 mb-3">
          Update verfügbar
        </DialogTitle>
        <DialogDescription class="my-3">
          App neuladen?
        </DialogDescription>
        <div class="flex gap-3 mt-3">
          <button @click="updateServiceWorker()" class="inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none bg-gray-300">
            Ok
          </button>
          <button @click="close()" class="inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none bg-gray-300">
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, ComputedRef } from 'vue'
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