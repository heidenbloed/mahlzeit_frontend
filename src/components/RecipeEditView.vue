<template>
  <RecipeEdit
    v-if="recipeData && unitList && ingredientCategoryList && allLabels"
    v-model:recipeData="recipeData"
    :unitList="unitList"
    :ingredientCategoryList="ingredientCategoryList"
    :allLabels="allLabels"
    @editFinished="onEditFinished"
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
  updateRecipe,
  createIngredient,
  updateIngredient,
  createRecipeImage,
  updateRecipeImage,
  deleteRecipeImage,
} from "../api/recipeDbApi";
import {
  RecipeData,
  RecipeEditData,
  Unit,
  IngredientCategory,
  RecipeLabel,
  IngredientEdit,
  QuantifiedIngredientEdit,
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
  debugger;
  recipeData.value = {
    quantified_ingredients: quantifiedIngredientsEditData,
    ...otherRecipeData,
  };
  unitList.value = await getUnitList();
  ingredientCategoryList.value = await getIngredientCategoryList();
  allLabels.value = await getRecipeLabelList();
});

async function onEditFinished(saveChanges: boolean) {
  if (saveChanges) {
    if (recipeData.value?.id) {
      debugger;
      const quantifiedIngredientList: Array<QuantifiedIngredientEdit> = [];
      for (const quantIngr of recipeData.value.quantified_ingredients) {
        if (quantIngr.ingredientId === null) {
          const newIngredient = await createIngredient({
            name: quantIngr.ingredientName,
            default_unit: quantIngr.unit.id,
            category: quantIngr.ingredientCategory.id,
            unit_conversions: [],
          });
          quantifiedIngredientList.push({
            ingredient: newIngredient.id,
            quantity: quantIngr.quantity,
            unit: quantIngr.unit.id,
          });
        } else {
          const ingredientUpdateData: Partial<IngredientEdit> = {
            category: quantIngr.ingredientCategory.id,
          };
          if (quantIngr.setAsDefaultUnit) {
            ingredientUpdateData["default_unit"] = quantIngr.unit.id;
          }
          if (quantIngr.defaultUnit !== quantIngr.unit) {
            ingredientUpdateData["unit_conversions"] = [
              {
                alternative_unit: quantIngr.unit.id,
                alternative_conversion_factor:
                  quantIngr.currentConversionFactor,
                default_conversion_factor: quantIngr.defaultConversionFactor,
              },
            ];
          }
          await updateIngredient(quantIngr.ingredientId, ingredientUpdateData);
          quantifiedIngredientList.push({
            ingredient: quantIngr.ingredientId,
            quantity: quantIngr.quantity,
            unit: quantIngr.unit.id,
          });
        }
      }

      await updateRecipe(recipeData.value.id, {
        name: recipeData.value.name,
        preparation_time: recipeData.value.preparation_time,
        source: recipeData.value.source,
        num_servings: recipeData.value.num_servings,
        labels: recipeData.value.labels.map((label) => label.id),
        quantified_ingredients: quantifiedIngredientList,
      });

      for (const recipeImage of recipeData.value.recipe_images) {
        if (recipeImage.id !== undefined) {
          await updateRecipeImage(recipeImage.id, { order: recipeImage.order });
        } else if (recipeImage.data !== undefined) {
          await createRecipeImage({
            recipe: recipeData.value.id,
            image: recipeImage.data,
            order: recipeImage.order,
          });
        }
      }
      const newImageIds = recipeData.value.recipe_images.map(
        (recipeImage) => recipeImage.id
      );
      for (const oldRecipeImage of props.initRecipeData.recipe_images) {
        if (newImageIds.indexOf(oldRecipeImage.id) < 0) {
          await deleteRecipeImage(oldRecipeImage.id);
        }
      }
    }
  }
  emit("editFinished", saveChanges);
}
</script>
