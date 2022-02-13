<template>
  <main
    class="mx-auto grid max-w-2xl grid-cols-1 gap-4 rounded-b-xl bg-white p-4 md:rounded-t-xl"
  >
    <SubSection
      v-for="title in ['Gemüse/Obst', 'Milchprodukte', 'Tiefkühlprodukte']"
      :title="title"
    >
      <ul class="space-y-3">
        <ShoppingListItem />
        <ShoppingListItem />
        <ShoppingListItem />
      </ul>
    </SubSection>

    <section class="flex justify-center gap-2">
      <RoundedButton type="raised">
        <template #icon>copy</template>
        <template #default>Kopieren</template>
      </RoundedButton>
    </section>
  </main>
</template>

<script setup lang="ts">
import SubSection from "@/components/SubSection.vue";
import ShoppingListItem from "@/components/ShoppingListItem.vue";
import RoundedButton from "@/components/RoundedButton.vue";
</script>
