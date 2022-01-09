<template>
  <header class="w-full h-16 fixed bottom-0 md:top-0 z-10">
    <div class="h-full md:container mx-auto bg-white rounded-t-xl md:rounded-b-xl md:rounded-t-none shadow-t-lg md:shadow-lg grid grid-flow-col auto-cols-fr place-items-center px-2">
      <div class="hidden md:block">
        <slot name="logo"></slot>
      </div>
      <slot name="buttons"></slot>
    </div>
  </header>
  <div class="h-16 mb-4 hidden md:block"></div>
    <div class="container mx-auto">
      <slot name="content"></slot>
    </div>
  <div class="h-16 md:h-4 mt-2 md:mt-0"></div>
</template>

<style scoped>
.shadow-t-lg {
  box-shadow: 0 -10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
</style>