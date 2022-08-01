<template>
  <RoundedDialog :open="open" :title="title">
    <template #message>
      <slot></slot>
    </template>
    <template #buttons>
      <RoundedButton type="flat" @click="emit('cancelled')">
        Abbrechen
      </RoundedButton>
      <RoundedButton type="flat" @click="emit('confirmed')"> Ok </RoundedButton>
    </template>
  </RoundedDialog>
</template>

<script setup lang="ts">
import RoundedDialog from "./RoundedDialog.vue";
import RoundedButton from "./RoundedButton.vue";

const props = defineProps<{
  open?: boolean;
  title?: string;
}>();
const emit = defineEmits(["confirmed", "cancelled"]);
</script>
