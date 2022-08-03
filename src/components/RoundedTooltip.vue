<template>
  <div class="relative">
    <Transition name="fade">
      <div
        class="absolute bottom-full flex w-full justify-center py-3"
        v-show="_open"
      >
        <span class="rounded-xl bg-stone-500 px-3 py-1 text-white">
          <slot name="tooltip"></slot>
        </span>
      </div>
    </Transition>
    <slot name="anchor"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  open: boolean;
}>();
const emit = defineEmits(["update:open"]);

const _open = ref(props.open);

watch(_open, () => {
  emit("update:open", _open.value);
});
watch(
  () => props.open,
  () => {
    _open.value = props.open;
    if (_open.value) {
      setTimeout(() => {
        _open.value = false;
      }, 1000);
    }
  }
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity delay-300;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
