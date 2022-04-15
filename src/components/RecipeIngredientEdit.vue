<template>
  <div class="flex flex-col gap-2 rounded-xl border-2 border-stone-400 p-2">
    <!-- <pre class="text-xs">{{ currentRecipeIngredient }}</pre> -->

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
        :options="unitList"
        label="Einheit"
        class="grow basis-1/4"
      >
        <template #selected>
          {{ currentRecipeIngredient.unit.short_form }}
        </template>
        <template #option="{ option }">
          {{ option.short_form }}
        </template>
      </RoundedSelect>

      <AutoCompleteInput
        v-model="currentRecipeIngredient.ingredientName"
        :autoCompleteList="ingredientAutoCompleteList"
        @change="onIngredientChange"
        @onAutoCompleteOptionSelected="selectIngredientFromAutoCompleteList"
        label="Zutat"
        class="grow basis-3/4"
        clearable
      >
        <template #autoCompleteOption="{ option }">
          {{ option.name }}
        </template>
      </AutoCompleteInput>
    </div>

    <RoundedSelect
      v-model="currentRecipeIngredient.ingredientCategory"
      :options="ingredientCategoryList"
      label="Kategorie"
    >
      <template #selected>
        {{ currentRecipeIngredient.ingredientCategory.name }}
      </template>
      <template #option="{ option }">
        {{ option.name }}
      </template>
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
              <span>{{ currentRecipeIngredient.unit.short_form }}</span>
            </template>
          </RoundedInput>

          <span class="icon-md">sync_alt</span>
          <RoundedInput
            v-model.number="currentRecipeIngredient.defaultConversionFactor"
            inputType="number"
            class="grow basis-1/2"
          >
            <template #after>
              <span>{{ currentRecipeIngredient.defaultUnit?.short_form }}</span>
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
            {{ currentRecipeIngredient.unit.short_form }}
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
import {
  getIngredientList,
  IngredientListOrdering,
  getIngredientDetail,
} from "../api/recipeDbApi";
import {
  QuantifiedIngredientEditData,
  Unit,
  IngredientCategory,
  IngredientShort,
  Ingredient,
} from "../types/recipeDbTypes";
import { reactive, watchEffect, computed, ref } from "vue";

const props = defineProps<{
  modelValue: QuantifiedIngredientEditData;
  unitList: Unit[];
  ingredientCategoryList: IngredientCategory[];
}>();
const emit = defineEmits(["update:modelValue"]);

const currentRecipeIngredient = reactive(props.modelValue);
watchEffect(() => {
  emit("update:modelValue", currentRecipeIngredient);
});

const ingredientAutoCompleteList = ref<IngredientShort[]>([]);
watchEffect(async () => {
  if (currentRecipeIngredient.ingredientName.length >= 1) {
    ingredientAutoCompleteList.value = await getIngredientList(
      IngredientListOrdering.nameAscending,
      currentRecipeIngredient.ingredientName
    );
  } else {
    ingredientAutoCompleteList.value = [];
  }
});
async function onIngredientChange() {
  currentRecipeIngredient.ingredientName =
    currentRecipeIngredient.ingredientName.trim();
  const possibleIngredients = await getIngredientList(
    IngredientListOrdering.nameAscending,
    currentRecipeIngredient.ingredientName
  );
  const selectedIngredient = possibleIngredients.find(
    (ingredient) => ingredient.name === currentRecipeIngredient.ingredientName
  );
  if (selectedIngredient) {
    selectIngredientFromAutoCompleteList(selectedIngredient);
  } else {
    currentRecipeIngredient.ingredientId = null;
    currentRecipeIngredient.defaultUnit = null;
    currentRecipeIngredient.currentConversionFactor = 1.0;
    currentRecipeIngredient.defaultConversionFactor = 1.0;
    currentRecipeIngredient.setAsDefaultUnit = false;
  }
}
async function selectIngredientFromAutoCompleteList(
  selectedIngredient: IngredientShort
) {
  // Todo: do not allow the same ingredient twice
  const selectedIngredientDetails = await getIngredientDetail(
    selectedIngredient.id
  );
  currentRecipeIngredient.ingredientId = selectedIngredient.id;
  currentRecipeIngredient.ingredientName = selectedIngredient.name;
  currentRecipeIngredient.ingredientCategory =
    selectedIngredientDetails.category;
  currentRecipeIngredient.defaultUnit = selectedIngredientDetails.default_unit;
  currentRecipeIngredient.setAsDefaultUnit = false;
  const unitConversion = selectedIngredientDetails.unit_conversions.find(
    (unitConversion) =>
      unitConversion.alternative_unit.id === currentRecipeIngredient.unit.id
  );
  if (unitConversion) {
    currentRecipeIngredient.currentConversionFactor =
      unitConversion.alternative_conversion_factor;
    currentRecipeIngredient.defaultConversionFactor =
      unitConversion.default_conversion_factor;
  } else {
    currentRecipeIngredient.currentConversionFactor = 1.0;
    currentRecipeIngredient.defaultConversionFactor = 1.0;
  }
}

const showUnitConvForm = computed(() => {
  if (currentRecipeIngredient.defaultUnit !== null) {
    return (
      currentRecipeIngredient.unit.id !== currentRecipeIngredient.defaultUnit.id
    );
  } else {
    return false;
  }
});
</script>
