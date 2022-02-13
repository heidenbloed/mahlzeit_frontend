<template>
  <a :href="url" class="h-full">
    <button
      class="flex h-full flex-col place-items-center justify-center gap-x-3 gap-y-2 border-red-500 px-6 focus:bg-white focus:outline-none md:flex-row"
      :class="
        tabActive
          ? 'border-t-4 text-red-500 md:border-b-4 md:border-t-0'
          : 'text-neutral-600'
      "
    >
      <span v-if="iconName" class="icon-md">
        {{ iconName }}
      </span>
      <span>
        <slot></slot>
      </span>
    </button>
  </a>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";

const props = defineProps<{
  iconName?: string;
  url: string;
}>();

const currentRoute = useRoute();
const tabActive = computed<Boolean>(() => {
  return currentRoute.path.startsWith(props.url);
});
</script>
