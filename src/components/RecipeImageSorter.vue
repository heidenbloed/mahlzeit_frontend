<template>
  <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 auto-rows-fr gap-1">
    <draggable 
      v-model="sortedImages"
      item-key="id"
      direction="horizontal"
      tag="transition-group"
      fallbackTolerance=3
      delay=200
      chosenClass="border-2"
      @choose="drag=true"
      @end="drag=false"
    >
      <template #item="{element}">
        <div class="w-full rounded-xl overflow-hidden relative cursor-grab border-red-500">
          <img
            :src="element.url"
            :alt="'Foto ' + element.id"
            class="aspect-square overflow-hidden object-cover"
            @contextmenu.prevent
          />
          <div
            v-show="!drag"
            class="absolute right-0 top-0 bg-white/70 rounded-bl-xl"
          >
            <RoundedButton
              type="flat"
            >
              <template #icon>remove_circle_outline</template>
            </RoundedButton>
          </div>
        </div>
      </template>

      <template #footer>
        <RoundedButton
          class="w-full min-h-full"
          type="raised"
        >
          <template #icon>add_circle_outline</template>
        </RoundedButton>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import RoundedButton from "@/components/RoundedButton.vue"
import draggable from 'vuedraggable';
import { ref } from "vue";

interface RecipeImage {
  id: number;
  url: String;
  order: number;
};

const props = defineProps<{
  images: [RecipeImage]
}>();

const drag = ref(false);

const sortedImages = ref([...props.images].sort((elemA, elemB) => {return elemA.order - elemB.order }));
</script>