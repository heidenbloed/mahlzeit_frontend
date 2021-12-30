<template>
  <main class="max-w-2xl mx-auto bg-white rounded-b-xl md:rounded-t-xl p-4 grid grid-cols-1 gap-4">
    <SubSection
      v-for="title in ['Gemüse/Obst', 'Milchprodukte', 'Tiefkühlprodukte']"
      :title="title"
    >
      <ul class="space-y-3">
        <ShoppingListItem/>
        <ShoppingListItem/>
        <ShoppingListItem/>
      </ul>
    </SubSection>
    
    <section class="flex justify-center gap-2">
      <IconButton type="primary">copy</IconButton>
    </section>
  </main>
</template>

<script setup lang="ts">
import SubSection from '@/components/SubSection.vue';
import ShoppingListItem from '@/components/ShoppingListItem.vue';
import IconButton from '@/components/IconButton.vue';
</script>