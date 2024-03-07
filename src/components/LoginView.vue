<template>
  <form @submit="onSubmit" v-show="!authStore.userIsLoggedIn">
    <RoundedDialog :open="!authStore.userIsLoggedIn">
      <template #message>
        <div class="mt-4 mb-4 flex flex-col gap-4">
          <div class="font-logo text-center text-6xl text-red-500">
            Mahlzeit
          </div>
          <RoundedInput
            name="username"
            label="Nutzername"
            v-model="_username"
            rules="required"
            autocompleteHint="username"
          />
          <RoundedInput
            name="password"
            label="Passwort"
            inputType="password"
            v-model="_password"
            rules="required"
            autocompleteHint="current-password"
          />
        </div>
      </template>
      <template #buttons>
        <RoundedButton
          type="primary"
          buttonType="submit"
          class="w-full"
          :class="submitButtonClasses"
          >Anmelden</RoundedButton
        >
      </template>
    </RoundedDialog>
  </form>
</template>

<script setup lang="ts">
import RoundedDialog from "./RoundedDialog.vue";
import RoundedInput from "./RoundedInput.vue";
import RoundedButton from "./RoundedButton.vue";
import { useAuthentificationStore } from "../stores/authentification";
import { useForm } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";

const _username = ref("");
const _password = ref("");
const authStore = useAuthentificationStore();

const router = useRouter();

const submitButtonClasses = ref("");
function shakeSubmitButton() {
  submitButtonClasses.value = "animate-shake";
  setTimeout(() => {
    submitButtonClasses.value = "";
  }, 1000);
}

const { handleSubmit } = useForm();
function onInvalidSubmit({ values, errors, results }: any) {
  console.log("Invalid form values:", errors);
  shakeSubmitButton();
}
const onSubmit = handleSubmit(async (values) => {
  const successfulLogin = await authStore.loginUser(
    _username.value,
    _password.value
  );
  if (!successfulLogin) {
    shakeSubmitButton();
  } else {
    router.go(0);
  }
}, onInvalidSubmit);
</script>
