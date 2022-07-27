<template>
  <div class="fixed z-50">
    <div
      class="fixed inset-0 min-h-screen overflow-y-auto bg-black opacity-40"
    ></div>
    <div class="fixed inset-0 flex items-center justify-center">
      <svg class="h-12 w-12 animate-spin" viewBox="0 0 100 100">
        <circle
          class="path"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="gray"
          stroke-width="10"
        ></circle>
        <circle
          class="path"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="white"
          stroke-width="10"
          stroke-linecap="round"
          stroke-dashoffset="75"
          stroke-dasharray="283"
        ></circle>
      </svg>
    </div>
  </div>
</template>
