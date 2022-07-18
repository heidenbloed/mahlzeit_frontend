<template>
  <form @submit="onSubmit">
    <slot></slot>

    <div class="flex flex-wrap justify-center gap-2">
      <RoundedButton
        type="flat"
        buttonType="submit"
        :class="submitButtonClasses"
      >
        <template v-slot:icon>save</template>
        <template v-slot:default>Speichern</template>
      </RoundedButton>
      <RoundedButton type="flat" @click="emit('cancel')">
        <template v-slot:icon>cancel</template>
        <template v-slot:default>Abbrechen</template>
      </RoundedButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import RoundedButton from "./RoundedButton.vue";
import { useForm } from "vee-validate";
import { ref } from "vue";

const submitButtonClasses = ref("");
const emit = defineEmits(["save", "cancel"]);

const { handleSubmit, isSubmitting } = useForm();
function onInvalidSubmit({ values, errors, results }: any) {
  console.log("Invalid form values:", errors);
  submitButtonClasses.value = "animate-shake";
  setTimeout(() => {
    submitButtonClasses.value = "";
  }, 1000);
}
const onSubmit = handleSubmit((values) => {
  emit("save");
}, onInvalidSubmit);
</script>
