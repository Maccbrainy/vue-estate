<template>
  <ul
    v-bind:class="{ 'group-hover:block': !isLoading}"
    class="
      z-30
      top-10
      left-0
      absolute 
      pb-1 pt-1
      w-48
      hidden 
      rounded-md 
      shadow 
      bg-white" 
    role="menu" 
    aria-orientation="vertical" 
    aria-labelledby="menu-button">
    <slot></slot>
  </ul>
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