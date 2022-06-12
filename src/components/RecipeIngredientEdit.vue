<template>
  <div class="flex flex-col gap-2 rounded-xl border-2 border-stone-400 p-2">
    <!-- <pre class="text-xs">{{ currentRecipeIngredient }}</pre> -->

    <div class="flex flex-row flex-wrap gap-2 md:flex-nowrap">
      <RoundedInput
        :name="'quantity' + ingredientIdx.toString()"
        v-model.number="currentIngredient.quantity"
        rules="required|number|positive"
        inputType="number"
        label="Menge"
        class="grow basis-1/4"
        clearable
      />

      <RoundedSelect
        v-model="currentIngredient.unit"
        :options="unitList"
        label="Einheit"
        class="grow basis-1/4"
      >
        <template #selected>
          {{ currentIngredient.unit.short_form }}
        </template>
        <template #option="{ option }">
          {{ option.short_form }}
        </template>
      </RoundedSelect>

      <AutoCompleteInput
        :name="'ingredientName' + ingredientIdx.toString()"
        v-model="currentIngredient.ingredientName"
        rules="required"
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
      v-model="currentIngredient.ingredientCategory"
      :options="ingredientCategoryList"
      label="Kategorie"
    >
      <template #selected>
        {{ currentIngredient.ingredientCategory.name }}
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
            :name="'currentConversionFactor' + ingredientIdx.toString()"
            v-model.number="currentIngredient.currentConversionFactor"
            rules="required|number|positive"
            inputType="number"
            class="grow basis-1/2"
          >
            <template #after>
              <span>{{ currentIngredient.unit.short_form }}</span>
            </template>
          </RoundedInput>

          <span class="icon-md">sync_alt</span>
          <RoundedInput
            :name="'defaultConversionFactor' + ingredientIdx.toString()"
            v-model.number="currentIngredient.defaultConversionFactor"
            rules="required|number|positive"
            inputType="number"
            class="grow basis-1/2"
          >
            <template #after>
              <span>{{ currentIngredient.defaultUnit?.short_form }}</span>
            </template>
          </RoundedInput>
        </div>
      </div>

      <label for="defaultUnit" class="flex flex-row gap-2">
        <input
          v-model="currentIngredient.setAsDefaultUnit"
          id="defaultUnit"
          type="checkbox"
          class="h-5 w-5 rounded text-red-500 focus:ring-red-500"
        />
        <div>
          <span class="italic">
            {{ currentIngredient.unit.short_form }}
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
  UnitConversion,
} from "../types/recipeDbTypes";
import { reactive, watchEffect, computed, ref, onMounted } from "vue";

const props = defineProps<{
  modelValue: QuantifiedIngredientEditData;
  unitList: Unit[];
  ingredientCategoryList: IngredientCategory[];
  ingredientIdx: number;
}>();
const emit = defineEmits(["update:modelValue"]);

const currentIngredient = reactive(props.modelValue);
const ingredientAutoCompleteList = ref<IngredientShort[]>([]);
const ingredientUnitConversions = ref<null | UnitConversion[]>(null);

watchEffect(() => {
  emit("update:modelValue", currentIngredient);
});
watchEffect(async () => {
  if (currentIngredient.ingredientName.length >= 1) {
    ingredientAutoCompleteList.value = await getIngredientList(
      IngredientListOrdering.nameAscending,
      currentIngredient.ingredientName
    );
  } else {
    ingredientAutoCompleteList.value = [];
  }
});
async function onIngredientChange() {
  currentIngredient.ingredientName = currentIngredient.ingredientName.trim();
  const possibleIngredients = await getIngredientList(
    IngredientListOrdering.nameAscending,
    currentIngredient.ingredientName
  );
  const selectedIngredient = possibleIngredients.find(
    (ingredient) =>
      ingredient.name.toLowerCase() ===
      currentIngredient.ingredientName.toLowerCase()
  );
  if (selectedIngredient) {
    selectIngredientFromAutoCompleteList(selectedIngredient);
  } else {
    currentIngredient.ingredientId = null;
    currentIngredient.defaultUnit = null;
    currentIngredient.currentConversionFactor = 1.0;
    currentIngredient.defaultConversionFactor = 1.0;
    currentIngredient.setAsDefaultUnit = false;
    ingredientUnitConversions.value = null;
  }
}
async function selectIngredientFromAutoCompleteList(
  selectedIngredient: IngredientShort
) {
  const selectedIngredientDetails = await getIngredientDetail(
    selectedIngredient.id
  );
  currentIngredient.ingredientId = selectedIngredient.id;
  currentIngredient.ingredientName = selectedIngredient.name;
  currentIngredient.ingredientCategory = selectedIngredientDetails.category;
  currentIngredient.defaultUnit = selectedIngredientDetails.default_unit;
  currentIngredient.setAsDefaultUnit = false;
  ingredientUnitConversions.value = selectedIngredientDetails.unit_conversions;
}
watchEffect(() => {
  if (ingredientUnitConversions.value !== null) {
    const unitConversion = ingredientUnitConversions.value.find(
      (unitConversion) =>
        unitConversion.alternative_unit.id === currentIngredient.unit.id
    );
    if (unitConversion) {
      currentIngredient.currentConversionFactor =
        unitConversion.alternative_conversion_factor;
      currentIngredient.defaultConversionFactor =
        unitConversion.default_conversion_factor;
    } else {
      currentIngredient.currentConversionFactor = 1.0;
      currentIngredient.defaultConversionFactor = 1.0;
    }
  }
});
onMounted(onIngredientChange);

const showUnitConvForm = computed(() => {
  if (currentIngredient.defaultUnit !== null) {
    return currentIngredient.unit.id !== currentIngredient.defaultUnit.id;
  } else {
    return false;
  }
});
</script>
