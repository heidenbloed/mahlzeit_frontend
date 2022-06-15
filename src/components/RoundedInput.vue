<template>
  <div>
    <div
      class="flex items-center gap-2 rounded-xl border-0 bg-stone-200 py-0 px-2 ring-red-500"
      :class="outerDivClasses"
      ref="inputContainer"
    >
      <slot name="before"></slot>
      <div class="relative grow py-2" @click="focusInput">
        <div v-if="label.length > 0" class="text-sm text-stone-500">
          {{ label }}
        </div>
        <input
          :type="inputType"
          class="w-full appearance-none border-0 bg-transparent p-0 align-middle focus:ring-0"
          v-model="_modelValue"
          ref="inputElement"
          @blur="handleBlur"
          @change="handleChange"
          @input="scrollIntoView"
          step="any"
        />
      </div>
      <button
        type="button"
        v-if="clearable"
        class="icon-md"
        @click="clearInput"
      >
        clear
      </button>
      <slot name="after"></slot>
    </div>
    <Teleport :to="errorMsgContainerId" :disabled="!errorMsgContainerId">
      <div v-if="errorMessage" class="text-sm text-red-500">
        {{ errorMessage }}
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  inputType: {
    type: String,
    default: "text",
  },
  rules: {
    type: String,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  noRing: {
    type: Boolean,
    default: false,
  },
  errorMsgContainerId: {
    type: String,
    default: null,
  },
});
const emit = defineEmits(["update:modelValue"]);

const inputElement = ref<HTMLInputElement>();
const inputContainer = ref<HTMLDivElement>();
const {
  errorMessage,
  value: _modelValue,
  resetField,
  handleBlur,
  handleChange,
} = useField<string>(props.name, props.rules, {
  initialValue: props.modelValue.toString(),
  validateOnMount: false,
  validateOnValueUpdate: false,
});

watch(_modelValue, (newVal, prevVal) => {
  emit("update:modelValue", newVal);
});
watch(
  () => props.modelValue,
  (newVal, prevVal) => {
    const propModelValue = newVal.toString();
    if (_modelValue.value != propModelValue) {
      resetField({ value: propModelValue, touched: false });
    }
  }
);

function scrollIntoView() {
  inputContainer.value?.scrollIntoView({
    block: "nearest",
  });
}
function focusInput() {
  inputElement.value?.focus();
}
function clearInput() {
  resetField({ value: "", touched: true });
  focusInput();
}

const outerDivClasses = computed(() => {
  let classes = "";
  if (errorMessage.value) {
    classes = "bg-red-100";
  } else {
    classes = "bg-stone-200";
  }
  if (!props.noRing) {
    classes += " focus-within:ring-2";
  }
  return classes;
});

defineExpose({ focusInput });
</script>
