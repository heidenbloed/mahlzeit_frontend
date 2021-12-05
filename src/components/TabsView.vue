<template>
  <TabBar>
    <template v-slot:logo>
      <div class="text-center text-4xl logo">
        RezeptDB
      </div>
    </template>
    <template v-slot:default>
      <TabButton iconName="dinner_dining" url="/recipes/">
        Rezepte
      </TabButton>
      <TabButton iconName="event" url="/plan/">
        Planung
      </TabButton>
      <TabButton iconName="shopping_cart" url="/cart/">
        Einkaufsliste
      </TabButton>
    </template>
  </TabBar>
  <router-view/>
</template>

<script setup lang="ts">
import TabBar from '@/components/TabBar.vue'
import TabButton from '@/components/TabButton.vue'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Slab:wght@700&display=swap');

.logo {
  font-family:'Josefin Slab', serif;
}
</style>