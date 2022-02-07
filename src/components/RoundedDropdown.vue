<template>
  <div
    tabindex="0"
    class="bg-stone-200 focus-within:ring-2 ring-red-500 px-0 relative"
    :class="dynamicDropdownContainerClasses"
    ref="dropdownContainer"
    @focusout="handleFocusOutEvent"
  >
    <slot name="input"></slot>

    <ul
      v-show="showDropdownInternal"
      class="w-full bg-stone-200  ring-2 ring-red-500 p-2 absolute z-10"
      :class="openListUpwards ? 'bottom-full rounded-t-xl' : 'rounded-b-xl'"
    >
      <slot name="dropdown"></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";

const props = defineProps({
  showDropdown: {
    type: Boolean,
    required: true
  }
});
const emit = defineEmits(["update:showDropdown"]);

const showDropdownInternal = ref(props.showDropdown);
const openListUpwards = ref(false);
const dropdownContainer = ref<HTMLDivElement>();

const dynamicDropdownContainerClasses = computed(() => {
  if (showDropdownInternal.value) {
    if (openListUpwards.value) {
      return "rounded-b-xl";
    } else {
      return "rounded-t-xl";
    }
  } else {
    return "rounded-xl";
  }
});

watchEffect(() => {
  showDropdownInternal.value = props.showDropdown;
});
watchEffect(() => {
  if (showDropdownInternal.value && dropdownContainer.value !== undefined) {
    const topOffset = dropdownContainer.value.offsetTop - window.scrollY;
    openListUpwards.value = topOffset > window.screen.height / 2;
  }
});

function handleFocusOutEvent(event: FocusEvent){
  if(!(event.relatedTarget instanceof Node) || !(dropdownContainer.value?.contains(event.relatedTarget))) {
    showDropdownInternal.value = false;
    emit("update:showDropdown", showDropdownInternal.value);
  }
};
</script>