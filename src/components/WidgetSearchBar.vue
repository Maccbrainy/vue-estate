<template>
  <search-box>
    <search-input v-model="searchData">
      <button
        class="
          bg-red-600
          hover:bg-red-800
          absolute
          right-0
          top-0
          w-16
          h-full
          rounded-r-md
          cursor-pointer
        "
        role="button"
      >
        <search-icon />
      </button>
    </search-input>
  </search-box>
</template>
<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import { SearchBox, SearchInput } from "@/components/buttonui/index";
export default {
  name: "WidgetSearchBar",
  components: {
    SearchIcon,
    SearchBox,
    SearchInput,
  },
  setup() {
    const searchData = ref(null);

    //Access to routing;
    const route = useRoute();
    const router = useRouter();

    //Get the Route Param slug and convert the first character to uppercase;
    const routeParamSlug = route.params.slug;
    validateSearchInfoCharacter(routeParamSlug);

    function validateSearchInfoCharacter(argument) {
      let searchInfo = argument;
      if (!argument) {
        return;
      }
      let searchedInfoFirstLetterUpperCase = searchInfo.charAt(0).toUpperCase();
      let validatedSearchInfo =
        searchedInfoFirstLetterUpperCase +
        searchInfo.split("").slice(1).join("").toLowerCase();
      routerBuildUrl(validatedSearchInfo);
    }
    function routerBuildUrl(argument) {
      if (!argument) {
        return;
      }
      // named route with params to let the router build the url;
      router.push({
        name: "BuyPage",
        params: {
          slug: argument,
        },
      });
    }
    function onSubmit() {
      const searchedInfoQuery = searchData.value;
      validateSearchInfoCharacter(searchedInfoQuery);
    }
    return {
      searchData,
      route,
      router,
      onSubmit,
    };
  },
};
</script>
