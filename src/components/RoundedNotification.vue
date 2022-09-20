<template>
  <div
    class="flex w-96 max-w-full flex-row gap-2 rounded-xl bg-stone-400 p-2 text-white transition-all"
  >
    <span class="grow">
      <slot></slot>
    </span>
    <button
      type="button"
      v-if="closeable"
      class="icon-md"
      @click="closeNotification"
    >
      close
    </button>
  </div>
</template>

<script setup lang="ts">
import { useInAppNotificationStore } from "../stores/inAppNotifications";

const props = defineProps<{
  notificationKey: string;
  closeable: boolean;
}>();

const notificationStore = useInAppNotificationStore();

function closeNotification() {
  notificationStore.closeNotification(props.notificationKey);
}
</script>
