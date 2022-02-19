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
    <homesive-logo class="py-3 pr-5"></homesive-logo>
    <slot></slot>
    <menu-icon></menu-icon>
  </nav>
</template>
<script>
import MenuIcon from "@/assets/icons/MenuIcon.vue";
import HomesiveLogo from "@/assets/icons/HomesiveLogo.vue";
export default ({
  name: "NavBarContainer",
  components: {
    MenuIcon,
    HomesiveLogo,
  }
})
</script>