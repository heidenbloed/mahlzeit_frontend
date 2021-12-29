<template>
  <CardGrid>
    <RoundedCard noWidthLimit class="w-full p-4 col-span-1 lg:col-span-2 xl:col-span-3">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-center">
        <ServingsSlider :defaultNumServings="4" class=""/>
        <RoundedButton type="primary">
          Für alle übernehmen
        </RoundedButton>
      </div>
    </RoundedCard>
    <PlanningCard
      v-for="i in Array(5).keys()"
      imageUrl="https://i0.web.de/image/496/34720496,pd=3,f=sdata169/abnehmen-bewusst-essen.jpg"
      :defaultNumServings="i"
    >
      Salatschüssel
    </PlanningCard>
  </CardGrid>
</template>

<script setup lang="ts">
import CardGrid from "@/components/CardGrid.vue";
import RoundedCard from "@/components/RoundedCard.vue";
import PlanningCard from "@/components/PlanningCard.vue";
import RoundedButton from "@/components/RoundedButton.vue";
import ServingsSlider from "@/components/ServingsSlider.vue";
</script>