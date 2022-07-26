<template>
  <div class="mx-auto h-full max-w-4xl rounded-b-xl bg-white md:rounded-t-xl">
    <div class="flex h-full animate-pulse flex-col">
      <template v-if="mockup === 'RecipeDetail'">
        <div class="h-64 w-full bg-gray-200"></div>
        <div class="flex grow flex-col gap-4 p-4">
          <div class="h-10 w-full rounded-xl bg-gray-200"></div>
          <div class="h-32 w-full rounded-xl bg-gray-200"></div>
          <div class="w-full grow rounded-xl bg-gray-200"></div>
        </div>
      </template>
      <template v-if="mockup === 'RecipeEdit'">
        <div class="flex grow flex-col gap-4 p-4">
          <div class="h-16 w-full rounded-xl bg-gray-200"></div>
          <div class="h-16 w-full rounded-xl bg-gray-200"></div>
          <div class="h-16 w-full rounded-xl bg-gray-200"></div>
          <div class="h-40 w-full rounded-xl bg-gray-200"></div>
          <div class="w-full grow rounded-xl bg-gray-200"></div>
        </div>
      </template>
      <template v-if="mockup === 'ShoppingList'">
        <div class="flex grow flex-col gap-4 p-4">
          <div class="h-40 w-full rounded-xl bg-gray-200"></div>
          <div class="h-24 w-full rounded-xl bg-gray-200"></div>
          <div class="h-52 w-full rounded-xl bg-gray-200"></div>
          <div class="w-full grow rounded-xl bg-gray-200"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    mockup?: "RecipeDetail" | "RecipeEdit" | "ShoppingList";
  }>(),
  {
    mockup: "RecipeDetail",
  }
);
</script>
