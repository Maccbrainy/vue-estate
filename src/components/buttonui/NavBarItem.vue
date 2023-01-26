<template>
  <li
    v-show="$route.name != 'pageNotFound'"
    v-bind:class="{
      'cursor-pointer hover:text-white hover:bg-teal': !storeData.isLoading,
    }"
    class="
      group
      relative
      rounded-md
      px-4
      py-2
      bg-white
      text-base
      font-medium
      text-gray-700
      lf:hidden
    "
  >
    <slot></slot>
  </li>
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
    };
  },
};
</script>
