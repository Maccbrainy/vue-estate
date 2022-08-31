<template>
  <base-layout>
    <template v-slot:header>
      <nav-bar-container>
        <nav-bar-search-form></nav-bar-search-form>
        <nav-bar></nav-bar>
      </nav-bar-container>
    </template>
    <template v-slot:default>
      <router-view :key="$route.path"/>
    </template>
    <template v-slot:footer></template>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import NavBarContainer from "@/components/NavBarContainer.vue";
import NavBar from "@/components/NavBar.vue";
import NavBarSearchForm from "@/components/NavBarSearchForm.vue";
export default ({
  components: {
    BaseLayout,
    NavBarContainer,
    NavBar,
    NavBarSearchForm
  }
})
</script>
<style>
/* @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap'); */
html,
body {
  margin: 0px;
  padding: 0px;
  /* font-size: 16px;
  line-height: 1.5;
  letter-spacing: -0.1px; */
  
  /* font-family: 'Poppins', sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgb(255, 255, 255);
}

.leaflet-popup-content {
  width: 280px !important;
  margin: 0px !important;
}
.leaflet-popup-content p {
  margin: 1px 0px !important;
}
</style>
