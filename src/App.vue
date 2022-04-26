<template>
  <base-layout>
    <template v-slot:default>
      <router-view :key="$route.path"/>
    </template>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
export default ({
  components: {
    BaseLayout,
  }
})
</script>
<style>
/* @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap'); */
html,
body {
  margin: 0px;
  padding: 0px;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: -0.1px;
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
