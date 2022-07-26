<template>
  <RecipeDetail
    v-if="recipeData && !editMode"
    :recipeData="recipeData"
    @edit="toggleEditMode(false)"
    @delete="removeRecipe"
  />
  <RecipeEditView
    v-if="(recipeData || isNewRecipe) && editMode"
    :initRecipeData="recipeData"
    @editFinished="toggleEditMode"
  />
  <LoadingSkeleton mockup="RecipeDetail" v-if="!recipeData && !isNewRecipe" />
</template>

<script setup lang="ts">
import RecipeDetail from "./RecipeDetail.vue";
import LoadingSkeleton from "./LoadingSkeleton.vue";
import RecipeEditView from "./RecipeEditView.vue";
import { getRecipeDetail, deleteRecipe } from "../api/recipeDbApi";
import { RecipeData } from "../types/recipeDbTypes";
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const isNewRecipe = computed(() => route.params.id === "new");
const recipeId = computed(() => {
  const id = parseInt(route.params.id as string);
  if (!isNaN(id)) {
    return id;
  }
  return -1;
});

const recipeData = ref<RecipeData | null>(null);
async function reloadRecipeData() {
  if (recipeId.value >= 0) {
    recipeData.value = await getRecipeDetail(recipeId.value);
  }
}
onMounted(reloadRecipeData);
watch(() => route.params.id, reloadRecipeData);

const editMode = ref(isNewRecipe.value);
async function toggleEditMode(reload: boolean) {
  if (reload) {
    recipeData.value = null;
  }
  window.scrollTo(0, 0);
  editMode.value = !editMode.value;
  if (reload) {
    reloadRecipeData();
  }
}

async function removeRecipe() {
  if (recipeId.value >= 0) {
    await deleteRecipe(recipeId.value);
    router.push("/recipes/");
  }
}
</script>
