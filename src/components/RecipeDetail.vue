<template>
  <main class="max-w-4xl mx-auto bg-white rounded-xl">
    <div class="max-w-4xl mx-auto">
      <RecipeImageSlides :imageUrls="recipeData.imageUrls"/>
    </div>
    

    <article class="p-4 font-sans tracking-tight text-gray-700 flex flex-col gap-4">
      <section>
        <h1 class="font-semibold text-2xl mb-1">
          {{recipeData.name}}
        </h1>
        <p>
          <RecipeDurationLabel :prepTime="recipeData.prepTime"/>
        </p>
        <p>
          {{recipeData.source}}
        </p>
      </section>

      <SubSection title="Zutaten">
        <ServingsSlider
          :defaultNumServings="recipeData.numServings"
          v-model="numServings"
        />
        <ul>
          <li v-for="ingredient in recipeData.ingredients">
            {{scaleServings(ingredient.quantity)}} {{ingredient.unit}} {{ingredient.name}}
          </li>
        </ul>
      </SubSection>

      <SubSection title="Schlagwörter">
        <div class="mt-2 flex flex-wrap gap-x-2 gap-y-1">
          <RecipeLabel
            v-for="label in recipeData.labels"
            :name="label.name"
            :category="label.category"
          />
        </div>
      </SubSection>

      <section class="flex flex-wrap justify-center gap-2">
        <RoundedButton type="flat">
          <template v-slot:icon>delete</template>
          <template v-slot:default>Löschen</template>
        </RoundedButton>
        <RoundedButton type="flat">
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
import RecipeLabel from "@/components/RecipeLabel.vue";
import RecipeDurationLabel from "@/components/RecipeDurationLabel.vue";
import RoundedButton from "@/components/RoundedButton.vue";
import SubSection from '@/components/SubSection.vue';
import { computed, ref } from "vue";

interface Ingredient {
  quantity: number;
  unit: string;
  name: string;
}

interface Label {
  name: string;
  category: string;
}

interface RecipeData {
  name: string;
  prepTime: number;
  source: string;
  numServings: number;
  ingredients: [Ingredient];
  labels: [Label];
  imageUrls: [string]
}

const props = defineProps<{
  recipeData: RecipeData
}>();

const numServings = ref(props.recipeData.numServings);
function scaleServings(quantity: number) {
  let scaledQunatity = numServings.value * quantity / props.recipeData.numServings;
  scaledQunatity = Math.round(scaledQunatity * 10) / 10;
  return scaledQunatity;
}
</script>