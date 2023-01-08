<template>
  <button
    v-on:click="saveHomePropertyCallback"
    :class="{
      'border xs:border-none sm:bg-white sm:px-2 sm:hover:bg-gray-200 sm:hover:border-transparent':
        $route.name == 'SalesPageDetail' || $route.name == 'RentPageDetail',
    }"
    class="
      px-1
      py-1
      rounded-lg
      cursor-pointer
      font-medium
      flex
      items-center
      z-20
    "
  >
    <svg
      width="30"
      height="30"
      viewBox="0 0 32 32"
      :class="{
        'xs:text-white text-teal':
          ($route.name == 'SalesPageDetail' && !teleportModalMediaTable) ||
          ($route.name == 'RentPageDetail' && !teleportModalMediaTable),
        'text-teal':
          ($route.name == 'SalesPageDetail' && teleportModalMediaTable) ||
          ($route.name == 'RentPageDetail' && teleportModalMediaTable),
      }"
      class="text-white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none">
        <path
          d="M26.95 11.863a5.193 5.193 0 0 1-1.53 3.69l-1.913 1.912-7.373 7.373-7.371-7.373-1.912-1.912a5.214 5.214 0 1 1 7.377-7.366l1.906 1.907 1.908-1.908a5.214 5.214 0 0 1 8.908 3.677z"
          fill-opacity="0"
          fill="#FFF"
        ></path>
        <path
          d="M26.95 11.863a5.214 5.214 0 0 0-8.908-3.677l-1.908 1.908-1.906-1.908a5.214 5.214 0 1 0-7.377 7.366l1.912 1.913 7.371 7.373 7.373-7.373 1.912-1.912a5.193 5.193 0 0 0 1.53-3.69zM16.157 6.31A7.874 7.874 0 1 1 27.3 17.433l-1.913 1.913-9.254 9.254-1.88-1.88-7.373-7.374-1.91-1.91a7.874 7.874 0 1 1 11.137-11.13l.027.025.022-.022z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
    <span
      v-show="
        $route.name == 'SalesPageDetail' || $route.name == 'RentPageDetail'
      "
      class="xs:hidden p-1"
      >Save</span
    >
  </button>
</template>
<script>
import { inject } from "vue";
export default {
  name: "SaveSearch",
  setup() {
    const { saveHomePropertyCallback, teleportModalMediaTable } =
      inject("provider");
    return { saveHomePropertyCallback, teleportModalMediaTable };
  },
};
</script>
