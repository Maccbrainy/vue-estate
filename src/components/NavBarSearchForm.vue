<template>
  <search-box class="w-3/12 mf:w-full my-auto mt-1">
    <search-input class="h-10 focus:border
        focus:border-gray-900 bg-gray-100 focus:bg-white"></search-input>
  </search-box>
</template>
<script>
import { SearchBox, SearchInput } from "@/components/buttonui/index";
export default {
  name: "NavBarSearchForm",
  components: {
    SearchBox,
    SearchInput,
  }
}
</script>
