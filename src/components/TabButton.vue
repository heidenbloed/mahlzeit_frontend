<template>
  <a :href="url" class="h-full">
    <button
      class="px-6 h-full flex flex-col md:flex-row gap-x-3 gap-y-2 justify-center place-items-center border-red-500 focus:outline-none focus:bg-white"
      :class="tabActive ? 'text-red-500 border-t-4 md:border-b-4 md:border-t-0' : 'text-neutral-600'"
    >
      <span v-if="iconName" class="icon-md">
        {{iconName}}
      </span>
      <span>
        <slot></slot>
      </span>
    </button>
  </a>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router'

const props = defineProps<{
  iconName?: string,
  url: string
}>();

const currentRoute = useRoute();
const tabActive = computed<Boolean>(() => {
  return currentRoute.path.startsWith(props.url)
});
</script>