<template>
  <header class="w-full h-16 z-30 fixed bottom-0 lg:top-0">
    <div class="h-full lg:container mx-auto bg-white rounded-t-xl lg:rounded-b-xl lg:rounded-t-none shadow-t-lg lg:shadow-lg grid grid-flow-col auto-cols-fr place-items-center px-2">
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

<style scoped>
.shadow-t-lg {
  box-shadow: 0 -10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
</style>