<template>
  <div>
    <header><slot name="header"></slot></header>
    <main><slot></slot></main>
    <footer><slot name="footer"></slot></footer>
  </div>
</template>
<!-- <script>
import { useRoute } from "vue-router";
import { watchEffect } from "vue";
export default ({
  setup(){
    const route = useRoute();
    watchEffect(() => {
      console.log("This is the routing system base:", route.name);
    })
    return { route }
  }
})
</script> -->