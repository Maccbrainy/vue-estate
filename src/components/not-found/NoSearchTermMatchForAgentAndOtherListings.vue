<template>
  <div class="block space-y-8">
    <h2 class="text-xl text-gray-700 font-normal">
      Oops! Looks like there aren't any home matching your search. Remove
      filters to find more homes
    </h2>
    <button
      v-on:click="clearAllFilters"
      class="
        py-2
        px-3
        border border-gray-200
        rounded-lg
        bg-white
        font-semibold
        text-gray-800
        hover:bg-gray-200
        m-auto
      "
    >
      <span>Reset All Filters</span>
    </button>
  </div>
</template>
<script>
import { useStore } from "vuex";
// import { CloseMobileMenu } from "@/assets/icons";
export default {
  name: "NoSearchTermMatchForAgentAndOtherListings",
  // components: {
  //   CloseMobileMenu,
  // },
  setup() {
    const store = useStore();
    const clearAllFilters = () => {
      store.dispatch("resetPropertyFilterState");
    };
    return { clearAllFilters };
  },
};
</script>
