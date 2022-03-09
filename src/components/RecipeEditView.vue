<template>
  <RecipeEdit v-if="recipeData" v-model:recipeData="recipeData" />
  <LoadingSkeleton v-else />
</template>

<script setup lang="ts">
import RecipeEdit from "@/components/RecipeEdit.vue";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import { getIngredientDetail } from "../api/recipeDbApi";
import { RecipeData, RecipeEditData } from "../types/recipeDbTypes";
import { ref, onMounted } from "vue";

const props = defineProps<{
  initRecipeData: RecipeData;
}>();

const recipeData = ref<RecipeEditData | null>(null);

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
});
</script>
