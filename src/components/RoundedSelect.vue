<template>
  <Listbox v-model="internalModelValue" v-slot="{ open }">
    <RoundedDropdown :showDropdown="open">
      <template #input>
        <ListboxButton class="w-full flex flex-row items-center gap-2 p-2">
          <div class="flex flex-col grow">
            <ListboxLabel
              v-if="label.length > 0"
              class="text-stone-500 text-sm"
            >
              {{label}}
            </ListboxLabel>
            <span>{{ internalModelValue.name }}</span>
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
              <li class="flex flex-row gap-2 items-center">
                <span class="icon-md" :class="selected ? 'visible' : 'invisible'">
                  check
                </span>
                <button class="h-10">
                  {{ option.name }}
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
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, ListboxLabel } from '@headlessui/vue';
import RoundedDropdown from '@/components/RoundedDropdown.vue';
import { ref, watchEffect, PropType } from "vue";

interface SelectOption{
  id: number;
  name: string;
}

const props = defineProps({
  modelValue: {
    type: Object as PropType<SelectOption>,
    required: true
  },
  options: {
    type: Array as PropType<SelectOption[]>,
    required: true
  },
  label: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(['update:modelValue'])

const internalModelValue = ref<SelectOption>(props.modelValue);

watchEffect(() => {
  internalModelValue.value = props.modelValue;
});
watchEffect(() => {
  emit('update:modelValue', internalModelValue.value);
});
</script>