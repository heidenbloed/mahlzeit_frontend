<template>
  <RoundedCard class="flex flex-col">
    <button
      @click="$router.push('/recipe/')"
      class="rounded-t-xl overflow-hidden relative"
    >
      <img :src="recipeCardData.imageUrl" alt="recipe image" class="aspect-[2/1] object-cover object-center">
      <div class="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black/50"></div>
      <div class="absolute bottom-2 left-3 text-white tracking-tight">
        <div class="font-semibold text-2xl">
          {{recipeCardData.name}}
        </div>
        <RecipeDurationLabel :prepTime="recipeCardData.prepTime"/>
      </div>
    </button>
    <div class="p-2 flex justify-end">
      <RoundedButton type="flat" @click.stop>
        <template v-slot:icon>shopping_cart</template>
        <template v-slot:default>Einkaufen</template>
      </RoundedButton>
    </div>
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