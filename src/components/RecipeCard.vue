<template>
  <div class="max-w-md bg-white rounded-xl shadow-xl">
    <div class="rounded-xl overflow-hidden">
      <img :src="imageUrl" alt="recipe image">
    </div>
    <div class="p-4 flex flex-row">
      <div class="flex-grow pr-4">
        <div class="font-sans font-semibold tracking-tight text-2xl text-gray-700">
          <slot name=title></slot>
        </div>
        <div class="font-sans font-medium tracking-tight text-gray-700">
          <slot name=description></slot>
        </div>
      </div>
      <div class="flex flex-row gap-2">
        <IconButton type="primary">
          shopping_cart
        </IconButton>
        <IconButton type="secondary">
          info
        </IconButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconButton from "@/components/IconButton.vue";

const props = defineProps<{
  imageUrl: string
}>();
</script>