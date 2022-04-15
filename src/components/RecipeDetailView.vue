<template>
  <RecipeDetail
    v-if="recipeData && !editMode"
    :recipeData="recipeData"
    @edit="toggleEditMode(false)"
  />
  <RecipeEditView
    v-if="recipeData && editMode"
    :initRecipeData="recipeData"
    @editFinished="toggleEditMode"
  />
  <LoadingSkeleton v-if="!recipeData" />
</template>

<script setup lang="ts">
import RecipeDetail from "@/components/RecipeDetail.vue";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import RecipeEditView from "@/components/RecipeEditView.vue";
import { getRecipeDetail } from "../api/recipeDbApi";
import { RecipeData } from "../types/recipeDbTypes";
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

const recipeData = ref<RecipeData | null>(null);
onMounted(async () => {
  recipeData.value = await getRecipeDetail(recipeId.value);
});

const editMode = ref(false);
async function toggleEditMode(reloadRecipeData: boolean) {
  if(reloadRecipeData){
    recipeData.value = null;
  }
  window.scrollTo(0, 0);
  editMode.value = !editMode.value;
  if(reloadRecipeData){
    recipeData.value = await getRecipeDetail(recipeId.value);
  }
}
</script>
