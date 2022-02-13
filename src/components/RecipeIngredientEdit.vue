<template>
  <div class="flex flex-col gap-2 rounded-xl border-2 border-stone-400 p-2">
    <div class="flex flex-row flex-wrap gap-2 md:flex-nowrap">
      <RoundedInput
        v-model.number="currentRecipeIngredient.quantity"
        inputType="number"
        label="Menge"
        class="grow basis-1/4"
        clearable
      />

      <RoundedSelect
        v-model="currentRecipeIngredient.currentUnit"
        :options="[
          { id: 0, name: 'Stk' },
          { id: 3, name: 'g' },
          { id: 4, name: 'TL' },
        ]"
        label="Einheit"
        class="grow basis-1/4"
      >
      </RoundedSelect>

      <AutoCompleteInput
        v-model="currentRecipeIngredient.name"
        :autoCompleteList="[
          currentRecipeIngredient.name,
          currentRecipeIngredient.name,
        ]"
        label="Zutat"
        class="grow basis-3/4"
        clearable
      >
      </AutoCompleteInput>
    </div>

    <RoundedSelect
      v-model="currentRecipeIngredient.category"
      :options="[
        { id: 0, name: 'Kühlwaren' },
        { id: 1, name: 'Gemüse' },
        { id: 2, name: 'Obst' },
        { id: 3, name: 'Backwaren' },
        { id: 4, name: 'Getränke' },
        { id: 5, name: 'TK-Waren' },
        { id: 6, name: 'Fleisch' },
        { id: 7, name: 'Süßigkeiten' },
        { id: 8, name: 'Bla' },
        { id: 9, name: 'Bla' },
        { id: 10, name: 'Bla' },
        { id: 11, name: 'Bla' },
        { id: 12, name: 'Bla' },
      ]"
      label="Kategorie"
    >
    </RoundedSelect>

    <template v-if="showUnitConvForm">
      <div class="flex flex-col">
        <div class="text-sm text-stone-500">Einheitenumrechnung</div>
        <div class="flex flex-row items-center gap-2">
          <RoundedInput
            v-model.number="currentRecipeIngredient.unitConvCurrent"
            inputType="number"
            class="grow basis-1/2"
          >
            <template #after>
              <span>{{ currentRecipeIngredient.currentUnit.name }}</span>
            </template>
          </RoundedInput>

          <span class="icon-md">sync_alt</span>
          <RoundedInput
            v-model.number="currentRecipeIngredient.unitConvDefault"
            inputType="number"
            class="grow basis-1/2"
          >
            <template #after>
              <span>{{ currentRecipeIngredient.defaultUnit.name }}</span>
            </template>
          </RoundedInput>
        </div>
      </div>

      <label for="defaultUnit" class="flex flex-row gap-2">
        <input
          v-model="currentRecipeIngredient.setCurrentUnitAsDefault"
          id="defaultUnit"
          type="checkbox"
          class="h-5 w-5 rounded text-red-500 focus:ring-red-500"
        />
        <div>
          <span class="italic">
            {{ currentRecipeIngredient.currentUnit.name }}
          </span>
          <span> ist die Standardeinheit </span>
        </div>
      </label>
    </template>
  </div>
</template>

<script setup lang="ts">
import AutoCompleteInput from "@/components/AutoCompleteInput.vue";
import RoundedInput from "@/components/RoundedInput.vue";
import RoundedSelect from "@/components/RoundedSelect.vue";
import { reactive, watchEffect, computed } from "vue";

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
  modelValue: RecipeIngredient;
}>();
const emit = defineEmits(["update:modelValue"]);

const currentRecipeIngredient = reactive(props.modelValue);
const showUnitConvForm = computed(
  () =>
    currentRecipeIngredient.currentUnit.id !==
    currentRecipeIngredient.defaultUnit.id
);

watchEffect(() => {
  emit("update:modelValue", currentRecipeIngredient);
});
</script>
