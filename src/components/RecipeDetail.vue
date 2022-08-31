<template>
  <main class="mx-auto max-w-4xl rounded-b-xl bg-white md:rounded-t-xl">
    <div class="mx-auto max-w-4xl">
      <RecipeImageSlides :recipeImages="recipeData.recipe_images" />
    </div>

    <article
      class="flex flex-col gap-4 p-4 font-sans tracking-tight text-gray-700"
    >
      <section>
        <h1 class="mb-1 text-2xl font-semibold">
          {{ recipeData.name }}
        </h1>
        <p>
          <RecipeDurationLabel
            :prepTime="recipeData.preparation_time"
            withIcon
          />
        </p>
        <p v-if="recipeData.source.length > 0">
          <RecipeSourceLabel :source="recipeData.source" />
        </p>
      </section>

      <SubSection title="Zutaten">
        <ServingsSlider v-model="numServings" />
        <ul>
          <li v-for="quant_ingr in recipeData.quantified_ingredients">
            {{ getScaledQuantity(quant_ingr.quantity) }}
            {{ quant_ingr.unit.short_form }}
            {{ quant_ingr.ingredient.name }}
          </li>
        </ul>
      </SubSection>

      <SubSection title="Zubereitung" v-if="prepTextParagraphs.length > 0">
        <p
          v-for="{ text, doubleLineBreak } in prepTextParagraphs"
          :class="doubleLineBreak ? 'mb-4' : ''"
          class="text-start"
        >
          {{ text }}
        </p>
      </SubSection>

      <SubSection title="Schlagwörter" v-if="recipeData.labels.length > 0">
        <div class="mt-2 flex flex-wrap gap-x-2 gap-y-1">
          <RecipeLabelTag
            v-for="label in recipeData.labels"
            :name="label.name"
            :category="label.category"
          />
        </div>
      </SubSection>

      <section class="flex flex-wrap justify-center gap-2">
        <RoundedButton
          type="flat"
          @click="deleteDialogOpen = true"
          :disabled="!isOnline"
        >
          <template v-slot:icon>delete</template>
          <template v-slot:default>Löschen</template>
        </RoundedButton>
        <RoundedButton type="flat" @click="emit('edit')" :disabled="!isOnline">
          <template v-slot:icon>edit</template>
          <template v-slot:default>Bearbeiten</template>
        </RoundedButton>
        <RoundedButton
          v-if="shareIsSupported"
          type="flat"
          @click="shareRecipe()"
          :disabled="!isOnline"
        >
          <template v-slot:icon>share</template>
          <template v-slot:default>Teilen</template>
        </RoundedButton>
        <RoundedButton type="flat" @click="toggleRecipePlanning">
          <template v-slot:icon>{{ planningButtonIcon }}</template>
          <template v-slot:default>{{ planningButtonText }}</template>
        </RoundedButton>
      </section>
    </article>
    <ConfirmDialog
      :title="recipeData.name"
      :open="deleteDialogOpen"
      @confirmed="deleteRecipe"
      @cancelled="deleteDialogOpen = false"
    >
      Soll dieses Rezept gelöscht werden?
    </ConfirmDialog>
  </main>
</template>

<script setup lang="ts">
import RecipeImageSlides from "./RecipeImageSlides.vue";
import ServingsSlider from "./ServingsSlider.vue";
import RecipeLabelTag from "./RecipeLabelTag.vue";
import RecipeDurationLabel from "./RecipeDurationLabel.vue";
import RecipeSourceLabel from "./RecipeSourceLabel.vue";
import RoundedButton from "./RoundedButton.vue";
import SubSection from "./SubSection.vue";
import ConfirmDialog from "./ConfirmDialog.vue";
import { RecipeData, ImageInfo } from "../types/recipeDbTypes";
import { usePlannedRecipesStoreForRecipe } from "../stores/plannedRecipes";
import { ref, watchEffect, computed } from "vue";
import { useNetwork, useShare, useTitle } from "@vueuse/core";
import placeholderImageUrl from "../assets/placeholder_image.png";

const props = defineProps<{
  recipeData: RecipeData;
}>();
const emit = defineEmits(["edit", "delete"]);

const pageTitle = computed(() => `${props.recipeData.name} - Mahlzeit`);
useTitle(pageTitle);

const { isOnline } = useNetwork();
const { share, isSupported: shareIsSupported } = useShare();

const numServings = ref(0);
watchEffect(() => {
  numServings.value = props.recipeData.num_servings;
});
function getScaledQuantity(quantity: number) {
  const scaledQuantity =
    (numServings.value * quantity) / props.recipeData.num_servings;
  return Math.round(scaledQuantity * 10) / 10;
}

interface PrepTextParagraph {
  text: string;
  doubleLineBreak: boolean;
}
const prepTextParagraphs = computed(() => {
  return props.recipeData.preparation_text
    .split("\n")
    .reduce<PrepTextParagraph[]>((paragraphList, paragraph) => {
      const trimmedParagraph = paragraph.trim();
      if (trimmedParagraph.length > 0) {
        paragraphList.push({
          text: trimmedParagraph,
          doubleLineBreak: false,
        });
      } else if (paragraphList.length > 0) {
        paragraphList[paragraphList.length - 1].doubleLineBreak = true;
      }
      return paragraphList;
    }, []);
});

const firstImageThumbnailPlanInfo = computed<ImageInfo>(() => {
  if (props.recipeData.recipe_images.length > 0) {
    const firstImage = props.recipeData.recipe_images.reduce(
      (prev, current) => {
        if (prev.order < current.order) {
          return prev;
        } else {
          return current;
        }
      }
    );
    if (
      firstImage.thumbnail_plan &&
      firstImage.thumbnail_plan_width &&
      firstImage.thumbnail_plan_height
    ) {
      return {
        url: firstImage.thumbnail_plan,
        width: firstImage.thumbnail_plan_width,
        height: firstImage.thumbnail_plan_height,
      };
    } else {
      return {
        url: firstImage.image,
        width: firstImage.image_width,
        height: firstImage.image_width,
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

const {
  toggleRecipePlanning: _toggleRecipePlanning,
  removeFromPlannedRecipes,
  planningButtonIcon,
  planningButtonText,
} = usePlannedRecipesStoreForRecipe(props.recipeData.id);
function toggleRecipePlanning() {
  _toggleRecipePlanning({
    id: props.recipeData.id,
    name: props.recipeData.name,
    numServings: numServings.value,
    image: firstImageThumbnailPlanInfo.value,
  });
}

const deleteDialogOpen = ref(false);
function deleteRecipe() {
  removeFromPlannedRecipes();
  emit("delete");
}

function shareRecipe() {
  share({
    title: props.recipeData.name,
    text: `🥘 Schau dir mal ${props.recipeData.name} bei Mahlzeit an 🥘`,
    url: location.href,
  });
}
</script>
