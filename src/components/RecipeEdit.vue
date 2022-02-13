<template>
  <main class="mx-auto max-w-4xl rounded-xl bg-white">
    <article
      class="flex flex-col gap-4 p-4 font-sans tracking-tight text-gray-700"
    >
      <section class="flex flex-col gap-2">
        <RoundedInput
          label="Rezeptname"
          v-model="currentRecipeData.name"
          clearable
        />
        <RoundedInput
          label="Dauer in Minuten"
          inputType="number"
          v-model="currentRecipeData.prepTime"
          clearable
        />
        <RoundedInput
          label="Quelle"
          v-model="currentRecipeData.source"
          clearable
        />
      </section>

      <SubSection title="Zutaten">
        <RecipeIngredientListEdit
          v-model="currentRecipeData.ingredientList"
          v-model:numServings="currentRecipeData.numServings"
        />
      </SubSection>

      <SubSection title="Schlagwörter">
        <RecipeLabelListEdit v-model="currentRecipeData.labelList" />
      </SubSection>

      <SubSection title="Fotos">
        <RecipeImageSorter :images="currentRecipeData.imageList" />
      </SubSection>

      <section class="flex flex-wrap justify-center gap-2">
        <RoundedButton type="flat">
          <template v-slot:icon>save</template>
          <template v-slot:default>Speichern</template>
        </RoundedButton>
        <RoundedButton type="flat">
          <template v-slot:icon>cancel</template>
          <template v-slot:default>Abbrechen</template>
        </RoundedButton>
      </section>
    </article>
  </main>
</template>

<script setup lang="ts">
import RoundedButton from "@/components/RoundedButton.vue";
import RoundedInput from "@/components/RoundedInput.vue";
import SubSection from "@/components/SubSection.vue";
import RecipeImageSorter from "@/components/RecipeImageSorter.vue";
import RecipeLabelListEdit from "@/components/RecipeLabelListEdit.vue";
import RecipeIngredientListEdit from "@/components/RecipeIngredientListEdit.vue";
import { reactive } from "vue";

interface IngredientUnit {
  id: number;
  name: string;
}

interface IngredientCategory {
  id: number;
  name: string;
}

interface RecipeIngredient {
  id: number;
  name: string;
  quantity: number;
  currentUnit: IngredientUnit;
  defaultUnit: IngredientUnit;
  unitConvCurrent: number;
  unitConvDefault: number;
  setCurrentUnitAsDefault: boolean;
  category: IngredientCategory;
}

interface RecipeLabel {
  name: string;
  category: string;
}

interface RecipeImage {
  id: number;
  url: String;
  order: number;
}

interface RecipeData {
  name: string;
  prepTime: number;
  source: string;
  numServings: number;
  ingredientList: RecipeIngredient[];
  labelList: RecipeLabel[];
  imageList: RecipeImage[];
}

const props = defineProps<{
  initRecipeData: RecipeData;
}>();

const currentRecipeData = reactive(props.initRecipeData);
</script>
