<template>
  <main class="mx-auto max-w-4xl rounded-b-xl bg-white md:rounded-t-xl">
    <article class="p-4 font-sans tracking-tight text-gray-700">
      <ValidatingForm
        class="flex flex-col gap-4"
        @save="finishEdit(true)"
        @cancel="finishEdit(false)"
      >
        <section class="flex flex-col gap-2">
          <RoundedInput
            name="recipeName"
            label="Rezeptname"
            v-model="_recipeData.name"
            rules="required"
            clearable
          />
          <RoundedInput
            name="prepTime"
            label="Dauer in Minuten"
            inputType="number"
            v-model.number="_recipeData.preparation_time"
            rules="required|number|positive|integer"
            clearable
          />
          <RoundedInput
            name="source"
            label="Quelle"
            v-model="_recipeData.source"
            clearable
          />
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
          <RecipeLabelListEdit
            v-model="_recipeData.labels"
            :allLabels="allLabels"
          />
        </SubSection>

        <SubSection title="Fotos">
          <RecipeImageSorter v-model="_recipeData.recipe_images" />
        </SubSection>
      </ValidatingForm>
    </article>
  </main>
</template>

<script setup lang="ts">
import RoundedInput from "@/components/RoundedInput.vue";
import SubSection from "@/components/SubSection.vue";
import RecipeImageSorter from "@/components/RecipeImageSorter.vue";
import RecipeLabelListEdit from "@/components/RecipeLabelListEdit.vue";
import RecipeIngredientListEdit from "@/components/RecipeIngredientListEdit.vue";
import ValidatingForm from "@/components/ValidatingForm.vue";
import {
  RecipeEditData,
  Unit,
  IngredientCategory,
  RecipeLabel,
} from "../types/recipeDbTypes";
import { reactive } from "vue";

const props = defineProps<{
  recipeData: RecipeEditData;
  unitList: Unit[];
  ingredientCategoryList: IngredientCategory[];
  allLabels: RecipeLabel[];
}>();
const emit = defineEmits(["update:recipeData", "editFinished"]);

const _recipeData = reactive(props.recipeData);

function finishEdit(saveChanges: boolean) {
  if (saveChanges) {
    emit("update:recipeData", _recipeData);
  }
  emit("editFinished", saveChanges);
}
</script>
