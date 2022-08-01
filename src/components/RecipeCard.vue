<template>
  <RoundedCard class="flex flex-col">
    <button
      @click="$router.push(detailUrl)"
      class="relative overflow-hidden rounded-t-xl"
    >
      <img
        :src="firstImageThumbnailCardInfo.url"
        alt="recipe image"
        class="aspect-[2/1] object-cover object-center"
        :width="firstImageThumbnailCardInfo.width"
        :height="firstImageThumbnailCardInfo.height"
      />
      <div
        class="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent to-black/50"
      ></div>
      <div class="absolute bottom-2 left-3 tracking-tight text-white">
        <h2 class="text-2xl font-semibold">
          {{ recipeCardData.name }}
        </h2>
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
import RoundedCard from "./RoundedCard.vue";
import RoundedButton from "./RoundedButton.vue";
import RecipeDurationLabel from "./RecipeDurationLabel.vue";
import { RecipeShort, ImageInfo } from "../types/recipeDbTypes";
import { computed } from "vue";
import { usePlannedRecipesStoreForRecipe } from "../stores/plannedRecipes";
import placeholderImageUrl from "../assets/placeholder_image.png";

const props = defineProps<{
  recipeCardData: RecipeShort;
}>();

const firstImageThumbnailCardInfo = computed<ImageInfo>(() => {
  if (props.recipeCardData.first_image) {
    if (
      props.recipeCardData.first_image.thumbnail_card &&
      props.recipeCardData.first_image.thumbnail_card_width &&
      props.recipeCardData.first_image.thumbnail_card_height
    ) {
      return {
        url: props.recipeCardData.first_image.thumbnail_card,
        width: props.recipeCardData.first_image.thumbnail_card_width,
        height: props.recipeCardData.first_image.thumbnail_card_height,
      };
    } else {
      return {
        url: props.recipeCardData.first_image.image,
        width: props.recipeCardData.first_image.image_width,
        height: props.recipeCardData.first_image.image_width,
      };
    }
  } else {
    return {
      url: placeholderImageUrl,
      width: 800,
      height: 600,
    };
  }
});
const firstImageThumbnailPlanInfo = computed<ImageInfo>(() => {
  if (props.recipeCardData.first_image) {
    if (
      props.recipeCardData.first_image.thumbnail_plan &&
      props.recipeCardData.first_image.thumbnail_plan_width &&
      props.recipeCardData.first_image.thumbnail_plan_height
    ) {
      return {
        url: props.recipeCardData.first_image.thumbnail_plan,
        width: props.recipeCardData.first_image.thumbnail_plan_width,
        height: props.recipeCardData.first_image.thumbnail_plan_height,
      };
    } else {
      return {
        url: props.recipeCardData.first_image.image,
        width: props.recipeCardData.first_image.image_width,
        height: props.recipeCardData.first_image.image_width,
      };
    }
  } else {
    return {
      url: placeholderImageUrl,
      width: 800,
      height: 600,
    };
  }
});
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
    image: firstImageThumbnailPlanInfo.value,
  });
}
</script>
