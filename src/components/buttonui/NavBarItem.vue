<template>
  <li
    v-bind:class="{ 'cursor-not-allowed': isLoading }" 
    class="
      group
      relative 
      inline-flex
      cursor-pointer 
      rounded-md 
      px-4 
      py-2 
      bg-white 
      text-base 
      font-medium 
      text-gray-700
      hover:text-white hover:bg-teal lf:hidden">
    <slot></slot>
  </li>
</template>
<script>
import { useStore } from "vuex";
import { ref, computed, watchEffect } from "vue";
export default {
  setup() {
    const store = useStore();
    const isLoading = ref(false);
    const loadingIsActive = computed(() => {
      return store.getters.getIsLoading;
    });

    watchEffect(() => {
      isLoading.value = loadingIsActive.value;
    });
    return {
      isLoading,
    }
  },
}
</script>
