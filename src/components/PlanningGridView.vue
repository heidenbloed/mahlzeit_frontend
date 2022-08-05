<template>
  <div
    v-if="plannedRecipes.list.length == 0"
    class="mx-auto max-w-4xl rounded-b-xl bg-white p-4 text-center font-medium shadow-xl md:rounded-t-xl"
  >
    Die Planungsliste ist noch leer. Wähle erst die Rezepte aus, für die du die
    Zutaten kaufen möchtest.
  </div>
  <CardGrid v-else>
    <RoundedCard
      noWidthLimit
      class="col-span-1 w-full p-2 lg:col-span-2 xl:col-span-3"
    >
      <div
        class="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4"
      >
        <SubSection
          class="flex max-w-full flex-row flex-wrap items-center justify-center gap-1 md:gap-2 md:py-0"
        >
          <ServingsSlider v-model="numServingsForAll" />
          <RoundedButton
            type="flat"
            @click="plannedRecipes.updateAllNumServings(numServingsForAll)"
          >
            <template v-slot:icon>approval</template>
            <template v-slot:default>Für alle übernehmen</template>
          </RoundedButton>
        </SubSection>
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
import SubSection from "./SubSection.vue";
import { usePlannedRecipesStore } from "../stores/plannedRecipes";
import { ref } from "vue";

const numServingsForAll = ref(4);
const plannedRecipes = usePlannedRecipesStore();
</script>
