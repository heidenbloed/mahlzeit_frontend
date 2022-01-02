<template>
  <CardGrid>
    <RecipeSearchAndFilterBar/>
    <RecipeCard
      v-for="recipeCardData in recipeCardDataList"
      :recipeCardData="recipeCardData"
    />
  </CardGrid>
</template>

<script setup lang="ts">
import RecipeCard from "@/components/RecipeCard.vue";
import CardGrid from "@/components/CardGrid.vue";
import RecipeSearchAndFilterBar from "@/components/RecipeSearchAndFilterBar.vue";

const recipeCardDataList = new Array(20).fill([
  {
    name: "Salatschüssel",
    prepTime: 20,
    imageUrl: "https://i0.web.de/image/496/34720496,pd=3,f=sdata169/abnehmen-bewusst-essen.jpg",
  },
  {
    name: "Burger",
    prepTime: 60,
    imageUrl: "https://ais.kochbar.de/kbrezept/284621_878966/24-05goci/600x450/254/burger-rezept-bild-nr-1187.jpg",
  },
  {
    name: "Pizza",
    prepTime: 110,
    imageUrl: "https://www.ndr.de/pizza460_v-contentxl.jpg",
  },
]).flat();
</script>