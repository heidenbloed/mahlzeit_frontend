<template>
  <ShoppingList v-if="shoppingList" :list="shoppingList" />
  <LoadingSkeleton v-else />
</template>

<script setup lang="ts">
import ShoppingList from "./ShoppingList.vue";
import LoadingSkeleton from "./LoadingSkeleton.vue";
import { getRecipeDetail, getIngredientDetail } from "../api/recipeDbApi";
import { QuantifiedIngredient } from "../types/recipeDbTypes";
import { CategorizedShoppingListItem } from "../types/shoppingListTypes";
import {
  PlannedRecipe,
  usePlannedRecipesStore,
} from "../stores/plannedRecipes";
import { onMounted, ref } from "vue";

const shoppingList = ref<CategorizedShoppingListItem[] | null>(null);
const plannedRecipes = usePlannedRecipesStore();

onMounted(async () => {
  const newShoppingList: CategorizedShoppingListItem[] = [];
  const listOfRecipeShoppingLists = await Promise.all(
    plannedRecipes.list.map(getScaledRecipeIngredients)
  );
  for (const recipeShoppingList of listOfRecipeShoppingLists) {
    for (const listItem of recipeShoppingList) {
      const ingredientIndex = newShoppingList.findIndex((shoppingListItem) => {
        return shoppingListItem.ingredientId === listItem.ingredientId;
      });
      if (ingredientIndex >= 0) {
        newShoppingList[ingredientIndex].quantity += listItem.quantity;
      } else {
        newShoppingList.push(listItem);
      }
    }
  }
  shoppingList.value = newShoppingList;
});

async function getScaledRecipeIngredients(
  plannedRecipe: PlannedRecipe
): Promise<CategorizedShoppingListItem[]> {
  const recipeData = await getRecipeDetail(plannedRecipe.id);
  const servingScale = plannedRecipe.numServings / recipeData.num_servings;
  return await Promise.all(
    recipeData.quantified_ingredients.map((quantIngr) =>
      getQuantifiedIngredientInDefaultUnit(quantIngr, servingScale)
    )
  );
}

async function getQuantifiedIngredientInDefaultUnit(
  quantIngr: QuantifiedIngredient,
  servingScale: number
): Promise<CategorizedShoppingListItem> {
  const ingredientData = await getIngredientDetail(quantIngr.ingredient.id);
  if (quantIngr.unit.id === ingredientData.default_unit.id) {
    return {
      category: ingredientData.category,
      quantity: quantIngr.quantity * servingScale,
      unitShortForm: quantIngr.unit.short_form,
      ingredientId: quantIngr.ingredient.id,
      ingredientName: quantIngr.ingredient.name,
    };
  } else {
    const unitConversion = ingredientData.unit_conversions.find((unitConv) => {
      return unitConv.alternative_unit.id === quantIngr.unit.id;
    });
    let convertedQuantity = quantIngr.quantity * servingScale;
    if (unitConversion) {
      convertedQuantity *=
        unitConversion.default_conversion_factor /
        unitConversion.alternative_conversion_factor;
    }
    return {
      category: ingredientData.category,
      quantity: convertedQuantity,
      unitShortForm: ingredientData.default_unit.short_form,
      ingredientId: quantIngr.ingredient.id,
      ingredientName: quantIngr.ingredient.name,
    };
  }
}
</script>
