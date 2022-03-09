<template>
  <draggable
    v-model="sortedImages"
    item-key="id"
    direction="horizontal"
    tag="div"
    class="grid auto-rows-fr grid-cols-3 gap-1 md:grid-cols-4 lg:grid-cols-5"
    fallbackTolerance="3"
    :delay="isTouchDevice() ? 200 : 10"
    chosenClass="border-2"
    @choose="drag = true"
    @end="drag = false"
  >
    <template #item="{ element }">
      <div
        class="relative w-full cursor-grab overflow-hidden rounded-xl border-red-500"
        :key="element.order"
      >
        <img
          :src="element.image"
          class="aspect-square overflow-hidden object-cover"
          @contextmenu.prevent
        />
        <div
          v-show="!drag"
          class="absolute right-0 top-0 rounded-bl-xl bg-white/70"
        >
          <RoundedButton type="flat">
            <template #icon>remove_circle_outline</template>
          </RoundedButton>
        </div>
      </div>
    </template>

    <template #footer>
      <RoundedButton class="min-h-full w-full" type="raised">
        <template #icon>add_circle_outline</template>
      </RoundedButton>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import RoundedButton from "@/components/RoundedButton.vue";
import draggable from "vuedraggable";
import { RecipeImageEditData } from "../types/recipeDbTypes";
import { ref } from "vue";

const props = defineProps<{
  images: RecipeImageEditData[];
}>();

const drag = ref(false);

const sortedImages = ref(
  [...props.images].sort((elemA, elemB) => {
    return elemA.order - elemB.order;
  })
);

function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
</script>
