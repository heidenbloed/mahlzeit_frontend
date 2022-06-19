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
        <RoundedButton type="flat" @click="emit('delete')">
          <template v-slot:icon>delete</template>
          <template v-slot:default>Löschen</template>
        </RoundedButton>
        <RoundedButton type="flat" @click="emit('edit')">
          <template v-slot:icon>edit</template>
          <template v-slot:default>Bearbeiten</template>
        </RoundedButton>
        <RoundedButton type="flat">
          <template v-slot:icon>share</template>
          <template v-slot:default>Teilen</template>
        </RoundedButton>
        <RoundedButton type="flat">
          <template v-slot:icon>shopping_cart</template>
          <template v-slot:default>Einkaufen</template>
        </RoundedButton>
      </section>
    </article>
  </main>
</template>

<script setup lang="ts">
import RecipeImageSlides from "@/components/RecipeImageSlides.vue";
import ServingsSlider from "@/components/ServingsSlider.vue";
import RecipeLabelTag from "@/components/RecipeLabelTag.vue";
import RecipeDurationLabel from "@/components/RecipeDurationLabel.vue";
import RecipeSourceLabel from "@/components/RecipeSourceLabel.vue";
import RoundedButton from "@/components/RoundedButton.vue";
import SubSection from "@/components/SubSection.vue";
import { RecipeData } from "../types/recipeDbTypes";
import { ref, watchEffect } from "vue";

const props = defineProps<{
  recipeData: RecipeData;
}>();
const emit = defineEmits(["edit", "delete"]);

const numServings = ref(0);
watchEffect(() => {
  numServings.value = props.recipeData.num_servings;
});
function getScaledQuantity(quantity: number) {
  const scaledQuantity =
    (numServings.value * quantity) / props.recipeData.num_servings;
  return Math.round(scaledQuantity * 10) / 10;
}
</script>
