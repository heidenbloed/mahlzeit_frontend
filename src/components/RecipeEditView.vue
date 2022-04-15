<template>
  <RecipeEdit
    v-if="recipeData && unitList && ingredientCategoryList && allLabels"
    :recipeData="recipeData"
    :unitList="unitList"
    :ingredientCategoryList="ingredientCategoryList"
    :allLabels="allLabels"
    @editFinished="emit('editFinished')"
  />
  <LoadingSkeleton v-else />
</template>

<script setup lang="ts">
import RecipeEdit from "@/components/RecipeEdit.vue";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import {
  getIngredientDetail,
  getUnitList,
  getIngredientCategoryList,
  getRecipeLabelList,
} from "../api/recipeDbApi";
import {
  RecipeData,
  RecipeEditData,
  Unit,
  IngredientCategory,
  RecipeLabel,
} from "../types/recipeDbTypes";
import { onMounted, ref } from "vue";

const props = defineProps<{
  initRecipeData: RecipeData;
}>();
const emit = defineEmits(["editFinished"]);

const recipeData = ref<RecipeEditData | null>(null);
const unitList = ref<Unit[] | null>(null);
const ingredientCategoryList = ref<IngredientCategory[] | null>(null);
const allLabels = ref<RecipeLabel[] | null>(null);

onMounted(async () => {
  const { quantified_ingredients, ...otherRecipeData } = props.initRecipeData;
  const quantifiedIngredientsEditData = await Promise.all(
    quantified_ingredients.map(async (quantified_ingredient) => {
      const { ingredient, unit, ...otherQuantifiedIngredientData } =
        quantified_ingredient;
      const ingredientDetail = await getIngredientDetail(ingredient.id);
      const unit_conversion = ingredientDetail.unit_conversions.find(
        (unitConversion) => unitConversion.alternative_unit.id === unit.id
      );
      let currentConversionFactor = 1.0;
      let defaultConversionFactor = 1.0;
      if (unit_conversion) {
        currentConversionFactor = unit_conversion.alternative_conversion_factor;
        defaultConversionFactor = unit_conversion.default_conversion_factor;
      }
      return {
        ingredientName: ingredientDetail.name,
        ingredientId: ingredientDetail.id,
        ingredientCategory: ingredientDetail.category,
        unit: unit,
        defaultUnit: ingredientDetail.default_unit,
        setAsDefaultUnit: false,
        currentConversionFactor: currentConversionFactor,
        defaultConversionFactor: defaultConversionFactor,
        ...otherQuantifiedIngredientData,
      };
    })
  );
  recipeData.value = {
    quantified_ingredients: quantifiedIngredientsEditData,
    ...otherRecipeData,
  };
  unitList.value = await getUnitList();
  ingredientCategoryList.value = await getIngredientCategoryList();
  allLabels.value = await getRecipeLabelList();
});
</script>
