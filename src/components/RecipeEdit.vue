<template>
  <main class="max-w-4xl mx-auto bg-white rounded-xl">
    <article class="p-4 font-sans tracking-tight text-gray-700 flex flex-col gap-4">
      <!-- {{currentRecipeData}} -->
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
        todo
      </SubSection>

      <SubSection title="Schlagwörter">
        todo
      </SubSection>

      <SubSection title="Fotos">
        <RecipeImageSorter
          :images="currentRecipeData.images"
        />
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
import ServingsSlider from "@/components/ServingsSlider.vue";
import RecipeLabel from "@/components/RecipeLabel.vue";
import RecipeDurationLabel from "@/components/RecipeDurationLabel.vue";
import RoundedButton from "@/components/RoundedButton.vue";
import RoundedInput from "@/components/RoundedInput.vue";
import SubSection from '@/components/SubSection.vue';
import RecipeImageSorter from "@/components/RecipeImageSorter.vue";
import { reactive } from "vue";

interface RecipeIngredient {
  quantity: number;
  unit: string;
  name: string;
}

interface RecipeLabel {
  name: string;
  category: string;
}

interface RecipeImage {
  id: number;
  url: String;
  order: number;
};

interface RecipeData {
  name: string;
  prepTime: number;
  source: string;
  numServings: number;
  ingredients: [RecipeIngredient];
  labels: [RecipeLabel];
  images: [RecipeImage]
}

const props = defineProps<{
  initRecipeData: RecipeData
}>();

const currentRecipeData = reactive(props.initRecipeData);
</script>