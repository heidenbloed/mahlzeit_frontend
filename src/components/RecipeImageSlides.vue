<template>
  <swiper
    :modules="swiperModules"
    :slides-per-view="1"
    :space-between="0"
    virtual
    :navigation="{
      prevEl: '.slide-prev-btn',
      nextEl: '.slide-next-btn'
    }"
    :pagination="{
      type: 'fraction',
      renderFraction: renderFraction
    }"
    slideClass="bg-red-500 h-full"
  >
    <swiper-slide
      v-for="(imageUrl, index) in imageUrls"
      :virtualIndex="index"
    >
      <img :src="imageUrl" class="w-full h-full object-cover aspect-[3/2] rounded-none md:rounded-xl"/>
    </swiper-slide>
    
    <div class="absolute top-0 left-0 h-full z-10 flex flex-col place-content-center">
      <button class="slide-prev-btn cursor-pointer leading-none text-white bg-white/30 rounded-r-xl p-1 hidden md:block">
        <span class="icon-2xl">
          navigate_before

        </span>
      </button>
    </div>
    <div class="absolute top-0 right-0 h-full z-10 flex flex-col place-content-center">
      <button class="slide-next-btn z-10cursor-pointer right-0 leading-none text-white bg-white/30 rounded-l-xl p-1 hidden md:block">
        <span class="icon-2xl">
          navigate_next
        </span>
      </button>
    </div>
    
  </swiper>
</template>

<script setup lang="ts">
import { Virtual, Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiperModules = [Virtual, Navigation, Pagination, A11y];

const props = defineProps({
  imageUrls: {
    type: Array,
    required: true,
  }
});

const renderFraction = (currentClass: string, totalClass: string) => {
  return `<div><span class="bg-white rounded-xl px-2"><span class=${currentClass}></span> / <span class=${totalClass}></span></span></div>`;
};
</script>