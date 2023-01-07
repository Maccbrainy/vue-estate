<template>
  <button
    v-on:click="saveHomePropertyCallback"
    class="
      sm:bg-white sm:px-2
      px-1
      py-1
      border
      xs:border-none
      rounded-lg
      cursor-pointer
      font-medium
      flex
      items-center
      z-10
      sm:hover:bg-gray-200 sm:hover:border-transparent
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      :class="{
        'xs:text-white text-teal':
          ($route.name == 'SalesPageDetail' && !teleportModalMediaTable) ||
          ($route.name == 'RentPageDetail' && !teleportModalMediaTable),
        'text-teal':
          ($route.name == 'SalesPageDetail' && teleportModalMediaTable) ||
          ($route.name == 'RentPageDetail' && teleportModalMediaTable),
      }"
      class="w-7 h-7 text-white"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
      />
    </svg>
    <span
      v-show="
        $route.name == 'SalesPageDetail' || $route.name == 'RentPageDetail'
      "
      class="xs:hidden px-1"
      >Share</span
    >
  </button>
</template>
<script>
import { inject } from "vue";
export default {
  name: "ShareIcon",
  setup() {
    const { saveHomePropertyCallback, teleportModalMediaTable } =
      inject("provider");
    return { saveHomePropertyCallback, teleportModalMediaTable };
  },
};
</script>
