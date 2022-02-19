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
</style>
