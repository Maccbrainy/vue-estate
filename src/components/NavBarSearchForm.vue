<template>
  <search-box
    v-show="!isHomePage && $route.name != 'pageNotFound'"
    class="w-3/12 mf:w-full my-auto mt-1"
    v-bind:class="{ 'sf:hidden': isPropertyDetailedPage }"
  >
    <search-input
      class="h-10 focus:border focus:border-gray-900 bg-gray-100 focus:bg-white"
    >
    </search-input>
  </search-box>
</template>
<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { SearchBox, SearchInput } from "@/components/buttonui/index";
export default {
  name: "NavBarSearchForm",
  components: {
    SearchBox,
    SearchInput,
  },
  setup() {
    const route = useRoute();
    const isHomePage = computed(() => {
      let routeNames = ["HomePage", "list-for-rent", "list-sold"].filter(
        (routeName) => routeName == route.name
      );
      return routeNames.length == 1 ? true : false;
    });

    const isPropertyDetailedPage = computed(() =>
      route.name == "RentPageDetail" || route.name == "SalesPageDetail"
        ? true
        : false
    );
    return { isHomePage, isPropertyDetailedPage };
  },
};
</script>
