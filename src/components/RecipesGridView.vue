<template>
  <CardGrid>
    <RecipeSearchAndFilterBar
      v-model="searchString"
      v-model:labelFilterList="labelFilterList"
      name="recipeSearchBar"
    />
    <RecipeCard
      v-for="recipeCardData in recipeCardDataList"
      :recipeCardData="recipeCardData"
    />
    <FloatingActionButton @click="$router.push('/recipe/new/')">
      add
    </FloatingActionButton>
  </CardGrid>
</template>

<script setup lang="ts">
import RecipeCard from "@/components/RecipeCard.vue";
import CardGrid from "@/components/CardGrid.vue";
import RecipeSearchAndFilterBar from "@/components/RecipeSearchAndFilterBar.vue";
import FloatingActionButton from "@/components/FloatingActionButton.vue";
import { getRecipeList, RecipeListOrdering } from "../api/recipeDbApi";
import { RecipeShort, RecipeLabel } from "../types/recipeDbTypes";
import { ref, watchEffect } from "vue";

const recipeCardDataList = ref<RecipeShort[]>([]);

const searchString = ref("");
const labelFilterList = ref<RecipeLabel[]>([]);
watchEffect(async () => {
  recipeCardDataList.value = await getRecipeList(
    RecipeListOrdering.updatedAtDescending,
    searchString.value,
    labelFilterList.value
  );
});
</script>
