<template>
  <li class="flex flex-row items-center gap-4">
    <input
      type="checkbox"
      class="h-5 w-5 rounded text-red-500 focus:ring-red-500"
    />
    <span>{{ itemLabel }}</span>
  </li>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { CategorizedShoppingListItem } from "../types/shoppingListTypes";

const props = defineProps<{
  itemData: CategorizedShoppingListItem;
}>();

const itemLabel = computed(() => {
  const roundedQunatity = Math.round(props.itemData.quantity * 10) / 10;
  return `${roundedQunatity}${props.itemData.unitShortForm} ${props.itemData.ingredientName}`;
});
</script>
