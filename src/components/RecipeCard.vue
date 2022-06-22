<template>
  <RoundedCard class="flex flex-col">
    <button
      @click="$router.push(detailUrl)"
      class="relative overflow-hidden rounded-t-xl"
    >
      <img
        :src="firstImageUrl"
        alt="recipe image"
        class="aspect-[2/1] object-cover object-center"
      />
      <div
        class="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent to-black/50"
      ></div>
      <div class="absolute bottom-2 left-3 tracking-tight text-white">
        <div class="text-2xl font-semibold">
          {{ recipeCardData.name }}
        </div>
        <RecipeDurationLabel :prepTime="recipeCardData.preparation_time" />
      </div>
    </button>
    <div class="flex justify-end p-2">
      <RoundedButton type="flat" @click="toggleRecipePlanning">
        <template v-slot:icon>{{ planningButtonIcon }}</template>
        <template v-slot:default>{{ planningButtonText }}</template>
      </RoundedButton>
    </div>
  </RoundedCard>
</template>

<script setup lang="ts">
import RoundedCard from "@/components/RoundedCard.vue";
import RoundedButton from "@/components/RoundedButton.vue";
import RecipeDurationLabel from "@/components/RecipeDurationLabel.vue";
import { RecipeShort } from "../types/recipeDbTypes";
import { computed } from "vue";
import { usePlannedRecipesStoreForRecipe } from "../stores/plannedRecipes";
import placeholderImageUrl from "@/assets/placeholder_image.png";

const props = defineProps<{
  recipeCardData: RecipeShort;
}>();

const firstImageUrl = computed(() =>
  props.recipeCardData.first_image
    ? props.recipeCardData.first_image.image
    : placeholderImageUrl
);
const detailUrl = computed(() => `/recipe/${props.recipeCardData.id}/`);

const {
  toggleRecipePlanning: _toggleRecipePlanning,
  planningButtonIcon,
  planningButtonText,
} = usePlannedRecipesStoreForRecipe(props.recipeCardData.id);
function toggleRecipePlanning() {
  _toggleRecipePlanning({
    id: props.recipeCardData.id,
    name: props.recipeCardData.name,
    numServings: 4,
    image: firstImageUrl.value,
  });
}
</script>
