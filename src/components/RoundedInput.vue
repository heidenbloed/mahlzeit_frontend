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
          v-if="inputType !== 'textarea'"
          :type="inputType"
          :autocomplete="autocompleteHint || undefined"
          class="w-full appearance-none border-0 bg-transparent p-0 align-middle focus:ring-0"
          ref="inputElement"
          @input="onInput"
          @blur="onBlur"
          @change="onChange"
          step="any"
        />
        <textarea
          v-else
          :autocomplete="autocompleteHint || undefined"
          class="w-full resize-none appearance-none border-0 bg-transparent p-0 align-middle focus:ring-0"
          v-model="modelValue"
          ref="inputElement"
          @blur="onBlur"
          @change="onChange"
        >
        </textarea>
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
import { ref, computed, watch, onMounted, Ref } from "vue";
import { useField } from "vee-validate";
import { useTextareaAutosize } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    name: string;
    label?: string;
    inputType?: string;
    rules?: string;
    clearable?: boolean;
    noRing?: boolean;
    errorMsgContainerId?: string;
    autocompleteHint?: string;
  }>(),
  {
    label: "",
    inputType: "text",
    clearable: false,
    noRing: false,
    autocompleteHint: "",
  }
);

const emit = defineEmits(["update:modelValue"]);

const inputElement = ref<HTMLInputElement | HTMLTextAreaElement>();
const inputContainer = ref<HTMLDivElement>();
const {
  errorMessage,
  value: _modelValue,
  resetField,
  handleBlur: onBlur,
  handleChange: onChange,
} = useField<string>(props.name, props.rules, {
  initialValue: props.modelValue.toString(),
  validateOnMount: false,
  validateOnValueUpdate: false,
});
if (props.inputType === "textarea") {
  useTextareaAutosize({
    element: inputElement as Ref<HTMLTextAreaElement | undefined>,
    input: _modelValue,
  });
}

onMounted(() => {
  if (inputElement.value) {
    inputElement.value.value = _modelValue.value;
  }
});

watch(_modelValue, (newVal, prevVal) => {
  if (inputElement.value) {
    inputElement.value.value = newVal;
  }
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
function onInput() {
  if (inputElement.value) {
    _modelValue.value = inputElement.value.value;
  }
  scrollIntoView();
}

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
