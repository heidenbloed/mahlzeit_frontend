<template>
  <form @submit="onSubmit" class="h-full">
    <div class="flex h-full items-center justify-center p-4">
      <div class="flex w-96 flex-col gap-4 rounded-xl bg-white p-4">
        <div class="font-logo text-center text-6xl text-red-500">Mahlzeit</div>
        <RoundedInput
          name="username"
          label="Nutzername"
          v-model="_username"
          rules="required"
        />
        <RoundedInput
          name="password"
          label="Passwort"
          v-model="_password"
          rules="required"
        />
        <RoundedButton
          type="primary"
          buttonType="submit"
          :class="submitButtonClasses"
          >Anmelden</RoundedButton
        >
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import RoundedInput from "./RoundedInput.vue";
import RoundedButton from "./RoundedButton.vue";
import { useForm } from "vee-validate";
import { ref } from "vue";

const _username = ref("");
const _password = ref("");

const submitButtonClasses = ref("");
const emit = defineEmits(["login"]);

const { handleSubmit } = useForm();
function onInvalidSubmit({ values, errors, results }: any) {
  console.log("Invalid form values:", errors);
  submitButtonClasses.value = "animate-shake";
  setTimeout(() => {
    submitButtonClasses.value = "";
  }, 1000);
}
const onSubmit = handleSubmit((values) => {
  emit("login");
}, onInvalidSubmit);
</script>
