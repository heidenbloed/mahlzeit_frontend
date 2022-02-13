<template>
  <RoundedCard class="flex flex-col">
    <button
      @click="$router.push('/recipe/')"
      class="relative overflow-hidden rounded-t-xl"
    >
      <img
        :src="recipeCardData.imageUrl"
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
        <RecipeDurationLabel :prepTime="recipeCardData.prepTime" />
      </div>
    </button>
    <div class="flex justify-end p-2">
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
  recipeCardData: RecipeCardData;
}>();
</script>
