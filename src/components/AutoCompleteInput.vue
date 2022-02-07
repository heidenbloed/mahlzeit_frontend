<template>
  <!-- <transition
    enterFromClass="opacity-0"
    leaveToClass="opacity-0"
  >
    <div
      v-show="showAutoCompleteList"
      class="fixed inset-0 bg-black opacity-30 z-20 transition-opacity duration-300"
    />
  </transition> -->

  <RoundedDropdown
    v-model:showDropdown="showAutoCompleteList"
  >
    <template #input>
      <RoundedInput
        v-model="internalModelValue"
        :inputType="inputType"
        :label="label"
        :clearable="clearable"
        class="h-full"
        noRing
      >
        <template #before>
          <slot name="beforeInput"></slot>
        </template>
      </RoundedInput>
    </template>

    <template #dropdown>
      <li
        v-for="autoCompleteOption in autoCompleteList" class="items-center"
      >
        <button
          class="w-full h-10 text-left break-words"
          @click="onAutoCompleteOptionSelected(autoCompleteOption)"
        >
          <slot
            name="autoCompleteOption"
            :option="autoCompleteOption"
          >
            <span>{{autoCompleteOption}}</span>
          </slot>
        </button>
      </li>
    </template>
  </RoundedDropdown>
</template>

<script setup lang="ts">
import RoundedInput from "@/components/RoundedInput.vue"
import RoundedDropdown from "@/components/RoundedDropdown.vue";
import { ref, watchEffect, PropType, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  inputType: {
    type: String,
    default: "text",
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  autoCompleteList: {
    type: Array as PropType<string[]>,
    required: true
  }
});
const emit = defineEmits(["update:modelValue", "onAutoCompleteOptionSelected"]);

const internalModelValue = ref<string>("");
const showAutoCompleteList = ref(false);

watchEffect(() => {
  showAutoCompleteList.value = internalModelValue.value?.length > 0 && props.autoCompleteList.length > 0;
});
watchEffect(() => {
  internalModelValue.value = props.modelValue.toString();
});
watchEffect(() => {
  emit("update:modelValue", internalModelValue.value);
});

function onAutoCompleteOptionSelected(autoCompleteOption: String){
  showAutoCompleteList.value = false;
  emit("onAutoCompleteOptionSelected", autoCompleteOption);
};
</script>