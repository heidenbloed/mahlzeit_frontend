<template>
  <RoundedCard class="flex h-32 flex-row md:h-40">
    <button
      @click="$router.push(detailUrl)"
      class="w-1/4 overflow-hidden rounded-l-xl md:w-1/3"
      type="button"
    >
      <img
        :src="image.url"
        :width="image.width"
        :height="image.height"
        alt="recipe image"
        class="h-full w-full object-cover object-center"
      />
    </button>
    <div class="inline-block w-3/4 overflow-hidden p-2 md:w-2/3 md:p-4">
      <h1 class="truncate text-xl font-semibold text-gray-700 md:text-2xl">
        {{ recipeName }}
      </h1>
      <ServingsSlider v-model="_numServings" />
      <div class="flex justify-end">
        <RoundedButton type="flat" @click="removeFromPlannedRecipes">
          <template v-slot:icon>{{ planningButtonIcon }}</template>
          <template v-slot:default>{{ planningButtonText }}</template>
        </RoundedButton>
      </div>
    </div>
  </RoundedCard>
</template>

<script setup lang="ts">
import RoundedCard from "./RoundedCard.vue";
import ServingsSlider from "./ServingsSlider.vue";
import RoundedButton from "./RoundedButton.vue";
import { usePlannedRecipesStoreForRecipe } from "../stores/plannedRecipes";
import { ImageInfo } from "../types/recipeDbTypes";
import { computed } from "vue";

const props = defineProps<{
  recipeId: number;
  recipeName: string;
  image: ImageInfo;
  numServings: number;
}>();

const {
  removeFromPlannedRecipes,
  planningButtonIcon,
  planningButtonText,
  numServings: _numServings,
} = usePlannedRecipesStoreForRecipe(props.recipeId);

const detailUrl = computed(() => `/recipe/${props.recipeId}/`);
</script>
