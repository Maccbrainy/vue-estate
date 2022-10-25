<template>
  <div v-on:click="returnHomeAndKeepRouteState">
    <img alt="Vue Estate logo" src="../vue-estate.svg" />
  </div>
</template>
<script>
import { ref, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const activeRouteTab = ref("");

    const getIsActiveRouteTab = computed(() => {
      return store.getters.getIsActiveRouteTab;
    });
    watchEffect(() => {
      switch (getIsActiveRouteTab.value) {
        case "RentPage":
        case "list-for-rent":
          activeRouteTab.value = "list-for-rent";
          break;
        case "SoldPage":
        case "list-sold":
          activeRouteTab.value = "list-sold";
          break;
        default:
          activeRouteTab.value = "HomePage";
          break;
      }
    });
    function returnHomeAndKeepRouteState() {
      router.push({
        name: activeRouteTab.value,
      });
    }
    return {
      returnHomeAndKeepRouteState,
    };
  },
};
</script>
