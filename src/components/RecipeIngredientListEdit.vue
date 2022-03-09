<template>
  <div class="mb-2 flex flex-col gap-2">
    <ServingsSlider v-model="_numServings" />

    <div
      v-for="(ingredient, ingredientIdx) in ingredientList"
      class="flex flex-row gap-2"
    >
      <button
        v-if="!ingredientEdit.get(ingredient.id)"
        class="flex grow items-center gap-1 rounded-xl bg-stone-200 p-2 align-middle"
        @click="ingredientEdit.set(ingredient.id, true)"
      >
        <span class="grow">
          {{ ingredient.quantity }} {{ ingredient.unit.short_form }}
          {{ ingredient.ingredientName }}
        </span>
        <span class="icon-md">edit</span>
      </button>

      <RecipeIngredientEdit
        v-else
        v-model="ingredientList[ingredientIdx]"
        class="grow"
      />

      <div class="min-h-full">
        <button
          class="flex h-full w-10 items-center justify-center rounded-xl bg-stone-200"
          @click="ingredientList.splice(ingredientIdx, 1)"
        >
          <span class="icon-md">delete</span>
        </button>
      </div>
    </div>

    <button
      class="flex items-center justify-center gap-1 rounded-xl bg-stone-200 p-2 align-middle"
      @click="addNewEmptyIngredient"
    >
      <span class="icon-md">add_circle_outline</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import RecipeIngredientEdit from "@/components/RecipeIngredientEdit.vue";
import ServingsSlider from "@/components/ServingsSlider.vue";
import { QuantifiedIngredientEditData } from "../types/recipeDbTypes";
import { reactive, watchEffect, ref } from "vue";

const props = defineProps<{
  modelValue: QuantifiedIngredientEditData[];
  numServings: number;
}>();
const emit = defineEmits(["update:modelValue", "update:numServings"]);

const ingredientList = reactive(props.modelValue);
const ingredientEdit = reactive(
  props.modelValue.reduce((map, ingredient) => {
    map.set(ingredient.id, false);
    return map;
  }, new Map())
);
const _numServings = ref(props.numServings);

function addNewEmptyIngredient() {
  ingredientList.push({
    id: -1,
    ingredientName: "",
    quantity: 1,
    unit: { id: 0, short_form: "Stk." },
    defaultUnit: { id: 0, short_form: "Stk." },
    currentConversionFactor: 1,
    defaultConversionFactor: 1,
    setAsDefaultUnit: true,
    ingredientCategory: { id: 0, name: "Tiefkühlwaren", location_index: 0 },
  });
  ingredientEdit.set(-1, true);
}

watchEffect(() => {
  emit("update:modelValue", ingredientList.values);
});
watchEffect(() => {
  emit("update:numServings", _numServings.value);
});
</script>
