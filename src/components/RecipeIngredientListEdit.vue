<template>
  <div class="mb-2 flex flex-col gap-2">
    <ServingsSlider v-model="_numServings" />

    <div
      v-for="(ingredient, ingredientIdx) in _modelValue"
      class="flex flex-row gap-2"
    >
      <button
        v-if="!ingredientEdit[ingredientIdx]"
        class="flex grow items-center gap-1 rounded-xl bg-stone-200 p-2 align-middle"
        @click="ingredientEdit[ingredientIdx] = true"
      >
        <span class="grow">
          {{ ingredient.quantity }} {{ ingredient.unit.short_form }}
          {{ ingredient.ingredientName }}
        </span>
        <span class="icon-md">edit</span>
      </button>

      <RecipeIngredientEdit
        v-else
        v-model="_modelValue[ingredientIdx]"
        :unitList="unitList"
        :ingredientCategoryList="ingredientCategoryList"
        class="grow"
      />

      <div class="min-h-full">
        <button
          class="flex h-full w-10 items-center justify-center rounded-xl bg-stone-200"
          @click="removeIngredient(ingredientIdx)"
        >
          <span class="icon-md">delete</span>
        </button>
      </div>
    </div>

    <button
      class="flex items-center justify-center gap-1 rounded-xl bg-stone-200 p-2 align-middle"
      @click="addNewEmptyIngredient"
    >
      <span class="icon-md">add_circle_outline</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import RecipeIngredientEdit from "@/components/RecipeIngredientEdit.vue";
import ServingsSlider from "@/components/ServingsSlider.vue";
import {
  QuantifiedIngredientEditData,
  Unit,
  IngredientCategory,
} from "../types/recipeDbTypes";
import { reactive, watchEffect, ref } from "vue";

const props = defineProps<{
  modelValue: QuantifiedIngredientEditData[];
  numServings: number;
  unitList: Unit[];
  ingredientCategoryList: IngredientCategory[];
}>();
const emit = defineEmits(["update:modelValue", "update:numServings"]);

const _modelValue = ref(props.modelValue);
const ingredientEdit = ref(new Array(props.modelValue.length).fill(false));

const _numServings = ref(props.numServings);

function removeIngredient(ingredientIdx: number) {
  _modelValue.value.splice(ingredientIdx, 1);
  ingredientEdit.value.splice(ingredientIdx, 1);
}

function addNewEmptyIngredient() {
  _modelValue.value.push({
    ingredientId: null,
    ingredientName: "",
    quantity: 1,
    unit: props.unitList[0],
    defaultUnit: props.unitList[0],
    currentConversionFactor: 1.0,
    defaultConversionFactor: 1.0,
    setAsDefaultUnit: false,
    ingredientCategory: props.ingredientCategoryList[0],
  });
  ingredientEdit.value.push(true);
}

watchEffect(() => {
  emit("update:modelValue", _modelValue.value);
});
watchEffect(() => {
  emit("update:numServings", _numServings.value);
});
</script>
