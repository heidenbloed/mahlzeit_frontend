<template>
  <RoundedCard>
    <div class="flex">
      <button
        @click="$router.push('/recipe/')"
        class="w-1/4 md:w-1/3 rounded-l-xl overflow-hidden"
      >
        <img :src="imageUrl" alt="recipe image" class="h-full object-cover object-center">
      </button>
      <div class="inline-block p-2 md:p-4 w-3/4 md:w-2/3  overflow-hidden">
        <h1 class="font-semibold text-xl md:text-2xl text-gray-700 truncate">
          {{recipeName}}
        </h1>
        <ServingsSlider
          v-model="numServings"
        />
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
  recipeName: string,
  imageUrl: string,
  defaultNumServings: number,
}>();
const emit = defineEmits(["update:modelValue"]);

const numServings = ref(props.defaultNumServings);
watchEffect(() => emit("update:modelValue", numServings.value));
</script>