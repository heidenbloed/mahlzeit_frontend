import { defineStore } from "pinia";
import { ref } from "vue";
import {
  createPushSubscription,
  updatePushSubscription,
} from "../api/recipeDbApi";
import { useRegisterSW } from "virtual:pwa-register/vue";
import { useLocalStorage } from "@vueuse/core";
import { PushSettings } from "../types/pushTypes";
import { PushSubscriptionInfoFull } from "../types/recipeDbTypes";

export const usePushSettingsStore = defineStore("pushSettings", () => {
  const confirmedPushSettings = useLocalStorage<PushSettings>(
    "confirmedPushSettings",
    {
      notifyAtNewRecipes: false,
    }
  );
  const pushSettings = ref<PushSettings>({ ...confirmedPushSettings.value });

  const _callback = ref<(err: string | unknown) => void>(console.error);
  function registerErrorCallback(
    errorCallback: (err: string | unknown) => void
  ) {
    _callback.value = errorCallback;
  }

  async function syncPushSettings() {
    try {
      confirmedPushSettings.value = await updatePushSettings(
        pushSettings.value
      );
    } catch (err) {
      _callback.value(err);
    } finally {
      pushSettings.value = { ...confirmedPushSettings.value };
    }
  }

  return {
    pushSettings,
    syncPushSettings,
    registerErrorCallback,
  };
});

async function updatePushSettings(
  pushSettings: PushSettings
): Promise<PushSettings> {
  const permissionResult = await askForNotificationPermission();
  if (permissionResult !== "granted") {
    throw "Push notification permission was not granted.";
  } else {
    const pushSubscription = await subscribeToPush();
    return sendPushSubToBackend(pushSubscription, pushSettings);
  }
}

function askForNotificationPermission(): Promise<NotificationPermission> {
  return new Promise<NotificationPermission>(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result);
    });
    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  });
}

function subscribeToPush(): Promise<PushSubscription> {
  return new Promise<PushSubscription>((resolve, reject) => {
    setTimeout(() => {
      reject("Time out for push subscription.");
    }, 3000);
    useRegisterSW({
      onRegistered: async (registration) => {
        if (registration) {
          const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: import.meta.env.VITE_VAPID_PUB_KEY,
          };
          registration.pushManager
            .subscribe(subscribeOptions)
            .then(resolve, reject);
        } else {
          reject(
            "Can not subscribe to push, as service worker is not available."
          );
        }
      },
    });
  });
}

async function sendPushSubToBackend(
  pushSubscription: PushSubscription,
  pushSettings: PushSettings
): Promise<PushSettings> {
  const pushSubscriptionParsed: PushSubscriptionJSON = JSON.parse(
    JSON.stringify(pushSubscription)
  );
  if (
    pushSubscriptionParsed.keys?.p256dh &&
    pushSubscriptionParsed.keys?.auth
  ) {
    try {
      let pushSubscriptionResponse: PushSubscriptionInfoFull | null = null;
      if (pushSettings.endpoint) {
        pushSubscriptionResponse = await updatePushSubscription(
          pushSettings.endpoint,
          {
            notify_at_new_recipes: pushSettings.notifyAtNewRecipes,
          }
        );
      } else {
        pushSubscriptionResponse = await createPushSubscription({
          endpoint: pushSubscription.endpoint,
          p256dh_key: pushSubscriptionParsed.keys.p256dh,
          auth_key: pushSubscriptionParsed.keys.auth,
          notify_at_new_recipes: pushSettings.notifyAtNewRecipes,
        });
      }
      return {
        endpoint: pushSubscriptionResponse.endpoint,
        notifyAtNewRecipes: pushSubscriptionResponse.notify_at_new_recipes,
      };
    } catch (err: any) {
      if (
        err.response?.data?.endpoint?.length > 0 &&
        err.response.data.endpoint[0] ===
          "push subscription with this endpoint already exists."
      ) {
        const pushSubscriptionResponse = await updatePushSubscription(
          pushSubscription.endpoint,
          {
            notify_at_new_recipes: pushSettings.notifyAtNewRecipes,
          }
        );
        return {
          endpoint: pushSubscriptionResponse.endpoint,
          notifyAtNewRecipes: pushSubscriptionResponse.notify_at_new_recipes,
        };
      } else {
        throw err;
      }
    }
  } else {
    throw "Push subscription does not contain the necessary information.";
  }
}
