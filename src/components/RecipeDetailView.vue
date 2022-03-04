<template>
  <RecipeDetail v-if="recipeData" :recipeData="recipeData" />
  <LoadingSkeleton v-else />
</template>

<script setup lang="ts">
import RecipeDetail from "@/components/RecipeDetail.vue";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import { getRecipeDetail, Recipe } from "../api/recipeDbApi";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const recipeId = computed(() => {
  const id = Number.parseInt(route.params.id as string);
  if (!Number.isNaN(id)) {
    return id;
  }
  return -1;
});

const recipeData = ref<Recipe | null>(null);
onMounted(async () => {
  recipeData.value = await getRecipeDetail(recipeId.value);
});
</script>
