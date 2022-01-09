<template>
  <RoundedCard>
    <button class="appearance-none text-left"  @click="$router.push('/recipe/')">
      <div class="rounded-xl overflow-hidden">
        <img :src="recipeCardData.imageUrl" alt="recipe image" class="aspect-[2/1] object-cover object-center">
      </div>
      <div class="p-4 flex flex-row items-center">
        <div class="grow pr-4">
          <h1 class="font-semibold tracking-tight text-2xl text-gray-700">
            {{recipeCardData.name}}
          </h1>
          <div class="tracking-tight text-gray-700">
            <RecipeDurationLabel :prepTime="recipeCardData.prepTime"/>
          </div>
        </div>
        <div class="inline-flex flex-row gap-2">
          <RoundedButton type="primary" @click.stop>
            <span class="icon-md">shopping_cart</span>
            <span>Einkaufen</span>
          </RoundedButton>
        </div>
      </div>
    </button>
  </RoundedCard>
</template>

<script setup lang="ts">
import RoundedCard from "@/components/RoundedCard.vue";
import RoundedButton from "@/components/RoundedButton.vue";
import RecipeDurationLabel from "@/components/RecipeDurationLabel.vue";

interface RecipeCardData {
  name: string;
  prepTime: number;
  imageUrl: string;
}

const props = defineProps<{
  recipeCardData: RecipeCardData
}>();
</script>