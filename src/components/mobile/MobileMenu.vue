<template>
  <mobile-menu-container>
    <mobile-menu-list>
      <mobile-menu-button-item>Sign up or Login</mobile-menu-button-item>
      <mobile-menu-drop-down menuTitle="Buy">
        <mobile-menu-drop-down-item>Homes for Sale</mobile-menu-drop-down-item>
        <mobile-menu-drop-down-item>Open Houses</mobile-menu-drop-down-item>
        <mobile-menu-drop-down-item>New Homes</mobile-menu-drop-down-item>
        <mobile-menu-drop-down-item>Recently Sold</mobile-menu-drop-down-item>
      </mobile-menu-drop-down>
      <mobile-menu-drop-down menuTitle="Rent">
        <mobile-menu-drop-down-item>Homes for Rent</mobile-menu-drop-down-item>
        <mobile-menu-drop-down-item>Open Rent</mobile-menu-drop-down-item>
        <mobile-menu-drop-down-item>New Homes for Rent</mobile-menu-drop-down-item>
      </mobile-menu-drop-down>
      <mobile-menu-drop-down menuTitle="Mortgage">
        <mobile-menu-drop-down-item>Mortgage Overview</mobile-menu-drop-down-item>
        <mobile-menu-drop-down-item>Get Pre-Qualified</mobile-menu-drop-down-item>
        <mobile-menu-drop-down-item>Mortgage Rates</mobile-menu-drop-down-item>
      </mobile-menu-drop-down>
      <mobile-menu-drop-down menuTitle="Local Info">
        <mobile-menu-drop-down-item>All vue-estate neighborhood guide</mobile-menu-drop-down-item>
      </mobile-menu-drop-down>
      <mobile-menu-drop-down menuTitle="Additional Resources">
        <mobile-menu-drop-down-item>Vue Estate app blog</mobile-menu-drop-down-item>
        <mobile-menu-drop-down-item>Get leads by Zip code</mobile-menu-drop-down-item>
        <mobile-menu-drop-down-item>Help center</mobile-menu-drop-down-item>
      </mobile-menu-drop-down>
    </mobile-menu-list>
  </mobile-menu-container>
</template>
<script>
import { ref } from "vue";
import {
  MobileMenuContainer,
  MobileMenuList,
  MobileMenuButtonItem,
  MobileMenuDropDown,
  // MobileMenuDropDownList, 
  MobileMenuDropDownItem 
} from "@/components/mobile/index.js";
export default {
  name: "MobileMenu",
  components: {
    MobileMenuContainer,
    MobileMenuList,
    MobileMenuButtonItem,
    MobileMenuDropDown,
    // MobileMenuDropDownList,
    MobileMenuDropDownItem 
  },
  setup() {
    const openMenu = ref(false);
    return{
      openMenu,
    }
  }
}
</script>