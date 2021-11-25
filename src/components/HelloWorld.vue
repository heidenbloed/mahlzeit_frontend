<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div class="text-center text-gray-500">
    <h1>{{ msg }}</h1>

    <p>
      Recommended IDE setup:
      <a href="https://code.visualstudio.com/" target="_blank" class="text-green-400">VSCode</a>
      +
      <a href="https://github.com/johnsoncodehk/volar" target="_blank" class="text-green-400">Volar</a>
    </p>

    <p>See <code>README.md</code> for more information.</p>

    <p>
      <a href="https://vitejs.dev/guide/features.html" target="_blank" class="text-green-400">
        Vite Docs
      </a>
      |
      <a href="https://v3.vuejs.org/" target="_blank" class="text-green-400">Vue 3 Docs</a>
    </p>

    <button type="button" @click="count++" class="bg-green-300 rounded-md p-2 inline-flex items-center justify-center text-gray-900 hover:text-gray-800 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-900">count is: {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
  </div>
</template>