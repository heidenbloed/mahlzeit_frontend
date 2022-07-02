<template>
  <main
    class="mx-auto grid max-w-2xl grid-cols-1 gap-4 rounded-b-xl bg-white p-4 md:rounded-t-xl"
  >
    <SubSection
      v-if="list.length > 0"
      v-for="{ category, groupItems } in sortedList"
      :title="category.name"
    >
      <ul class="space-y-3">
        <ShoppingListItem v-for="itemData in groupItems" :itemData="itemData" />
      </ul>
    </SubSection>

    <section v-else>
      <p class="text-center font-medium">Die Einkaufsliste ist noch leer.</p>
    </section>

    <section class="flex justify-center gap-2">
      <RoundedButton
        type="raised"
        @click="copyToClipboard"
        :disabled="!copyIsSupported"
      >
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
import { CategorizedShoppingListItem } from "../types/shoppingListTypes";
import { IngredientCategory } from "../types/recipeDbTypes";
import { useClipboard } from "@vueuse/core";
import { computed } from "vue";

const props = defineProps<{
  list: CategorizedShoppingListItem[];
}>();

interface ShoppingListGroup {
  category: IngredientCategory;
  groupItems: CategorizedShoppingListItem[];
}

const sortedList = computed(() => {
  return props.list.reduce((prev, next) => {
    if (prev.length == 0) {
      prev.push({
        category: next.category,
        groupItems: [next],
      });
    } else {
      const groupIdx = prev.findIndex(
        (group) => group.category.id === next.category.id
      );
      if (groupIdx >= 0) {
        prev[groupIdx].groupItems.push(next);
      } else {
        const locationIndices = prev.map(
          (group) => group.category.location_index
        );
        let newGroupIdx = 0;
        for (const locationIdx of locationIndices) {
          if (locationIdx >= next.category.location_index) {
            break;
          } else {
            newGroupIdx += 1;
          }
        }
        prev.splice(newGroupIdx, 0, {
          category: next.category,
          groupItems: [next],
        });
      }
    }
    return prev;
  }, [] as ShoppingListGroup[]);
});

const listAsString = computed(() => {
  return sortedList.value
    .map((shoppingListGroup) => {
      const { category, groupItems } = shoppingListGroup;
      const groupString = groupItems
        .map((item) => {
          return `${Math.round(item.quantity * 10) / 10}${item.unitShortForm} ${
            item.ingredientName
          }`;
        })
        .join("\n");
      return `---${category.name.toUpperCase()}---\n${groupString}`;
    })
    .join("\n");
});

const { copy: _copyToClipboard, isSupported: copyIsSupported } = useClipboard();
function copyToClipboard() {
  _copyToClipboard(listAsString.value);
}
</script>
