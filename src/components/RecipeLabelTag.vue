<template>
  <component
    :is="closeable || addable ? 'button' : 'span'"
    class="inline-flex items-center gap-1 rounded-xl px-2 py-1"
    :class="categoryClasses"
    type="button"
  >
    <span>{{ name }}</span>
    <span v-if="closeable" class="icon-sm">close</span>
    <span v-if="addable" class="icon-sm">add</span>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  name: String,
  category: String,
  closeable: {
    type: Boolean,
    default: false,
    requried: false,
  },
  addable: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const categoryClasses = computed(() => {
  let borderColor = "border-red-800";
  let backgroundColor = "bg-red-100";
  let textColor = "text-red-800";

  if (props.category === "diet") {
    borderColor = "border-lime-700";
    backgroundColor = "bg-lime-100";
    textColor = "text-lime-700";
  } else if (props.category === "complexity") {
    borderColor = "border-sky-800";
    backgroundColor = "bg-sky-100";
    textColor = "text-sky-800";
  } else if (props.category === "cuisine") {
    borderColor = "border-amber-600";
    backgroundColor = "bg-amber-100";
    textColor = "text-amber-600";
  }

  if (props.addable) {
    return `bg-stone-200 ${borderColor} ${textColor}`;
  } else {
    return `${backgroundColor} ${borderColor} ${textColor}`;
  }
});
</script>
