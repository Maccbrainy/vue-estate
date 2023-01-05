<template>
  <base-layout>
    <template v-slot:header>
      <nav-bar-container v-bind:key="$route.path">
        <nav-bar-search-form></nav-bar-search-form>
        <nav-bar></nav-bar>
      </nav-bar-container>
    </template>
    <template v-slot:default>
      <router-view v-bind:key="$route.path"></router-view>
      <teleport-modal></teleport-modal>
    </template>
    <template v-slot:footer></template>
  </base-layout>
</template>
<script>
import { BaseLayout } from "@/layouts/";
import NavBarContainer from "@/components/NavBarContainer.vue";
import NavBar from "@/components/NavBar.vue";
import NavBarSearchForm from "@/components/NavBarSearchForm.vue";
import TeleportModal from "./components/modals/TeleportModal.vue";
export default {
  components: {
    BaseLayout,
    NavBarContainer,
    NavBar,
    NavBarSearchForm,
    TeleportModal,
  },
};
</script>
