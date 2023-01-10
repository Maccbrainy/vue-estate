<template>
  <ul
    v-bind:class="{ 'group-hover:block': !storeData.isLoading }"
    class="
      z-30
      mt-2
      left-0
      absolute
      pb-1
      pt-1
      w-44
      hidden
      rounded-md
      shadow-lg
      bg-white
      text-sm
      font-normal
      text-gray-600
    "
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="menu-button"
  >
    <slot></slot>
  </ul>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "NavBarDropdown",
  setup() {
    const store = useStore();
    const storeData = computed(() => store.getters.getStore);

    return {
      storeData,
    };
  },
};
</script>
