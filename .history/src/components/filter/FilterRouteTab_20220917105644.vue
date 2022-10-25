<template>
  <button-group-multi-buttons 
    v-bind:options="propertyRouteTemplate"
    v-bind:isActiveTab="storeData.activeRoutePath"
    v-on:getOptionId="setPropertyListingTemplate">
  </button-group-multi-buttons>
</template>
<script>
import { ref, computed } from "vue";
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
    const propertyRouteTemplate = ref([...settingsData.routeNames]);
    const storeData = computed(() => store.getters.getStore);


    function setPropertyListingTemplate(e){
      let routeName = e.target.id;
      if (routeName == storeData.value.activeRoutePath){
        return;
      };
      store.commit("setIsLoading", true);

      let cityMayContainUnderscore = `${route.params.city}`;
      let cityParam = cityMayContainUnderscore.replace(/_/g," ");

      searchPayload.value = {
        city: !route.params.city ? "San Francisco" : cityParam,
        state_code: !route.params.slug ? "CA" : route.params.slug,
        activeRouteTab: routeName,
      };
      store.commit("setUseRouterPush", searchPayload.value);
      store.commit("setSearchedData", searchPayload.value);
    };
    return {
      storeData,
      propertyRouteTemplate,
      setPropertyListingTemplate
    }
 },
}
</script>