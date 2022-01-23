<template>
  <CardGrid> 
    <RoundedCard noWidthLimit class="w-full p-2 md:p-4 col-span-1 lg:col-span-2 xl:col-span-3">
      <div class="flex flex-col md:flex-row gap-1 md:gap-2 justify-center items-center">
        <span class="flex flex-wrap items-center justify-center gap-1 md:gap-2">
          <ServingsSlider :defaultNumServings="4" class=""/>
          <RoundedButton type="flat">
            <template v-slot:icon>approval</template>
            <template v-slot:default>Für alle übernehmen</template>
          </RoundedButton>
        </span>
        <div class="bg-stone-800 self-stretch h-px md:w-px md:h-auto"></div>
        <RoundedButton type="secondary">
          <template v-slot:icon>remove_shopping_cart</template>
          <template v-slot:default>Liste leeren</template>
        </RoundedButton>
      </div>
    </RoundedCard>
    <PlanningCard
      v-for="name in ['Salatschüssel', 'Falaffelbällchen mit Vanilleeis und Brombeeren', 'Salatschüssel mit Käse', 'Salatschüssel (vegan)', 'Linsengemüse mit Orecchiette']"
      :recipeName="name"
      imageUrl="https://i0.web.de/image/496/34720496,pd=3,f=sdata169/abnehmen-bewusst-essen.jpg"
      :defaultNumServings="4"
    />
    <!-- <RoundedCard noWidthLimit class="w-full p-4 col-span-1 lg:col-span-2 xl:col-span-3">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-center">
        <RoundedButton type="secondary">
          <template v-slot:icon>remove_shopping_cart</template>
          <template v-slot:default>Liste leeren</template>
        </RoundedButton>
      </div>
    </RoundedCard> -->
  </CardGrid>
</template>

<script setup lang="ts">
import CardGrid from "@/components/CardGrid.vue";
import RoundedCard from "@/components/RoundedCard.vue";
import PlanningCard from "@/components/PlanningCard.vue";
import RoundedButton from "@/components/RoundedButton.vue";
import ServingsSlider from "@/components/ServingsSlider.vue";
</script>