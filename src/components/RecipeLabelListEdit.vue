<template>
  <!-- <pre class="text-xs">{{ _modelValue }}</pre> -->
  <div class="mb-2 flex flex-row flex-wrap gap-2">
    <RecipeLabelTag
      v-for="(label, labelIndex) in props.allLabels"
      :name="label.name"
      :category="label.category"
      @click="selectionMask[labelIndex] = !selectionMask[labelIndex]"
      :closeable="selectionMask[labelIndex]"
      :addable="!selectionMask[labelIndex]"
    />
  </div>
</template>

<script setup lang="ts">
import RecipeLabelTag from "./RecipeLabelTag.vue";
import { RecipeLabel } from "../types/recipeDbTypes";
import { ref, watchEffect, computed } from "vue";

const props = defineProps<{
  modelValue: RecipeLabel[];
  allLabels: RecipeLabel[];
}>();
const emit = defineEmits(["update:modelValue"]);

const selectionMask = ref<boolean[]>(new Array(props.allLabels.length));

watchEffect(() => {
  for (const [labelIndex, label] of props.allLabels.entries()) {
    if (
      props.modelValue.find((selectedLabel) => selectedLabel.id === label.id)
    ) {
      selectionMask.value[labelIndex] = true;
    } else {
      selectionMask.value[labelIndex] = false;
    }
  }
});
watchEffect(() => {
  let newModelValue: RecipeLabel[] = [];
  for (const [labelIndex, isSelected] of selectionMask.value.entries()) {
    if (isSelected) {
      newModelValue.push(props.allLabels[labelIndex]);
    }
  }
  emit("update:modelValue", newModelValue);
});
</script>
