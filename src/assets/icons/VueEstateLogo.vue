<template>
  <div v-on:click="returnHomeAndKeepRouteState">
    <img alt="Vue Estate logo" src="../vue-estate.svg" />
  </div>
</template>
<script>
import { computed } from "vue";
import { useRouter } from "vue-router"
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const getIsActiveRouteTab = computed(() => {
      return store.getters.getIsActiveRouteTab;
    });
    function returnHomeAndKeepRouteState(){
      console.log("Home clicked");
      router.push({
        name: 
          getIsActiveRouteTab.value == "list-for-sale" 
            ? "HomePage" 
            : getIsActiveRouteTab.value
      });
    }
    return {
      returnHomeAndKeepRouteState
    }
  }
}
</script>