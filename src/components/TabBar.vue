<template>
  <header class="fixed bottom-0 z-20 h-16 w-full md:top-0">
    <div
      class="shadow-t-lg mx-auto grid h-full auto-cols-fr grid-flow-col place-items-center rounded-t-xl bg-white px-2 md:container md:rounded-b-xl md:rounded-t-none md:shadow-lg"
    >
      <div class="hidden md:block">
        <slot name="logo"></slot>
      </div>
      <slot name="buttons"></slot>
    </div>
  </header>
  <div class="mb-4 hidden h-16 md:block"></div>
  <div class="container mx-auto scroll-mt-5">
    <slot name="content"></slot>
  </div>
  <div class="mt-2 h-16 md:mt-0 md:h-4"></div>
</template>

<style>
* {
  @apply scroll-mb-16 md:scroll-mt-16;
}
</style>
