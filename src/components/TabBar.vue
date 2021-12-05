<template>
  <header class="w-full lg:shadow-lg h-16 bottom-0 lg:top-0 fixed lg:static">
    <div class="h-full lg:max-w-4xl mx-auto grid grid-flow-col auto-cols-fr bg-white border-t-2 lg:border-t-0 border-gray-200 items-center">
      <div class="hidden lg:block">
        <slot name="logo"></slot>
      </div>
      <slot></slot>
    </div>
  </header>
</template>