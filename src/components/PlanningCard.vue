<template>
  <RoundedCard>
    <div class="flex">
      <button
        @click="$router.push('/recipe/')"
        class="w-1/4 overflow-hidden rounded-l-xl md:w-1/3"
        type="button"
      >
        <img
          :src="imageUrl"
          alt="recipe image"
          class="h-full object-cover object-center"
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
    </div>
  </RoundedCard>
</template>

<script setup lang="ts">
import RoundedCard from "@/components/RoundedCard.vue";
import ServingsSlider from "@/components/ServingsSlider.vue";
import RoundedButton from "@/components/RoundedButton.vue";
import { usePlannedRecipesStoreForRecipe } from "../stores/plannedRecipes";

const props = defineProps<{
  recipeId: number;
  recipeName: string;
  imageUrl: string;
  numServings: number;
}>();

const {
  removeFromPlannedRecipes,
  planningButtonIcon,
  planningButtonText,
  numServings: _numServings,
} = usePlannedRecipesStoreForRecipe(props.recipeId);
</script>
