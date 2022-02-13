<template>
  <div class="mb-2 flex flex-col gap-2">
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
          {{ ingredient.quantity }} {{ ingredient.currentUnit.name }}
          {{ ingredient.name }}
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
import { reactive, watchEffect, ref } from "vue";

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

const props = defineProps<{
  modelValue: RecipeIngredient[];
}>();
const emit = defineEmits(["update:modelValue"]);

const ingredientList = reactive(props.modelValue);
const ingredientEdit = reactive(
  props.modelValue.reduce((map, ingredient) => {
    map.set(ingredient.id, false);
    return map;
  }, new Map())
);

function addNewEmptyIngredient() {
  ingredientList.push({
    id: -1,
    name: "",
    quantity: 1,
    currentUnit: { id: 0, name: "Stk." },
    defaultUnit: { id: 0, name: "Stk." },
    unitConvCurrent: 1,
    unitConvDefault: 1,
    setCurrentUnitAsDefault: true,
    category: { id: 0, name: "Tiefkühlwaren" },
  });
  ingredientEdit.set(-1, true);
}

watchEffect(() => {
  emit("update:modelValue", ingredientList.values);
});
</script>
