<template>
  <CardGrid>
    <RecipeSearchAndFilterBar />
    <RecipeCard
      v-for="recipeCardData in recipeCardDataList"
      :recipeCardData="recipeCardData"
    />
  </CardGrid>
</template>

<script setup lang="ts">
import RecipeCard from "@/components/RecipeCard.vue";
import CardGrid from "@/components/CardGrid.vue";
import RecipeSearchAndFilterBar from "@/components/RecipeSearchAndFilterBar.vue";
import { getRecipeList, RecipeShort } from "../api/recipeDbApi";
import { ref, onMounted } from "vue";

const recipeCardDataList = ref<RecipeShort[]>([]);
onMounted(async () => {
  recipeCardDataList.value = await getRecipeList();
});
</script>
