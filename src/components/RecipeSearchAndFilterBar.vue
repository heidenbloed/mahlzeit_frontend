<template>
  <div class="w-full col-span-1 lg:col-span-2 xl:col-span-3">
    <RoundedCard
      noWidthLimit
      class="p-4 flex flex-col gap-4"
    >
      <AutoCompleteInput
        v-model="searchString"
        :autoCompleteList="autoCompleteList"
        @on-auto-complete-option-selected="selectAutoCompleteOption"
        clearable
      >
        <template #beforeInput>
          <span class="icon-md">search</span>
        </template>
        <template #autoCompleteOption="searchOption">
          <div class="flex items-center gap-2">
            <template v-if="searchOption.option.category !== undefined">
              <span class="icon-md">label</span>
              <RecipeLabel
                :name="searchOption.option.proposal"
                :category="searchOption.option.category"
              />
            </template>
            <template v-else>
              <span class="icon-md">dinner_dining</span>
              <span>
                {{searchOption.option.proposal}}
              </span>
            </template>
          </div>
        </template>
      </AutoCompleteInput>

      <div
        v-show="labelFilterList.length > 0"
        class="bg-stone-200 rounded-xl p-2 flex gap-2 items-center"
      >
        <span class="icon-md">filter_alt</span>
        <ul
          class="inline-flex grow flex-row flex-wrap gap-2"
        >
          <li
            v-for="label in labelFilterList"
          >
            <RecipeLabel
              :name="label.name"
              :category="label.category"
              closeable
            />
          </li>
        </ul>
        <button class="icon-md">clear</button>
      </div>
    </RoundedCard>
  </div>
</template>

<script setup lang="ts">
import RoundedCard from "@/components/RoundedCard.vue";
import RecipeLabel from "@/components/RecipeLabel.vue";
import AutoCompleteInput from "@/components/AutoCompleteInput.vue";
import { ref, computed, watchEffect, onMounted, nextTick } from "vue";

type Label = {
  name: string
  category: string
}
type AutoCompleteRecipeOption = {
  proposal: string
}
type AutoCompleteLabelOption = {
  proposal: string
  category: string
}
type AutoCompleteOption = AutoCompleteRecipeOption | AutoCompleteLabelOption;

const searchString = ref("");
const labelFilterList = ref<Label[]>([]);

const autoCompleteList = computed(() => [
  {
    proposal: "Einfach",
    category: "complexity"
  },
  {
    proposal: "Vegan",
    category: "diet"
  },
  {
    proposal: "Indisch",
    category: "cusine"
  },
  {
    proposal: searchString.value + " recipe proposal",
  },
]);

async function selectAutoCompleteOption(autoCompleteOption: AutoCompleteOption){
  if ((autoCompleteOption as AutoCompleteLabelOption).category !== undefined) {
    labelFilterList.value.push({
      name: autoCompleteOption.proposal,
      category: (autoCompleteOption as AutoCompleteLabelOption).category,
    })
    searchString.value = "";
  } else {
    searchString.value = autoCompleteOption.proposal;
    if (document.activeElement !== undefined && typeof (document.activeElement as HTMLInputElement).blur == "function") {
      (document.activeElement as HTMLInputElement).blur();
    }
  }
}
</script>