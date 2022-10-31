<template>
  <div class="flex h-full flex-col gap-2 p-2 md:gap-4">
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

    <main class="flex grow justify-center" ref="mainRef">
      <ul
        class="grid h-fit grid-cols-1 items-start justify-items-center gap-2 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3"
      >
        <RecipeCard
          v-for="recipeCardData in recipeCardDataList"
          :recipeCardData="recipeCardData"
        />
        <li
          class="col-span-1 flex w-full flex-row justify-center p-2 lg:col-span-2 xl:col-span-3"
        >
          <LoadingSpinner v-if="!allRecipesLoaded"></LoadingSpinner>
        </li>
      </ul>
    </main>

    <FloatingActionButton
      class="block md:hidden"
      @click="$router.push('/recipe/new/')"
      :disabled="!isOnline"
    >
      add
    </FloatingActionButton>
    <div class="h-24 md:hidden"></div>
  </div>
</template>

<script setup lang="ts">
import RecipeCard from "./RecipeCard.vue";
import RecipeSearchAndFilterBar from "./RecipeSearchAndFilterBar.vue";
import RoundedButton from "./RoundedButton.vue";
import FloatingActionButton from "./FloatingActionButton.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import { getRecipeList, RecipeListOrdering } from "../api/recipeDbApi";
import { RecipeShort, RecipeLabel } from "../types/recipeDbTypes";
import { ref, inject, Ref, watch } from "vue";
import { useNetwork, useInfiniteScroll, useElementSize } from "@vueuse/core";
import { computed } from "@vue/reactivity";

const recipeCardDataList = ref<RecipeShort[]>([]);
const searchString = ref("");
const labelFilterList = ref<RecipeLabel[]>([]);
const appDivRef = inject<Ref<HTMLDivElement | null>>("appDiv");
const mainRef = ref<HTMLDivElement | null>();

const currentListOffset = ref(0);
const currentListCount = ref(-1);
const allRecipesLoaded = computed(
  () =>
    currentListCount.value >= 0 &&
    currentListOffset.value >= currentListCount.value
);
const { width: mainWidth, height: mainHeight } = useElementSize(mainRef);
const initialChunkLength = computed(
  () => Math.ceil((mainWidth.value / 400) * (mainHeight.value / 200)) + 3
);
const additionalChunkLength = 6;
let initialChunkLoaded = false;

async function loadRecipeList(initialLoad: boolean) {
  let chunkLength = additionalChunkLength;
  if (initialLoad) {
    currentListOffset.value = 0;
    chunkLength = initialChunkLength.value;
  }
  const recipeListChunk = await getRecipeList(
    RecipeListOrdering.updatedAtDescending,
    searchString.value,
    labelFilterList.value,
    chunkLength,
    currentListOffset.value
  );
  if (initialLoad) {
    recipeCardDataList.value = recipeListChunk.results;
  } else {
    recipeCardDataList.value.push(...recipeListChunk.results);
  }
  currentListOffset.value += chunkLength;
  currentListCount.value = recipeListChunk.count;
}
watch(mainHeight, () => {
  if (mainHeight.value > 0 && !initialChunkLoaded) {
    loadRecipeList(true);
    initialChunkLoaded = true;
  }
});
watch([searchString, labelFilterList], () => loadRecipeList(true));

useInfiniteScroll(
  appDivRef,
  async () => {
    console.log("onLoadMoreData");
    if (!allRecipesLoaded.value) {
      loadRecipeList(false);
    }
  },
  { distance: 100 }
);

const { isOnline } = useNetwork();
</script>
