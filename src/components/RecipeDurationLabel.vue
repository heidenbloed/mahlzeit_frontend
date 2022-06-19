<template>
  <span class="flex flex-row gap-2">
    <span v-if="withIcon" class="icon-md">schedule</span>
    <span>
      <span v-show="prepTimeFullHours > 0"> {{ prepTimeFullHours }}h </span>
      <span v-show="prepTimeRemaindingMinutes > 0 || prepTimeFullHours === 0">
        {{ prepTimeRemaindingMinutes }}min
      </span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    prepTime: number;
    withIcon?: boolean;
  }>(),
  {
    withIcon: false,
  }
);

const prepTimeFullHours = computed(() => Math.floor(props.prepTime / 60));
const prepTimeRemaindingMinutes = computed(() => props.prepTime % 60);
</script>
