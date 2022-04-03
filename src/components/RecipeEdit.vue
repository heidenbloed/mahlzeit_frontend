<template>
  <div class="flex flex-row">
    <main class="mx-auto max-w-4xl rounded-b-xl bg-white md:rounded-t-xl">
      <article
        class="flex flex-col gap-4 p-4 font-sans tracking-tight text-gray-700"
      >
        <section class="flex flex-col gap-2">
          <RoundedInput
            label="Rezeptname"
            v-model="_recipeData.name"
            clearable
          />
          <RoundedInput
            label="Dauer in Minuten"
            inputType="number"
            v-model="_recipeData.preparation_time"
            clearable
          />
          <RoundedInput label="Quelle" v-model="_recipeData.source" clearable />
        </section>

        <SubSection title="Zutaten">
          <RecipeIngredientListEdit
            v-model="_recipeData.quantified_ingredients"
            v-model:numServings="_recipeData.num_servings"
            :unitList="unitList"
            :ingredientCategoryList="ingredientCategoryList"
          />
        </SubSection>

        <SubSection title="Schlagwörter">
          <RecipeLabelListEdit v-model="_recipeData.labels" />
        </SubSection>

        <SubSection title="Fotos">
          <RecipeImageSorter :images="_recipeData.recipe_images" />
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
  </div>
</template>

<script setup lang="ts">
import RoundedButton from "@/components/RoundedButton.vue";
import RoundedInput from "@/components/RoundedInput.vue";
import SubSection from "@/components/SubSection.vue";
import RecipeImageSorter from "@/components/RecipeImageSorter.vue";
import RecipeLabelListEdit from "@/components/RecipeLabelListEdit.vue";
import RecipeIngredientListEdit from "@/components/RecipeIngredientListEdit.vue";
import {
  RecipeEditData,
  Unit,
  IngredientCategory,
} from "../types/recipeDbTypes";
import { reactive, watchEffect } from "vue";

const props = defineProps<{
  recipeData: RecipeEditData;
  unitList: Unit[];
  ingredientCategoryList: IngredientCategory[];
}>();
const emit = defineEmits(["update:recipeData"]);

const _recipeData = reactive(props.recipeData);
watchEffect(() => {
  emit("update:recipeData", _recipeData);
});
</script>
