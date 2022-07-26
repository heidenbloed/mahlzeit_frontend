<template>
  <CardGrid>
    <RoundedCard
      noWidthLimit
      class="col-span-1 w-full p-2 md:p-4 lg:col-span-2 xl:col-span-3"
    >
      <div
        class="flex flex-col items-center justify-center gap-1 md:flex-row md:gap-2"
      >
        <span class="flex flex-wrap items-center justify-center gap-1 md:gap-2">
          <ServingsSlider v-model="numServingsForAll" class="" />
          <RoundedButton
            type="flat"
            @click="plannedRecipes.updateAllNumServings(numServingsForAll)"
          >
            <template v-slot:icon>approval</template>
            <template v-slot:default>Für alle übernehmen</template>
          </RoundedButton>
        </span>
        <div class="h-px self-stretch bg-stone-800 md:h-auto md:w-px"></div>
        <RoundedButton type="flat" @click="plannedRecipes.clearList">
          <template v-slot:icon>remove_shopping_cart</template>
          <template v-slot:default>Liste leeren</template>
        </RoundedButton>
      </div>
    </RoundedCard>
    <PlanningCard
      v-for="plannedRecipe in plannedRecipes.list"
      :recipeId="plannedRecipe.id"
      :recipeName="plannedRecipe.name"
      :image="plannedRecipe.image"
      :numServings="plannedRecipe.numServings"
      :key="plannedRecipe.id"
    />
  </CardGrid>
</template>

<script setup lang="ts">
import CardGrid from "./CardGrid.vue";
import RoundedCard from "./RoundedCard.vue";
import PlanningCard from "./PlanningCard.vue";
import RoundedButton from "./RoundedButton.vue";
import ServingsSlider from "./ServingsSlider.vue";
import { usePlannedRecipesStore } from "../stores/plannedRecipes";
import { ref } from "vue";

const numServingsForAll = ref(4);
const plannedRecipes = usePlannedRecipesStore();
</script>
