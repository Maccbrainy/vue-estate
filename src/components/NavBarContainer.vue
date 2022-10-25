<template>
  <nav
    v-bind:class="{
      'border-b': isPropertyDetailedPage,
    }"
    class="
      fixed
      flex
      justify-between
      bg-white
      h-16
      items-center
      px-4
      w-full
      py-2
      z-30
    "
  >
    <router-link
      :to="historyRoutePath"
      v-if="isPropertyDetailedPage"
      class="
        w-1/3
        h-auto
        flex flex-nowrap flex-initial
        -ml-2
        items-center
        text-teal
        font-semibold
        md:hidden
      "
    >
      <span><chevron-left /></span>
      <span class="truncate">{{
        removeUnderScoresFromAString($route.params.city)
      }}</span>
    </router-link>
    <vue-estate-logo
      class="sm:py-3 sm:pr-5 cursor-pointer sf:flex sf:justify-start sf:w-1/2"
    ></vue-estate-logo>
    <slot></slot>
    <menu-icon v-on:click="toggleMenu = !toggleMenu" class="w-10"></menu-icon>
    <mobile-menu v-show="toggleMenu"></mobile-menu>
    <close-mobile-menu
      class="absolute right-6 text-white"
      v-show="toggleMenu"
      v-on:click="toggleMenu = !toggleMenu"
    ></close-mobile-menu>
  </nav>
</template>
<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { removeUnderScoresFromAString } from "@/helper";

import {
  VueEstateLogo,
  MenuIcon,
  CloseMobileMenu,
  ChevronLeft,
} from "@/assets/icons";
import MobileMenu from "@/components/mobile/MobileMenu.vue";
export default {
  name: "NavBarContainer",
  components: {
    MenuIcon,
    MobileMenu,
    CloseMobileMenu,
    VueEstateLogo,
    ChevronLeft,
  },
  setup() {
    const route = useRoute();
    const toggleMenu = ref(false);

    const historyRoutePath = localStorage.getItem("historyRoute");

    const isPropertyDetailedPage = computed(() =>
      route.name == "RentPageDetail" || route.name == "SalesPageDetail"
        ? true
        : false
    );
    return {
      toggleMenu,
      isPropertyDetailedPage,
      historyRoutePath,
      removeUnderScoresFromAString,
    };
  },
};
</script>
