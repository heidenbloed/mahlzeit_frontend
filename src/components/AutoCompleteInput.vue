<template>
  <div>
    <RoundedDropdown :showDropdown="showAutoCompleteList">
      <template #input>
        <RoundedInput
          v-model="_modelValue"
          :inputType="inputType"
          :label="label"
          :clearable="clearable"
          :name="name"
          :rules="rules"
          noRing
          :errorMsgContainerId="errorMsgContainerId"
          @input="showAutoCompleteList = autoCompleteList.length > 0"
          @keyup.enter="showAutoCompleteList = false"
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
            type="button"
          >
            <slot name="autoCompleteOption" :option="autoCompleteOption">
              <span>{{ autoCompleteOption }}</span>
            </slot>
          </button>
        </li>
      </template>
    </RoundedDropdown>
    <div :id="errMsgDivId"></div>
  </div>
</template>

<script setup lang="ts">
import RoundedInput from "@/components/RoundedInput.vue";
import RoundedDropdown from "@/components/RoundedDropdown.vue";
import { onMounted, ref, watch, computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  rules: {
    type: String,
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
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue", "onAutoCompleteOptionSelected"]);

const _modelValue = ref<string>(props.modelValue.toString());
const showAutoCompleteList = ref(false);

watch(_modelValue, (newVal, prevVal) => {
  emit("update:modelValue", newVal);
});
watch(
  () => props.modelValue,
  (newVal, prevVal) => {
    const propModelValue = newVal.toString();
    if (_modelValue.value != propModelValue) {
      _modelValue.value = propModelValue;
    }
  }
);

function onAutoCompleteOptionSelected(autoCompleteOption: any) {
  showAutoCompleteList.value = false;
  emit("onAutoCompleteOptionSelected", autoCompleteOption);
}

const errMsgDivId = computed<string>(() => props.name + "ErrMsg");
const errorMsgContainerId = ref<string | null>(null);
onMounted(() => {
  errorMsgContainerId.value = "#" + errMsgDivId.value;
});
</script>
