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
        v-model="currentRecipeIngredient.unit"
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
        v-model="currentRecipeIngredient.ingredientName"
        :autoCompleteList="[
          currentRecipeIngredient.ingredientName,
          currentRecipeIngredient.ingredientName,
        ]"
        label="Zutat"
        class="grow basis-3/4"
        clearable
      >
      </AutoCompleteInput>
    </div>

    <RoundedSelect
      v-model="currentRecipeIngredient.ingredientCategory"
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
            v-model.number="currentRecipeIngredient.currentConversionFactor"
            inputType="number"
            class="grow basis-1/2"
          >
            <template #after>
              <span>{{ currentRecipeIngredient.unit.name }}</span>
            </template>
          </RoundedInput>

          <span class="icon-md">sync_alt</span>
          <RoundedInput
            v-model.number="currentRecipeIngredient.defaultConversionFactor"
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
          v-model="currentRecipeIngredient.setAsDefaultUnit"
          id="defaultUnit"
          type="checkbox"
          class="h-5 w-5 rounded text-red-500 focus:ring-red-500"
        />
        <div>
          <span class="italic">
            {{ currentRecipeIngredient.unit.name }}
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
import { QuantifiedIngredientEditData } from "../types/recipeDbTypes";
import { reactive, watchEffect, computed } from "vue";

const props = defineProps<{
  modelValue: QuantifiedIngredientEditData;
}>();
const emit = defineEmits(["update:modelValue"]);

const currentRecipeIngredient = reactive(props.modelValue);
const showUnitConvForm = computed(
  () =>
    currentRecipeIngredient.unit.id !== currentRecipeIngredient.defaultUnit.id
);

watchEffect(() => {
  emit("update:modelValue", currentRecipeIngredient);
});
</script>
