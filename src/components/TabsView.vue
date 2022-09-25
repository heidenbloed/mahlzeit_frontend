<template>
  <TabBar>
    <template v-slot:logo>
      <router-link to="/">
      <div class="font-logo text-center text-4xl text-red-500">Mahlzeit</div>
      </router-link>
    </template>

    <template v-slot:buttons>
      <TabButton iconName="dinner_dining" url="/recipes/"> Rezepte </TabButton>
      <TabButton iconName="event" url="/plan/"> Planung </TabButton>
      <TabButton iconName="shopping_cart" url="/cart/"> Einkauf </TabButton>
      <TabButton iconName="person" url="/more/"> Mehr </TabButton>
    </template>

    <template v-slot:content>
      <router-view />
    </template>

    <template v-slot:footer>
      <InAppNotifications />
    </template>
  </TabBar>
</template>

<script setup lang="ts">
import TabBar from "./TabBar.vue";
import TabButton from "./TabButton.vue";
import InAppNotifications from "./InAppNotifications.vue";
</script>
