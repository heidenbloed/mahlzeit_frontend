import { defineStore, storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { ImageInfo } from "../types/recipeDbTypes";

export interface PlannedRecipe {
  id: number;
  name: string;
  numServings: number;
  image: ImageInfo;
}

export const usePlannedRecipesStore = defineStore("plannedRecipes", () => {
  const list = useLocalStorage<PlannedRecipe[]>("plannedRecipes", []);

  function clearList() {
    list.value.splice(0, list.value.length);
  }
  function updateAllNumServings(newNumServings: number) {
    for (const plannedRecipe of list.value) {
      plannedRecipe.numServings = newNumServings;
    }
  }

  return {
    list,
    clearList,
    updateAllNumServings,
  };
});

export function usePlannedRecipesStoreForRecipe(recipeId: number) {
  const plannedRecipes = usePlannedRecipesStore();

  const plannedIndex = computed(() => {
    return plannedRecipes.list.findIndex(
      (plannedRecipe) => plannedRecipe.id === recipeId
    );
  });
  const isPlanned = computed(() => {
    return plannedIndex.value >= 0;
  });
  const planningButtonIcon = computed(() => {
    if (isPlanned.value) {
      return "remove_shopping_cart";
    } else {
      return "shopping_cart";
    }
  });
  const planningButtonText = computed(() => {
    if (isPlanned.value) {
      return "Nicht mehr einkaufen";
    } else {
      return "Einkaufen";
    }
  });
  function addToPlannedRecipes(plannedRecipe: PlannedRecipe) {
    if (!isPlanned.value) {
      plannedRecipes.list.push(plannedRecipe);
    }
  }
  function removeFromPlannedRecipes() {
    if (isPlanned.value) {
      plannedRecipes.list.splice(plannedIndex.value, 1);
    }
  }
  function toggleRecipePlanning(plannedRecipe: PlannedRecipe) {
    if (isPlanned.value) {
      removeFromPlannedRecipes();
    } else {
      addToPlannedRecipes(plannedRecipe);
    }
  }

  let initNumServings = 0;
  if (isPlanned.value) {
    initNumServings = plannedRecipes.list[plannedIndex.value].numServings;
  }
  const numServings = ref(initNumServings);
  function numServingsGetter() {
    if (isPlanned.value) {
      return plannedRecipes.list[plannedIndex.value].numServings;
    } else {
      return undefined;
    }
  }
  watch([plannedIndex, numServingsGetter], () => {
    if (isPlanned.value) {
      numServings.value = plannedRecipes.list[plannedIndex.value].numServings;
    }
  });
  watch(numServings, (newVal) => {
    if (isPlanned.value) {
      plannedRecipes.list[plannedIndex.value].numServings = newVal;
    }
  });

  return {
    ...storeToRefs(plannedRecipes),
    isPlanned,
    planningButtonIcon,
    planningButtonText,
    addToPlannedRecipes,
    removeFromPlannedRecipes,
    toggleRecipePlanning,
    numServings,
  };
}
