<template>
  <!-- <pre class="max-w-sm text-xs">{{ sortedImages }}</pre>
  <pre class="max-w-sm text-xs">drag = {{ drag }}</pre> -->
  <draggable
    v-model="sortedImages"
    item-key="id"
    direction="horizontal"
    tag="div"
    class="grid auto-rows-fr grid-cols-3 gap-1 md:grid-cols-4 lg:grid-cols-5"
    fallbackTolerance="3"
    :delay="isTouchDevice() ? 200 : 10"
    chosenClass="border-2"
    handle=".handle"
    @choose="drag = true"
    @unchoose="drag = false"
    @change="orderChanged"
  >
    <template #item="{ element }">
      <div
        class="relative w-full cursor-grab overflow-hidden rounded-xl border-red-500"
        :key="element.order"
      >
        <img
          :src="element.image"
          class="handle aspect-square overflow-hidden object-cover"
          @contextmenu.prevent
        />
        <div
          v-show="!drag"
          class="absolute right-0 top-0 rounded-bl-xl bg-white/70"
        >
          <RoundedButton type="flat" @click="removeImage(element)">
            <template #icon>remove_circle_outline</template>
          </RoundedButton>
        </div>
      </div>
    </template>

    <template #footer>
      <label
        style="--aspect-ratio: 1/1"
        class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg border-2 border-red-500 bg-white p-2 text-red-500"
        for="file-upload"
      >
        <span class="icon-md"> add_circle_outline </span>
      </label>
      <input
        class="hidden"
        id="file-upload"
        type="file"
        accept="image/*"
        @change="addImage"
      />
    </template>
  </draggable>
</template>

<script setup lang="ts">
import RoundedButton from "@/components/RoundedButton.vue";
import draggable from "vuedraggable";
import { RecipeImageEditData } from "../types/recipeDbTypes";
import { ref, watchEffect } from "vue";

const props = defineProps<{
  modelValue: RecipeImageEditData[];
}>();
const emit = defineEmits(["update:modelValue"]);

const drag = ref(false);
const sortedImages = ref(
  [...props.modelValue].sort((elemA, elemB) => {
    return elemA.order - elemB.order;
  })
);
watchEffect(() => {
  emit("update:modelValue", sortedImages.value);
});

function orderChanged() {
  for (const imageIdx of Array(sortedImages.value.length).keys()) {
    sortedImages.value[imageIdx].order = imageIdx;
  }
}
function removeImage(image: RecipeImageEditData) {
  const imageIdx = sortedImages.value.indexOf(image);
  sortedImages.value.splice(imageIdx, 1);
}
function addImage(event: Event) {
  if (event && event.target) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const imageFile = input.files[0];
      if (imageFile && imageFile["type"].split("/")[0] === "image") {
        const imageUrl = URL.createObjectURL(imageFile);
        sortedImages.value.push({
          id: -1,
          image: imageUrl,
          order: sortedImages.value.length,
          data: imageFile,
        });
      }
      //Todo: warn when the file is not an image file
    }
  }
}

function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
</script>

<style>
.grid > [style^="--aspect-ratio"]::before {
  content: "";
  display: inline-block;
  width: 1px;
  height: 0;
  padding-bottom: calc(100% / (var(--aspect-ratio)));
}
</style>
