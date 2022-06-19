<template>
  <span class="flex flex-row gap-2">
    <span class="icon-md">menu_book</span>
    <span v-if="!sourceIsUrl">
      {{ source }}
    </span>
    <button
      v-else
      type="button"
      class="truncate text-red-500"
      @click="openSourceInNewTab"
    >
      {{ simpleSourceUrl }}
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import normalizeUrl from "normalize-url";

const props = defineProps<{
  source: string;
}>();

const sourceIsUrl = computed(() => {
  try {
    const url = new URL(props.source);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
});
const simpleSourceUrl = computed(() =>
  normalizeUrl(props.source, {
    stripAuthentication: true,
    stripHash: true,
    stripProtocol: true,
    stripTextFragment: true,
    stripWWW: true,
    removeQueryParameters: true,
    removeTrailingSlash: true,
    removeDirectoryIndex: true,
  })
);

function openSourceInNewTab() {
  window.open(props.source, "_blank")?.focus();
}
</script>
