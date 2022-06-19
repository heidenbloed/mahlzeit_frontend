import { defineStore, storeToRefs } from 'pinia'
import { computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';

export interface PlannedRecipe {
  id: number,
  name: string,
  numServings: number,
  image: string,
};

export const usePlannedRecipesStore = defineStore("plannedRecipes", () => {
  const list = useLocalStorage<PlannedRecipe[]>("plannedRecipes", []);

  return {
    list,
  }
});

export function usePlannedRecipesStoreForRecipe(recipeId: number){
  const plannedRecipes = usePlannedRecipesStore();

  const plannedIndex = computed(() => {
    return plannedRecipes.list.findIndex((plannedRecipe) => plannedRecipe.id === recipeId);
  });
  const isPlanned = computed(() => {
    return plannedIndex.value >= 0;
  });
  const planningButtonIcon = computed(() => {
    if (isPlanned.value){
      return "remove_shopping_cart"
    } else {
      return "shopping_cart"
    }
  });
  const planningButtonText = computed(() => {
    if (isPlanned.value){
      return "Nicht mehr einkaufen"
    } else {
      return "Einkaufen"
    }
  });

  function addToPlannedRecipes(plannedRecipe: PlannedRecipe){
    if(!isPlanned.value){
      plannedRecipes.list.push(plannedRecipe)
    }
  }
  function removeFromPlannedRecipes(){
    if(isPlanned.value){
      plannedRecipes.list.splice(plannedIndex.value, 1);
    }
  }
  function toggleRecipePlanning(plannedRecipe: PlannedRecipe){
    if(isPlanned.value){
      removeFromPlannedRecipes();
    } else {
      addToPlannedRecipes(plannedRecipe);
    }
  }

  return {
    ...storeToRefs(plannedRecipes),
    isPlanned,
    planningButtonIcon,
    planningButtonText,
    addToPlannedRecipes,
    removeFromPlannedRecipes,
    toggleRecipePlanning
  }
}