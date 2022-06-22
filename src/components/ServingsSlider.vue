<template>
  <div class="my-2 flex w-full items-center gap-4 md:w-auto">
    <span class="icon-md">people</span>
    <span class="block w-4 md:hidden">{{ _modelValue }}</span>
    <input
      type="range"
      v-model.number="_modelValue"
      min="1"
      max="15"
      class="block grow accent-red-500 md:hidden"
    />
    <RoundedInput
      inputType="number"
      class="hidden w-20 md:block"
      v-model.number="_modelValue"
      name="servingSlider"
      rules="required|number|positive|integer"
    />
  </div>
</template>

<script setup lang="ts">
import RoundedInput from "@/components/RoundedInput.vue";
import { ref, watchEffect } from "vue";

const props = defineProps<{
  modelValue: number;
}>();
const emit = defineEmits(["update:modelValue"]);

const _modelValue = ref(props.modelValue);
watchEffect(() => {
  _modelValue.value = props.modelValue;
});
watchEffect(() => emit("update:modelValue", _modelValue.value));
</script>
