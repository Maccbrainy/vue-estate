<template>
  <nav
    v-bind:class="{
      'border-b': isHomeDetailedPage,
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
    <span class="w-10 h-full flex text-teal font-semibold overflow-ellipsis"><chevron-left/> Back To Search</span>
    <vue-estate-logo class="sm:py-3 sm:pr-5 cursor-pointer"></vue-estate-logo>
    <slot></slot>
    <menu-icon v-on:click="toggleMenu = !toggleMenu"></menu-icon>
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
    const isHomeDetailedPage = computed(() =>
      route.name == "RentPageDetail" || route.name == "SalesPageDetail"
        ? true
        : false
    );
    return {
      toggleMenu,
      isHomeDetailedPage,
    };
  },
};
</script>
