<template>
  <mobile-menu-item v-on:click="openMenu = !openMenu">
    <h3>{{ menuTitle }}</h3>
    <chevron-down v-bind:class="{ 'transform rotate-180': openMenu }" />
  </mobile-menu-item>
  <ul v-show="openMenu" class="block pl-2 mt-2 font-normal mb-1">
    <slot></slot>
  </ul>
</template>
<script>
import { ref } from "vue";
import ChevronDown from "@/assets/icons/ChevronDown.vue";
import { MobileMenuItem } from "@/components/mobile/index.js";
export default {
  name: "MobileMenuDropDown",
  props: ["menuTitle"],
  components: {
    ChevronDown,
    MobileMenuItem,
  },
  setup() {
    const openMenu = ref(false);
    return {
      openMenu,
    };
  },
};
</script>
