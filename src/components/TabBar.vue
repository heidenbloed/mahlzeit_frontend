<template>
  <header class="w-full lg:shadow-lg h-16 fixed bottom-0 lg:top-0 bg-white">
    <div class="h-full lg:max-w-4xl mx-auto grid grid-flow-col auto-cols-fr bg-white border-t-2 lg:border-t-0 border-gray-200 items-center">
      <div class="hidden lg:block">
        <slot name="logo"></slot>
      </div>
      <slot name="buttons"></slot>
    </div>
  </header>
  <div class="h-16 mb-4 hidden lg:block"></div>
  <div>
    <slot name="content"></slot>
  </div>
  <div class="h-16 block lg:hidden"></div>
</template>