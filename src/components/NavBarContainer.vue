<template>
  <nav
    v-bind:class="{
      'border-b': isPropertyDetailedPage || $route.name == 'pageNotFound',
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
      class="
        sm:py-3 sm:pr-5
        cursor-pointer
        sf:flex sf:justify-start
        items-center
        sf:w-1/2
        md:w-32
      "
    ></vue-estate-logo>
    <slot></slot>
    <menu-icon
      ref="menuIconRef"
      v-on:click="toggleMenu = !toggleMenu"
      class="w-10"
    ></menu-icon>
    <mobile-menu ref="menuSideRef" v-show="toggleMenu"></mobile-menu>
    <close-mobile-menu
      class="absolute right-6 text-white"
      v-show="toggleMenu"
      v-on:click="toggleMenu = !toggleMenu"
    ></close-mobile-menu>
  </nav>
</template>
<script>
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useMediaQuery } from "@vueuse/core";
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
    const menuSideRef = ref(null);
    const menuIconRef = ref(null);
    const toggleMenu = ref(false);

    const isTableAndLargeScreen = useMediaQuery("(min-width: 640px");
    const historyRoutePath = localStorage.getItem("historyRoute");

    const isPropertyDetailedPage = computed(() =>
      route.name == "RentPageDetail" || route.name == "SalesPageDetail"
        ? true
        : false
    );
    watchEffect(() => {
      if (isTableAndLargeScreen.value) {
        toggleMenu.value;
        const catchOutSideClickCloseMenuSideBar = (event) => {
          if (
            menuSideRef.value &&
            menuSideRef.value.$el.contains(event.target)
          ) {
            return;
          }
          document.removeEventListener(
            "mousedown",
            catchOutSideClickCloseMenuSideBar
          );
          document.removeEventListener(
            "touchstart",
            catchOutSideClickCloseMenuSideBar
          );
          toggleMenu.value = false;
          // menuIconRef.value.$el.style.pointerEvents = "";
        };
        // if (menuIconRef.value) {
        //   menuIconRef.value.$el.style.pointerEvents = "none";
        // }
        document.addEventListener(
          "mousedown",
          catchOutSideClickCloseMenuSideBar
        );
        document.addEventListener(
          "touchstart",
          catchOutSideClickCloseMenuSideBar
        );
      }
    });
    return {
      menuSideRef,
      toggleMenu,
      menuIconRef,
      isPropertyDetailedPage,
      historyRoutePath,
      removeUnderScoresFromAString,
      isTableAndLargeScreen,
    };
  },
};
</script>
