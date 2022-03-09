<template>
  <div class="mb-2 flex flex-row flex-wrap gap-2">
    <RecipeLabelTag
      v-for="(label, idx) in _modelValue"
      :name="label.name"
      :category="label.category"
      @click="_modelValue.splice(idx, 1)"
      closeable
    />
  </div>
  <AutoCompleteInput
    v-model="newLabelInput"
    :autoCompleteList="autoCompleteList"
    @on-auto-complete-option-selected="addNewLabel"
    clearable
  >
    <template #beforeInput>
      <span class="icon-md">add_circle_outline</span>
    </template>
    <template #autoCompleteOption="labelOption">
      <div class="flex items-center gap-2">
        <span class="icon-md">label</span>
        <RecipeLabelTag
          :name="labelOption.option.name"
          :category="labelOption.option.category"
        />
      </div>
    </template>
  </AutoCompleteInput>
</template>

<script setup lang="ts">
import RecipeLabelTag from "@/components/RecipeLabelTag.vue";
import AutoCompleteInput from "@/components/AutoCompleteInput.vue";
import { ref, watchEffect, computed } from "vue";

interface RecipeLabel {
  name: string;
  category: string;
}

const props = defineProps<{
  modelValue: RecipeLabel[];
}>();
const emit = defineEmits(["update:modelValue"]);

const _modelValue = ref(props.modelValue);
const newLabelInput = ref("");

watchEffect(() => {
  _modelValue.value = props.modelValue;
});
watchEffect(() => {
  emit("update:modelValue", _modelValue.value);
});

const autoCompleteList = computed(() => [
  {
    name: newLabelInput.value,
    category: "diet",
  },
  {
    name: newLabelInput.value,
    category: "complexity",
  },
  {
    name: newLabelInput.value,
    category: "misc",
  },
]);

function addNewLabel(newLabel: RecipeLabel) {
  _modelValue.value.push(newLabel);
  newLabelInput.value = "";
}
</script>
