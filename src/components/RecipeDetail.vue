<template>
  <main class="max-w-4xl mx-auto bg-white rounded-xl">
    <div class="max-w-4xl mx-auto">
      <RecipeImageSlides/>
    </div>
    

    <article class="p-4 font-sans tracking-tight text-gray-700">
      <h1 class="font-semibold text-2xl mb-1">
        {{recipeData.name}}
      </h1>
      <p>
        <span v-if="prepTimeFullHours > 0">{{prepTimeFullHours}}h </span>
        <span>{{prepTimeRemaindingMinutes}}min</span>
      </p>
      <p>
        {{recipeData.source}}
      </p>
      
      <section class="mt-4 p-2 bg-stone-100 rounded-xl">
        <h2 class="font-semibold text-lg">
          Zutaten
        </h2>
        <ServingsSlider
          :defaultNumServings="recipeData.numServings"
          v-model="numServings"
        />
        <ul>
          <li v-for="ingredient in recipeData.ingredients">
            {{scaleServings(ingredient.quantity)}} {{ingredient.unit}} {{ingredient.name}}
          </li>
        </ul>
      </section>

      <section class="mt-4 p-2 bg-stone-100 rounded-xl">
        <h2 class="font-semibold text-lg">
          Schlagwörter
        </h2>
        <div class="mt-2 flex flex-wrap gap-x-2 gap-y-1">
          <RecipeLabel
            v-for="label in recipeData.labels"
            :name="label.name"
            :category="label.category"
          />
        </div>
      </section>

      <section class="mt-4 flex justify-center gap-2">
        <IconButton type="primary">shopping_cart</IconButton>
        <IconButton type="secondary">edit</IconButton>
        <IconButton type="secondary">share</IconButton>
      </section>
    </article>
  </main>
</template>

<script setup lang="ts">
import RecipeImageSlides from "@/components/RecipeImageSlides.vue";
import ServingsSlider from "@/components/ServingsSlider.vue";
import RecipeLabel from "@/components/RecipeLabel.vue";
import IconButton from "@/components/IconButton.vue";
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
}

const props = defineProps<{
  recipeData: RecipeData
}>();

const prepTimeFullHours = computed(() => Math.floor(props.recipeData.prepTime / 60));
const prepTimeRemaindingMinutes = computed(() => props.recipeData.prepTime % 60);

const numServings = ref(props.recipeData.numServings);
function scaleServings(quantity: number) {
  let scaledQunatity = numServings.value * quantity / props.recipeData.numServings;
  scaledQunatity = Math.round(scaledQunatity * 10) / 10;
  return scaledQunatity;
}
</script>