<template>
  <div
    class="
      flex
      justify-around
      items-align
      mt-3
      text-gray-600 text-lg
      font-semibold
    "
  >
    <button
      class="
        bg-white
        px-2
        py-1
        rounded-lg
        cursor-pointer
        flex
        items-center
        z-10
        hover:bg-gray-200 hover:border-transparent
      "
    >
      <save-search class="text-teal" />
      <span class="p-1">Save</span>
    </button>
    <button
      class="
        bg-white
        px-2
        py-1
        rounded-lg
        cursor-pointer
        flex
        items-center
        z-10
        hover:bg-gray-200 hover:border-transparent
      "
    >
      <share-icon class="text-teal" />
      <span class="px-1">Share</span>
    </button>
  </div>
</template>
<script>
import { SaveSearch, ShareIcon } from "../assets/icons";

export default {
  name: "WidgetSaveShare",
  components: {
    SaveSearch,
    ShareIcon,
  },
};
</script>
