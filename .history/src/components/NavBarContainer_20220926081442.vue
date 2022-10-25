<template>
  <nav
    v-bind:class="{
      'border-b': isHomeDetailedPage
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
      z-50">
    <vue-estate-logo class="sm:py-3 sm:pr-5 cursor-pointer"></vue-estate-logo>
    <slot></slot>
    <menu-icon v-on:click="toggleMenu = !toggleMenu"></menu-icon>
    <mobile-menu v-show="toggleMenu"></mobile-menu>
    <close-mobile-menu 
      class="absolute right-6" 
      v-show="toggleMenu" 
      v-on:click="toggleMenu = !toggleMenu"
    ></close-mobile-menu>
  </nav>
</template>
<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
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
    const route = useRoute();
    const toggleMenu = ref(false);
    // const isHomeDetailedPage = ref(true);
    const isHomeDetailedPage = computed(() => {
      return route.name == "HomeDetail" ? true : false
    })
    return {
      toggleMenu,
      isHomeDetailedPage
    }
  }
})
</script>