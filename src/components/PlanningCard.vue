<template>
  <RoundedCard class="flex">
    <div class="w-24 md:w-40 rounded-xl overflow-hidden">
      <img :src="imageUrl" alt="recipe image" class="h-full object-cover object-center">
    </div>
    <div class="p-4 grow">
      <h1 class="font-semibold tracking-tight text-2xl text-gray-700">
        <slot></slot>
      </h1>
      <ServingsSlider
        :defaultNumServings="defaultNumServings"
        v-model="numServings"
      />
      <div class="flex gap-2">
        <IconButton type="primary">
          remove_shopping_cart
        </IconButton>
        <IconButton type="secondary" @click="$router.push('/recipe/')">
          info
        </IconButton>
      </div>
    </div>
  </RoundedCard>
</template>

<script setup lang="ts">
import RoundedCard from "@/components/RoundedCard.vue";
import ServingsSlider from "@/components/ServingsSlider.vue";
import IconButton from "@/components/IconButton.vue";
import { ref, watchEffect } from "vue";

const props = defineProps<{
  imageUrl: string,
  defaultNumServings: number
}>();
const emit = defineEmits(["update:modelValue"]);

const numServings = ref(props.defaultNumServings);
watchEffect(() => emit("update:modelValue", numServings.value));
</script>