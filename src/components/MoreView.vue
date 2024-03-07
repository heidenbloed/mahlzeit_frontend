<template>
  <main
    class="mx-auto grid max-w-4xl grid-cols-1 gap-4 rounded-b-xl bg-white p-4 md:rounded-t-xl"
  >
    <SubSection title="Account" icon="face">
      <RoundedButton type="flat" @click="authStore.logoutUser">
        <template #icon>logout</template>
        <template #default>Ausloggen</template>
      </RoundedButton>
    </SubSection>
    <SubSection title="Benachrichtigungen" icon="notifications">
      <ToggleSwitch
        id="push-new-recipes"
        v-model="pushSettingsStore.pushSettings.notifyAtNewRecipes"
        :disabled="!pushSupported"
        @change="pushSettingsStore.syncPushSettings"
      >
        Neue Rezepte
      </ToggleSwitch>
    </SubSection>
  </main>
</template>

<script setup lang="ts">
import SubSection from "./SubSection.vue";
import ToggleSwitch from "./ToggleSwitch.vue";
import RoundedButton from "./RoundedButton.vue";
import { usePushSettingsStore } from "../stores/pushSettings";
import { useInAppNotificationStore } from "../stores/inAppNotifications";
import { useAuthentificationStore } from "../stores/authentification";

const pushSupported = "serviceWorker" in navigator && "PushManager" in window;

const pushSettingsStore = usePushSettingsStore();
const inAppNotificationStore = useInAppNotificationStore();
const authStore = useAuthentificationStore();

pushSettingsStore.registerErrorCallback((err) => {
  console.error(err);
  let detailText = undefined;
  if (
    typeof err === "string" ||
    err instanceof String ||
    err instanceof Error
  ) {
    detailText = err.toString();
  }
  inAppNotificationStore.createNotification(
    {
      key: "push-settings-update-error",
      text: "Leider nicht erfolgreich",
      detailText: detailText,
    },
    5000
  );
});
</script>
