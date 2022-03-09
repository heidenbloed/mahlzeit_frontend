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

  <RoundedDropdown :showDropdown="showAutoCompleteList">
    <template #input>
      <RoundedInput
        v-model="_modelValue"
        :inputType="inputType"
        :label="label"
        :clearable="clearable"
        class="h-full"
        noRing
        @input="showAutoCompleteList = autoCompleteList.length > 0"
        @keyup="hideAutoCompleteOnEnter"
      >
        <template #before>
          <slot name="beforeInput"></slot>
        </template>
      </RoundedInput>
    </template>

    <template #dropdown>
      <li v-for="autoCompleteOption in autoCompleteList" class="items-center">
        <button
          class="h-10 w-full break-words text-left"
          @click="onAutoCompleteOptionSelected(autoCompleteOption)"
        >
          <slot name="autoCompleteOption" :option="autoCompleteOption">
            <span>{{ autoCompleteOption }}</span>
          </slot>
        </button>
      </li>
    </template>
  </RoundedDropdown>
</template>

<script setup lang="ts">
import RoundedInput from "@/components/RoundedInput.vue";
import RoundedDropdown from "@/components/RoundedDropdown.vue";
import { ref, watchEffect, PropType } from "vue";

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
    required: true,
  },
});
const emit = defineEmits(["update:modelValue", "onAutoCompleteOptionSelected"]);

const _modelValue = ref<string>("");
const showAutoCompleteList = ref(false);

watchEffect(() => {
  _modelValue.value = props.modelValue.toString();
});
watchEffect(() => {
  emit("update:modelValue", _modelValue.value);
});

function onAutoCompleteOptionSelected(autoCompleteOption: String) {
  showAutoCompleteList.value = false;
  emit("onAutoCompleteOptionSelected", autoCompleteOption);
}
function hideAutoCompleteOnEnter(event: KeyboardEvent) {
  if (event.key == "Enter") {
    showAutoCompleteList.value = false;
  }
}
</script>
