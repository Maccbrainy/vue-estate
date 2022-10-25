<template>
  <span role="group" class="flex bg-gray-600 bg-opacity-50 rounded-lg">
    <button-tab 
      v-for="(routeName, index) in routeNames" 
      v-bind:key="index"
      v-bind:name="routeName.queryFormat"
      v-on:click.prevent="activateTab"
      v-bind:class="{'bg-white text-teal': routeName.queryFormat == activeTabButton}"
      >{{ routeName.name }}</button-tab>
  </span> 
</template>
<script>
import { ButtonTab } from "@/components/buttonui";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, watchEffect } from "vue";
import settingsData from "@/api/settingsData.json";
export default {
  name: "HomeTabButtons",
  components: {
    ButtonTab,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const routeNames = ref([...settingsData.routeNames]);
    const getIsActiveRouteTab = computed(
      () => store.getters.getIsActiveRouteTab);

    function activateTab(e){
      if (e.target.name == getIsActiveRouteTab.value){
        return;
      }
      let routingValue = 
        e.target.name == routeNames.value[0].queryFormat ? "HomePage" : e.target.name; 
      router.push({
        name: routingValue,
      });
      // store.commit("setActiveRoutePath", e.target.name);
    };
    const activeTabButton = computed(() => {
      let routingValue =
        route.name == "HomePage" ? routeNames.value[0].queryFormat : route.name;
      store.commit("setActiveRoutePath", routingValue);
      return routingValue;
    });

    watchEffect(() => {
      let routingValue;
      switch (route.name) {
        case "SalesNearMe":
          routingValue = routeNames.value[0].id;
          break;
        case "RentsNearMe":
          routingValue = routeNames.value[1].id;
          break;
        case "list-for-sale":
          routingValue = routeNames.value[0].id;
          break;
        case "list-for-rent":
          routingValue = routeNames.value[1].id;
          break;
        case "list-sold":
          routingValue = routeNames.value[2].id;
          break;
      };
      store.commit("setActiveRoutePath", routingValue);
      console.log("I did it!");
    });

    return {
      routeNames,
      activateTab,
      activeTabButton
    }
  }
}
</script>