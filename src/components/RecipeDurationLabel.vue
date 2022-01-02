<template>
  <span>
    <span v-show="prepTimeFullHours > 0">
      {{prepTimeFullHours}}h
    </span>
    <span v-show="prepTimeRemaindingMinutes > 0">
      {{prepTimeRemaindingMinutes}}min
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  prepTime: number
}>();

const prepTimeFullHours = computed(() => Math.floor(props.prepTime / 60));
const prepTimeRemaindingMinutes = computed(() => props.prepTime % 60);
</script>