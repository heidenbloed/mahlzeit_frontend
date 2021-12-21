<template>
  <main class="flex flex-wrap bg-white rounded-xl">
    <div class="max-w-lg">
      <RecipeImageSlides/>
    </div>
    

    <article class="p-4 font-sans tracking-tight text-gray-700">
      <h1 class="font-semibold text-2xl">
        Kaiserschmarrn
      </h1>
      <p>
        60 Minuten
      </p>
      <p>
        Rezept von Omi
      </p>
      
      <section class="mt-4">
        <h2 class="font-semibold text-lg">
          Zutaten
        </h2>
      </section>
      <ul>
        <li>5 Pfund Butter</li>
        <li>1 Möhre</li>
        <li>Jod zum verfeinern</li>
      </ul>
    </article>
  </main>
</template>

<script setup lang="ts">
import RecipeImageSlides from "@/components/RecipeImageSlides.vue"
</script>