<template>
  <a :href="url" class="w-full h-full">
    <button class="w-full h-full focus:outline-none focus:bg-white" :class="tabActive ? 'text-black' : 'text-gray-500'">
      <span class="lg:inline-flex flex-wrap gap-3 items-center">
        <div v-if="iconName" class="text-3xl material-icons-outlined">
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