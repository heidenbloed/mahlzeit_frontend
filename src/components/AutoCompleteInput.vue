<template>
  <div
    tabindex="0"
    class="bg-stone-200 focus-within:ring-2 ring-red-500 px-0 relative"
    :class="dynamicInputContainerClasses"
    ref="inputContainer"
    @focusin="focusInside = true"
    @focusout="handleFocusOutEvent"
  >
    <RoundedInput
      v-model="internalModelValue"
      :inputType="inputType"
      class="static"
      noRing
      :clearable="clearable"
    >
      <template #before>
        <slot name="beforeInput"></slot>
      </template>
    </RoundedInput>

    <ul
      v-show="showAutoCompleteList"
      class="w-full bg-stone-200  ring-2 ring-red-500 p-2 grid grid-cols-1items-center gap-2 absolute z-30 top-auto"
      :class="openListUpwards ? 'bottom-full rounded-t-xl' : 'rounded-b-xl'"
    >
      <li v-for="autoCompleteOption in autoCompleteList" class="items-center">
        <button
          class="w-full h-full text-left break-words"
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
    </ul>
  </div>
</template>

<script setup lang="ts">
import RoundedInput from "@/components/RoundedInput.vue"
import { ref, watchEffect, PropType, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
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
const openListUpwards = ref(true);
const inputContainer = ref<HTMLDivElement>();
const focusInside = ref(false);

const dynamicInputContainerClasses = computed(() => {
  if (showAutoCompleteList.value) {
    if (openListUpwards.value) {
      return "rounded-b-xl";
    } else {
      return "rounded-t-xl";
    }
  } else {
    return "rounded-xl";
  }
});

watchEffect(() => {
  if(internalModelValue.value?.length > 0 && focusInside.value && props.autoCompleteList.length > 0){
    showAutoCompleteList.value = true;
  } else {
    showAutoCompleteList.value = false;
  }
});
watchEffect(() => {
  internalModelValue.value = props.modelValue.toString();
});
watchEffect(() => {
  emit("update:modelValue", internalModelValue.value);
});
watchEffect(() => {
  if (showAutoCompleteList.value && inputContainer.value !== undefined) {
    const topOffset = inputContainer.value.offsetTop - window.scrollY;
    openListUpwards.value = topOffset > window.screen.height / 2;
  }
});

function onAutoCompleteOptionSelected(autoCompleteOption: String){
  showAutoCompleteList.value = false;
  emit("onAutoCompleteOptionSelected", autoCompleteOption);
};
function handleFocusOutEvent(event: FocusEvent){
  if(!(event.relatedTarget instanceof Node) || !(inputContainer.value?.contains(event.relatedTarget))) {
    focusInside.value = false;
  }
};
</script>