<template>
  <RecipeEdit :initRecipeData="recipeData" />
</template>

<script setup lang="ts">
import RecipeEdit from "@/components/RecipeEdit.vue";

const recipeData = {
  name: "Kaiserschmarrn mit viel Liebe",
  prepTime: 110,
  source: "Rezept von Omi",
  numServings: 3,
  imageList: [
    {
      id: 0,
      url: "https://i0.web.de/image/496/34720496,pd=3,f=sdata169/abnehmen-bewusst-essen.jpg",
      order: 0,
    },
    {
      id: 1,
      url: "https://ais.kochbar.de/kbrezept/284621_878966/24-05goci/600x450/254/burger-rezept-bild-nr-1187.jpg",
      order: 1,
    },
    {
      id: 2,
      url: "https://www.ndr.de/pizza460_v-contentxl.jpg",
      order: 2,
    },
    {
      id: 3,
      url: "https://www.ndr.de/pizza460_v-contentxl.jpg",
      order: 3,
    },
    {
      id: 4,
      url: "https://www.ndr.de/pizza460_v-contentxl.jpg",
      order: 4,
    },
    {
      id: 5,
      url: "https://www.ndr.de/pizza460_v-contentxl.jpg",
      order: 5,
    },
  ],
  ingredientList: [
    {
      id: 0,
      name: "Ultralanger Zutatenname, der ja durchaus mal vorkommen kann",
      currentUnit: { id: 0, name: "Stk." },
      quantity: 1,
      defaultUnit: { id: 0, name: "Stk." },
      unitConvCurrent: 1,
      unitConvDefault: 1,
      setCurrentUnitAsDefault: false,
      category: { id: 0, name: "Kühlwaren" },
    },
    {
      id: 1,
      name: "Butter",
      currentUnit: { id: 1, name: "Pfund" },
      quantity: 5,
      defaultUnit: { id: 1, name: "Pfund" },
      unitConvCurrent: 1,
      unitConvDefault: 1,
      setCurrentUnitAsDefault: false,
      category: { id: 1, name: "Milchprodukte" },
    },
    {
      id: 2,
      name: "Zucker",
      currentUnit: { id: 2, name: "kg" },
      quantity: 37,
      defaultUnit: { id: 2, name: "kg" },
      unitConvCurrent: 1,
      unitConvDefault: 1,
      setCurrentUnitAsDefault: false,
      category: { id: 2, name: "Backzutaten" },
    },
    {
      id: 3,
      name: "Liebe",
      currentUnit: { id: 0, name: "Stk" },
      quantity: 1,
      defaultUnit: { id: 0, name: "Stk" },
      unitConvCurrent: 1,
      unitConvDefault: 1,
      setCurrentUnitAsDefault: false,
      category: { id: 3, name: "Fleisch" },
    },
  ],
  labelList: [
    {
      name: "Vegan",
      category: "diet",
    },
    {
      name: "Vegetarisch",
      category: "diet",
    },
    {
      name: "Einfach",
      category: "complexity",
    },
    {
      name: "Schwer",
      category: "complexity",
    },
    {
      name: "Indisch",
      category: "cuisine",
    },
    {
      name: "Japanisch",
      category: "cuisine",
    },
    {
      name: "Party",
      category: "misc",
    },
  ],
};

console.log("recipeData", recipeData);
</script>
