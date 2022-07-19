<template>
  <CardGrid>
    <RecipeSearchAndFilterBar
      v-model="searchString"
      v-model:labelFilterList="labelFilterList"
      name="recipeSearchBar"
    />
    <div
      class="hidden w-full flex-row justify-center md:flex lg:col-span-2 xl:col-span-3"
    >
      <RoundedButton
        type="primary"
        @click="$router.push('/recipe/new/')"
        :disabled="!isOnline"
      >
        <template #default> Neues Rezept </template>
        <template #icon> add </template>
      </RoundedButton>
    </div>
    <RecipeCard
      v-for="recipeCardData in recipeCardDataList"
      :recipeCardData="recipeCardData"
    />
    <FloatingActionButton
      class="block md:hidden"
      @click="$router.push('/recipe/new/')"
      :disabled="!isOnline"
    >
      add
    </FloatingActionButton>
  </CardGrid>
  <div class="h-24 md:hidden"></div>
</template>

<script setup lang="ts">
import RecipeCard from "./RecipeCard.vue";
import CardGrid from "./CardGrid.vue";
import RecipeSearchAndFilterBar from "./RecipeSearchAndFilterBar.vue";
import RoundedButton from "./RoundedButton.vue";
import FloatingActionButton from "./FloatingActionButton.vue";
import { getRecipeList, RecipeListOrdering } from "../api/recipeDbApi";
import { RecipeShort, RecipeLabel } from "../types/recipeDbTypes";
import { ref, watchEffect } from "vue";
import { useNetwork } from "@vueuse/core";

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

const { isOnline } = useNetwork();
</script>
