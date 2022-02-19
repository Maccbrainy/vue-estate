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
    <vue-estate-logo class="py-3 pr-5"></vue-estate-logo>
    <slot></slot>
    <menu-icon></menu-icon>
  </nav>
</template>
<script>
import MenuIcon from "@/assets/icons/MenuIcon.vue";
import VueEstateLogo from "@/assets/icons/VueEstateLogo.vue";
export default ({
  name: "NavBarContainer",
  components: {
    MenuIcon,
    VueEstateLogo,
  }
})
</script>