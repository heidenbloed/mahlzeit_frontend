<template>
  <Listbox v-model="_modelValue" v-slot="{ open }">
    <RoundedDropdown :showDropdown="open">
      <template #input>
        <ListboxButton class="flex w-full flex-row items-center gap-2 p-2">
          <div class="flex grow flex-col">
            <ListboxLabel
              v-if="label.length > 0"
              class="text-sm text-stone-500"
            >
              {{ label }}
            </ListboxLabel>
            <span>
              <slot name="selected" :modelValue="_modelValue">
                {{ _modelValue }}
              </slot>
            </span>
          </div>

          <span class="icon-md">keyboard_arrow_down</span>
        </ListboxButton>
      </template>

      <template #dropdown>
        <ListboxOptions static>
          <div class="flex flex-col">
            <ListboxOption
              as="template"
              v-slot="{ selected }"
              v-for="option in options"
              :key="option.id"
              :value="option"
            >
              <li class="flex flex-row items-center gap-2">
                <span
                  class="icon-md"
                  :class="
                    _modelValue.id === option.id ? 'visible' : 'invisible'
                  "
                >
                  check
                </span>
                <button class="h-10 grow">
                  <slot name="option" :option="option">
                    {{ option }}
                  </slot>
                </button>
              </li>
            </ListboxOption>
          </div>
        </ListboxOptions>
      </template>
    </RoundedDropdown>
  </Listbox>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  ListboxLabel,
} from "@headlessui/vue";
import RoundedDropdown from "@/components/RoundedDropdown.vue";
import { ref, watchEffect, PropType } from "vue";

interface SelectOption {
  id: number;
}

const props = defineProps({
  modelValue: {
    type: Object as PropType<SelectOption>,
    required: true,
  },
  options: {
    type: Array as PropType<SelectOption[]>,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);

const _modelValue = ref<SelectOption>(props.modelValue);

watchEffect(() => {
  _modelValue.value = props.modelValue;
});
watchEffect(() => {
  emit("update:modelValue", _modelValue.value);
});
</script>
