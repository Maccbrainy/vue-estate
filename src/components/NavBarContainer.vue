<template>
  <nav 
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
      z-50">
    <vue-estate-logo class="sm:py-3 sm:pr-5 cursor-pointer"></vue-estate-logo>
    <slot></slot>
    <menu-icon
      v-if="!toggleMenu" 
      v-on:click="toggleMenu = !toggleMenu"
    ></menu-icon>
    <mobile-menu v-if="toggleMenu"></mobile-menu>
    <close-mobile-menu 
      v-if="toggleMenu" 
      v-on:click="toggleMenu = !toggleMenu"
    ></close-mobile-menu>
  </nav>
</template>
<script>
import { ref } from "vue";
import MenuIcon from "@/assets/icons/MenuIcon.vue";
import CloseMobileMenu from "@/assets/icons/CloseMobileMenu.vue";
import MobileMenu from "@/components/mobile/MobileMenu.vue";
import VueEstateLogo from "@/assets/icons/VueEstateLogo.vue";
export default ({
  name: "NavBarContainer",
  components: {
    MenuIcon,
    MobileMenu,
    CloseMobileMenu,
    VueEstateLogo,
  },
  setup() {
    const toggleMenu = ref(false);
    return {
      toggleMenu,
    }
  }
})
</script>