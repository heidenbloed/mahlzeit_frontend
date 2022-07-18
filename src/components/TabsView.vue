<template>
  <TabBar>
    <template v-slot:logo>
      <div class="font-logo text-center text-4xl text-red-500">RezeptDB</div>
    </template>

    <template v-slot:buttons>
      <TabButton iconName="dinner_dining" url="/recipes/"> Rezepte </TabButton>
      <TabButton iconName="event" url="/plan/"> Planung </TabButton>
      <TabButton iconName="shopping_cart" url="/cart/">
        Einkaufsliste
      </TabButton>
    </template>

    <template v-slot:content>
      <router-view />
    </template>
  </TabBar>
</template>

<script setup lang="ts">
import TabBar from "./TabBar.vue";
import TabButton from "./TabButton.vue";
</script>
