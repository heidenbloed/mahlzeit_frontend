<template>
    <div class="flex flex-row flex-wrap gap-2 mb-2">
      <RecipeLabel
        v-for="(label, idx) in currentRecipeLabels"
        :name="label.name"
        :category="label.category"
        @click="currentRecipeLabels.splice(idx, 1)"
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
        <span class="icon-md">add</span>
      </template>
      <template #autoCompleteOption="labelOption">
        <div class="flex items-center gap-2">
          <span class="icon-md">label</span>
          <RecipeLabel
            :name="labelOption.option.name"
            :category="labelOption.option.category"
          />
        </div>
      </template>
    </AutoCompleteInput>
</template>

<script setup lang="ts">
import RecipeLabel from "@/components/RecipeLabel.vue";
import AutoCompleteInput from "@/components/AutoCompleteInput.vue";
import { ref, watchEffect, computed } from "vue";

interface RecipeLabel {
  name: string;
  category: string;
}

const props = defineProps<{
  modelValue: RecipeLabel[]
}>();
const emit = defineEmits(["update:modelValue"])

const currentRecipeLabels = ref(props.modelValue);
const newLabelInput = ref("");

watchEffect(() => {
  currentRecipeLabels.value = props.modelValue;
});
watchEffect(() => {
  emit('update:modelValue', currentRecipeLabels.value);
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

function addNewLabel(newLabel: RecipeLabel){
  currentRecipeLabels.value.push(newLabel);
  newLabelInput.value = "";
}
</script>