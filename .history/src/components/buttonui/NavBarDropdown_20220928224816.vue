<template>
  <ul
    v-bind:class="{ 'group-hover:block': storeData.isLoading}"
    class="
      z-30
      top-10
      left-0
      absolute 
      pb-1 pt-1
      w-auto
      hidden 
      rounded-md 
      shadow-lg
      bg-white" 
    role="menu" 
    aria-orientation="vertical" 
    aria-labelledby="menu-button">
    <slot></slot>
  </ul>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  setup() {
    const store = useStore();
    const storeData = computed(() => store.getters.getStore);

    return {
      storeData,
    }
  },
}

</script>