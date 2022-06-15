<template>
  <div
    tabindex="0"
    class="relative h-fit bg-stone-200 px-0 ring-red-500 focus-within:ring-2"
    :class="dynamicDropdownContainerClasses"
    ref="dropdownContainer"
    @focusin="focusInside = true"
    @focusout="handleFocusOutEvent"
  >
    <slot name="input"></slot>

    <ul
      v-show="_showDropdown"
      class="absolute z-10 w-full bg-stone-200 p-2 ring-2 ring-red-500"
      :class="openListUpwards ? 'bottom-full rounded-t-xl' : 'rounded-b-xl'"
    >
      <slot name="dropdown"></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps({
  showDropdown: {
    type: Boolean,
    required: true,
  },
});

const focusInside = ref(false);
const openListUpwards = ref(false);
const dropdownContainer = ref<HTMLDivElement>();

const _showDropdown = computed(() => props.showDropdown && focusInside.value);

const dynamicDropdownContainerClasses = computed(() => {
  if (_showDropdown.value) {
    if (openListUpwards.value) {
      return "rounded-b-xl";
    } else {
      return "rounded-t-xl";
    }
  } else {
    return "rounded-xl";
  }
});

watch(_showDropdown, (showDropdownValue) => {
  if (showDropdownValue && dropdownContainer.value !== undefined) {
    const topOffset = dropdownContainer.value.offsetTop - window.scrollY;
    openListUpwards.value = topOffset > window.screen.height / 2;
  }
});

function handleFocusOutEvent(event: FocusEvent) {
  if (
    !(event.relatedTarget instanceof Node) ||
    !dropdownContainer.value?.contains(event.relatedTarget)
  ) {
    focusInside.value = false;
  }
}
</script>
