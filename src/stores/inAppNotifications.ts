import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface NotificationInfo {
  key: string;
  text: string;
  detailText?: string;
  closeable?: boolean;
}

export const useInAppNotificationStore = defineStore(
  "inAppNotifications",
  () => {
    const notificationMap = ref<Map<string, NotificationInfo>>(
      new Map<string, NotificationInfo>()
    );
    const notifications = computed(() => notificationMap.value.values());
    const timeoutMap = new Map<string, number>();

    function createNotification(
      notificationInfo: NotificationInfo,
      timeout: number
    ) {
      notificationMap.value.set(notificationInfo.key, notificationInfo);
      if (timeoutMap.has(notificationInfo.key)) {
        clearTimeout(timeoutMap.get(notificationInfo.key));
      }
      const timeoutId = setTimeout(() => {
        closeNotification(notificationInfo.key);
      }, timeout);
      timeoutMap.set(notificationInfo.key, timeoutId);
    }

    function closeNotification(notificationKey: string) {
      notificationMap.value.delete(notificationKey);
      if (timeoutMap.has(notificationKey)) {
        clearTimeout(timeoutMap.get(notificationKey));
      }
    }

    return {
      notifications,
      createNotification,
      closeNotification,
    };
  }
);
