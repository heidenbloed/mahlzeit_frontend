<template>
  <a :href="url" class="h-full">
    <button class="px-6 h-full border-red-500 focus:outline-none focus:bg-white" :class="tabActive ? 'text-red-500 border-t-4 lg:border-b-4 lg:border-t-0' : 'text-neutral-600'">
      <span class="lg:inline-flex flex-wrap gap-3 items-center">
        <div v-if="iconName" class="icon-md">
          {{iconName}}
        </div>
        <div>
          <slot></slot>
        </div>
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