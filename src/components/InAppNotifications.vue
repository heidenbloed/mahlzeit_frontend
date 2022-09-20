<template>
  <div class="flex max-w-full flex-col place-items-end gap-2 p-2">
    <TransitionGroup name="fade">
      <RoundedNotification
        v-for="notificationInfo in notificationStore.notifications"
        :key="notificationInfo.key"
        :notificationKey="notificationInfo.key"
        :closeable="notificationInfo.closeable || true"
      >
        <p class="font-bold">{{ notificationInfo.text }}</p>
        <p class="italic" v-if="notificationInfo.detailText">
          {{ notificationInfo.detailText }}
        </p>
      </RoundedNotification>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import RoundedNotification from "./RoundedNotification.vue";
import { useInAppNotificationStore } from "../stores/inAppNotifications";

const notificationStore = useInAppNotificationStore();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-700;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
