<template>
  <button
    type="button"
    v-bind:class="{
      'bg-gray-100': isFetching,
      'bg-white': !isFetching,
    }"
    class="
      flex
      justify-center
      items-center
      z-30
      rounded-lg
      border border-gray-300
      shadow-sm
      px-4
      py-2
      text-base
      font-medium
      hover:bg-gray-200
      active:bg-gray-400
    "
    :disabled="isFetching"
  >
    <slot></slot>
  </button>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const isFetching = computed(() => store.getters.getStore.fetchingIsBusy);
    return {
      isFetching,
    };
  },
};
</script>
