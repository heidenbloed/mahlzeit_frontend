<template>
  <transition
    enterFromClass="opacity-0"
    leaveToClass="opacity-0"
  >
    <div
      v-show="showAutoCompleteList"
      class="fixed inset-0 bg-black opacity-30 z-2 transition-opacity duration-300"
    />
  </transition>
  <div class="z-10 w-full col-span-1 lg:col-span-2 xl:col-span-3 relative">
    <div
      ref="barCard"
      class="w-full"
      :class="showAutoCompleteList? 'absolute' : ''"
      @focusout="handleFocusOutEvent"
    >
      <RoundedCard
        noWidthLimit
        class="p-4 flex flex-col gap-4"
      >
        <section
          tabindex="0"
          class="bg-stone-200 rounded-xl focus-within:ring-2 ring-red-500 px-2"
        >
          <div class="flex flex-row items-center">
            <span class="icon-md">search</span>
            <input
              type="search"
              class="border-0 grow bg-transparent focus:ring-0"
              v-model="searchString"
              ref="searchInput"
            />
            <button class="icon-md">clear</button>
          </div>

          <ul
            v-show="showAutoCompleteList"
            class="p-2 grid grid-cols-1 auto-rows-fr items-center gap-2"
          >
            <li v-for="autoCompleteOption in autoCompleteList">
              <button
                class="w-full text-left"
                @click="selectAutoCompleteOption(autoCompleteOption)"
              >
                <RecipeLabel
                  v-if="autoCompleteOption.category !== undefined"
                  :name="autoCompleteOption.proposal"
                  :category="autoCompleteOption.category"
                />
                <span v-else>
                  {{autoCompleteOption.proposal}}
                </span>
              </button>
            </li>
          </ul>
        </section>

        <section
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
        </section>
      </RoundedCard>
    </div>
    
    <div v-show="showAutoCompleteList" :style="{height: `${heightOfBarClosedAutoCmpl}px`}"></div>
  </div>
</template>

<script setup lang="ts">
import RoundedCard from "@/components/RoundedCard.vue";
import RecipeLabel from "@/components/RecipeLabel.vue"
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
const searchInput = ref<HTMLInputElement|null>(null);
const showAutoCompleteList = ref(false);
const labelFilterList = ref<Label[]>([]);
const barCard = ref<HTMLElement|null>(null);
const heightOfBarClosedAutoCmpl = ref(0);

function updateHeightOfBar() {
  if (barCard.value instanceof HTMLElement){
    heightOfBarClosedAutoCmpl.value = (barCard.value as HTMLElement).clientHeight;
  }
}
onMounted(updateHeightOfBar);

watchEffect(() => {
  if(searchString.value.length > 0){
    showAutoCompleteList.value = true;
  } else {
    showAutoCompleteList.value = false;
  }
})

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
  }
  if (searchInput.value instanceof HTMLInputElement){
    searchInput.value.focus();
  }
  if ((autoCompleteOption as AutoCompleteLabelOption).category !== undefined) {
    showAutoCompleteList.value = false;
    await nextTick();
    updateHeightOfBar();
  } else {
    await nextTick();
    showAutoCompleteList.value = false;
  }
}

function handleFocusOutEvent(event: FocusEvent){
  if(event.relatedTarget instanceof Node && barCard.value?.contains(event.relatedTarget)) {
    console.debug("Focus lost to child.");
  } else {
    console.debug("Focus lost to other component.");
    showAutoCompleteList.value = false;
  }
}
</script>