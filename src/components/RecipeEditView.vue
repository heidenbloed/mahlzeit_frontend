<template>
  <RecipeEdit :initRecipeData="recipeData"/>
</template>

<script setup lang="ts">
import RecipeEdit from "@/components/RecipeEdit.vue"

const recipeData = {
  name: "Kaiserschmarrn mit viel Liebe",
  prepTime: 110,
  source: "Rezept von Omi",
  numServings: 3,
  imageUrls: [
    "https://i0.web.de/image/496/34720496,pd=3,f=sdata169/abnehmen-bewusst-essen.jpg",
    "https://ais.kochbar.de/kbrezept/284621_878966/24-05goci/600x450/254/burger-rezept-bild-nr-1187.jpg",
    "https://www.ndr.de/pizza460_v-contentxl.jpg"
  ],
  ingredients: [
    {
      name: "Ultralanger Zutatenname, der ja durchaus mal vorkommen kann",
      unit: "Stk.",
      quantity: 1
    },
    {
      name: "Butter",
      unit: "Pfund",
      quantity: 5
    },
    {
      name: "Zucker",
      unit: "kg",
      quantity: 37
    },
    {
      name: "Liebe",
      unit: "Stk.",
      quantity: 1
    },
  ],
  labels: [
    {
      name: "Vegan",
      category: "diet"
    },
    {
      name: "Vegetarisch",
      category: "diet"
    },
    {
      name: "Einfach",
      category: "complexity"
    },
    {
      name: "Schwer",
      category: "complexity"
    },
    {
      name: "Indisch",
      category: "cuisine"
    },
    {
      name: "Japanisch",
      category: "cuisine"
    },
    {
      name: "Party",
      category: "misc"
    },
  ]
}
</script>