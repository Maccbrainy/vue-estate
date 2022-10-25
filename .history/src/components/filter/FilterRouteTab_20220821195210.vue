<template>
  <button-group-multi-buttons 
    v-bind:options="propertyRouteTemplate"
    v-bind:isActiveTab="activeRouteTemplate"
    v-on:getOptionId="setPropertyListingTemplate">
  </button-group-multi-buttons>
</template>
<script>
import { ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ButtonGroupMultiButtons } from "@/components/buttonui";
import settingsData from "@/api/settingsData.json";
export default {
  name: "FilterRouteTab",
  components: {
    ButtonGroupMultiButtons
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const searchPayload = ref({});
    const activeRouteTemplate = ref("");
    const propertyRouteTemplate = ref([...settingsData.routeNames]);

    const getIsActiveRouteTab = computed(() => {
      return store.getters.getIsActiveRouteTab;
    });
    // const getSearchedData = computed(() => {
    //   return store.getters.getSearchedData;
    // });
    watchEffect(() => {
      switch (getIsActiveRouteTab.value) {
        case "SalesNearMe":
          store.commit("setActiveRoutePath", propertyRouteTemplate.value[0].id);
          activeRouteTemplate.value = propertyRouteTemplate.value[0].id;
          break;
        case "RentsNearMe":
          store.commit("setActiveRoutePath", propertyRouteTemplate.value[1].id);
          activeRouteTemplate.value = propertyRouteTemplate.value[1].id;
          break;
        default:
          store.commit("setActiveRoutePath", getIsActiveRouteTab.value);
          activeRouteTemplate.value = getIsActiveRouteTab.value;
          break;
      }
    });

    function setPropertyListingTemplate(e){
      let routeName = e.target.id;
      let isActiveRoute = getIsActiveRouteTab.value;
      let cityMayContainUnderscore = `${route.params.city}`;
      let cityParam = cityMayContainUnderscore.replace(/_/g," ");
      
      if (routeName == isActiveRoute){
        return;
      };
      searchPayload.value = {
        city: !route.params.city ? "San Francisco" : cityParam,
        state_code: !route.params.slug ? "CA" : route.params.slug,
        activeRouteTab: routeName,
      };
      store.commit("setUseRouterPush", searchPayload.value);
      store.commit("setSearchedData", searchPayload.value);
    };
    return {
      activeRouteTemplate,
      propertyRouteTemplate,
      setPropertyListingTemplate
    }
 },
}
</script>