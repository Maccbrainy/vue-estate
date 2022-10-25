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
import { useRouter } from "vue-router";
import { computed } from "vue";
import settingsData from "@/api/settingsData.json";
export default {
  name: "HomeTabButtons",
  components: {
    ButtonTab,
  },
  setup() {
    const router = useRouter();
    // const route = useRoute();
    const store = useStore();
    // const activeTabButton = ref("");
    const routeNames = [...settingsData.routeNames];
    const getIsActiveRouteTab = computed(
      () => store.getters.getIsActiveRouteTab);
    // watchEffect(() => {
    //   let routingValue = 
    //     route.name == "HomePage" ? routeNames[0].queryFormat : route.name;
    //   store.commit("setActiveRoutePath", routingValue);

    //   // if (!getIsActiveRouteTab.value){
    //   //   store.commit("setActiveRoutePath", routingValue);
    //   // } else {
    //   //   store.commit("setActiveRoutePath", routingValue);
    //   // }
    // });

    function activateTab(e){
      let routingValue = 
        e.target.name == routeNames[0].queryFormat ? "HomePage" : e.target.name; 
      router.push({
        name: routingValue
      });
      store.commit("setActiveRoutePath", e.target.name);
    };

    // watchEffect(() => {
    //   activeTabButton.value = getIsActiveRouteTab.value;
    // });
    return {
      routeNames,
      activateTab,
      activeTabButton: getIsActiveRouteTab,
    }
  }
}
</script>