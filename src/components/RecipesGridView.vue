<template>
  <CardGrid>
    <RecipeCard imageUrl="https://i0.web.de/image/496/34720496,pd=3,f=sdata169/abnehmen-bewusst-essen.jpg">
      <template v-slot:title>
        Salatschüssel
      </template>
      <template v-slot:description>
        20 Minuten
      </template>
    </RecipeCard>
    <RecipeCard imageUrl="https://ais.kochbar.de/kbrezept/284621_878966/24-05goci/600x450/254/burger-rezept-bild-nr-1187.jpg">
      <template v-slot:title>
        Burger
      </template>
      <template v-slot:description>
        60 Minuten
      </template>
    </RecipeCard>
    <RecipeCard imageUrl="https://www.ndr.de/pizza460_v-contentxl.jpg">
      <template v-slot:title>
        Pizza
      </template>
      <template v-slot:description>
        90 Minuten
      </template>
    </RecipeCard>
    <RecipeCard imageUrl="https://www.ndr.de/pizza460_v-contentxl.jpg">
      <template v-slot:title>
        Pizza
      </template>
      <template v-slot:description>
        90 Minuten
      </template>
    </RecipeCard>
    <RecipeCard imageUrl="https://www.ndr.de/pizza460_v-contentxl.jpg">
      <template v-slot:title>
        Pizza
      </template>
      <template v-slot:description>
        90 Minuten
      </template>
    </RecipeCard>
    <RecipeCard imageUrl="https://www.ndr.de/pizza460_v-contentxl.jpg">
      <template v-slot:title>
        Pizza
      </template>
      <template v-slot:description>
        90 Minuten
      </template>
    </RecipeCard>
    <RecipeCard imageUrl="https://www.ndr.de/pizza460_v-contentxl.jpg">
      <template v-slot:title>
        Pizza
      </template>
      <template v-slot:description>
        90 Minuten
      </template>
    </RecipeCard>
    <RecipeCard imageUrl="https://www.ndr.de/pizza460_v-contentxl.jpg">
      <template v-slot:title>
        Pizza
      </template>
      <template v-slot:description>
        90 Minuten
      </template>
    </RecipeCard>
  </CardGrid>
</template>

<script setup lang="ts">
import RecipeCard from "@/components/RecipeCard.vue";
import CardGrid from "@/components/CardGrid.vue";
</script>