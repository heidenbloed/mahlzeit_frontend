<template>
  <swiper
    :modules="swiperModules"
    :slides-per-view="1"
    :space-between="0"
    virtual
    :navigation="{
      prevEl: '.slide-prev-btn',
      nextEl: '.slide-next-btn',
    }"
    :pagination="{
      type: 'fraction',
      renderFraction: renderFraction,
    }"
    slideClass="bg-red-500 h-full"
  >
    <swiper-slide v-for="(image, index) in sortedImages" :virtualIndex="index">
      <img
        :src="image.image"
        class="aspect-[3/2] h-full w-full rounded-none object-cover md:rounded-t-xl"
      />
    </swiper-slide>

    <div
      class="absolute top-0 left-0 z-10 flex h-full flex-col place-content-center"
    >
      <button
        class="slide-prev-btn hidden cursor-pointer rounded-r-xl bg-white/40 p-1 leading-none text-red-500 md:block"
      >
        <span class="icon-2xl"> navigate_before </span>
      </button>
    </div>
    <div
      class="absolute top-0 right-0 z-10 flex h-full flex-col place-content-center"
    >
      <button
        class="slide-next-btn z-10cursor-pointer right-0 hidden rounded-l-xl bg-white/40 p-1 leading-none text-red-500 md:block"
      >
        <span class="icon-2xl"> navigate_next </span>
      </button>
    </div>
  </swiper>
</template>

<script setup lang="ts">
import { RecipeImage } from "../types/recipeDbTypes";
import { computed, PropType } from "vue";
import { Virtual, Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiperModules = [Virtual, Navigation, Pagination, A11y];

const props = defineProps({
  recipeImages: {
    type: Array as PropType<RecipeImage[]>,
    required: true,
  },
});

const sortedImages = computed(() =>
  props.recipeImages.sort((elemA, elemB) => {
    return elemA.order - elemB.order;
  })
);

const renderFraction = (currentClass: string, totalClass: string) => {
  return `<div><span class="bg-white rounded-xl px-2"><span class=${currentClass}></span> / <span class=${totalClass}></span></span></div>`;
};
</script>
