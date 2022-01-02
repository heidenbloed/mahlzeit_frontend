<template>
  <RoundedCard>
    <div class="rounded-xl overflow-hidden">
      <img :src="recipeCardData.imageUrl" alt="recipe image" class="aspect-[2/1] object-cover object-center">
    </div>
    <div class="p-4 flex flex-row">
      <div class="grow pr-4">
        <h1 class="font-semibold tracking-tight text-2xl text-gray-700">
          {{recipeCardData.name}}
        </h1>
        <div class="tracking-tight text-gray-700">
          <RecipeDurationLabel :prepTime="recipeCardData.prepTime"/>
        </div>
      </div>
      <div class="flex flex-row gap-2">
        <IconButton type="primary">
          shopping_cart
        </IconButton>
        <IconButton type="secondary" @click="$router.push('/recipe/')">
          info
        </IconButton>
      </div>
    </div>
  </RoundedCard>
</template>

<script setup lang="ts">
import RoundedCard from "@/components/RoundedCard.vue";
import IconButton from "@/components/IconButton.vue";
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