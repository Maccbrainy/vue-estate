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
import { computed, watchEffect } from "vue";
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
    const routeNames = [...settingsData.routeNames];
    const getIsActiveRouteTab = computed(
      () => store.getters.getIsActiveRouteTab);

    function activateTab(e){
      if (e.target.name == getIsActiveRouteTab.value){
        return;
      }
      let routingValue = 
        e.target.name == routeNames[0].queryFormat ? "HomePage" : e.target.name; 
      router.push({
        name: routingValue,
      });
      // store.commit("setActiveRoutePath", e.target.name);
    };
    watchEffect(() => {
      let routingValue;
      switch (route.name) {
        case "HomePage":
          routingValue = routeNames[0].queryFormat;
          break;
        case "SalesNearMe":
          routingValue = routeNames.value[0].queryFormat;
          break;
        case "RentsNearMe":
          routingValue = routeNames.value[1].queryFormat;
          break;
        default:
          routingValue = route.name;
          break;
      };
      store.commit("setActiveRoutePath", routingValue);
      console.log("I did it!");
    });

    return {
      routeNames,
      activateTab,
      activeTabButton: getIsActiveRouteTab,
    }
  }
}
</script>