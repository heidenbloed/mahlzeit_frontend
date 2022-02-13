<template>
  <RoundedCard>
    <div class="flex">
      <button
        @click="$router.push('/recipe/')"
        class="w-1/4 overflow-hidden rounded-l-xl md:w-1/3"
      >
        <img
          :src="imageUrl"
          alt="recipe image"
          class="h-full object-cover object-center"
        />
      </button>
      <div class="inline-block w-3/4 overflow-hidden p-2 md:w-2/3 md:p-4">
        <h1 class="truncate text-xl font-semibold text-gray-700 md:text-2xl">
          {{ recipeName }}
        </h1>
        <ServingsSlider v-model="numServings" />
        <div class="flex justify-end">
          <RoundedButton type="flat">
            <template v-slot:icon>remove_shopping_cart</template>
            <template v-slot:default>Entfernen</template>
          </RoundedButton>
        </div>
      </div>
    </div>
  </RoundedCard>
</template>

<script setup lang="ts">
import RoundedCard from "@/components/RoundedCard.vue";
import ServingsSlider from "@/components/ServingsSlider.vue";
import RoundedButton from "@/components/RoundedButton.vue";
import { ref, watchEffect } from "vue";

const props = defineProps<{
  recipeName: string;
  imageUrl: string;
  defaultNumServings: number;
}>();
const emit = defineEmits(["update:modelValue"]);

const numServings = ref(props.defaultNumServings);
watchEffect(() => emit("update:modelValue", numServings.value));
</script>
