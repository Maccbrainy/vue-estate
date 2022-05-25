<template>
  <button-group-multi-buttons 
    v-bind:options="propertyListingType"
    v-bind:isActiveTab="activeRouteTab"
    v-on:getOptionId="setPropertyListingType">
  </button-group-multi-buttons>
</template>
<script>
import { ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ButtonGroupMultiButtons } from "@/components/buttonui";
export default {
  name: "FilterRouteTab",
  components: {
    ButtonGroupMultiButtons
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const searchPayload = ref({});
    const activeRouteTab = ref("");
    const propertyListingType = ref([
      {
        id: "BuyPage",
        name: "Buy",
      },
      {
        id: "RentPage",
        name: "Rent",
      },
      {
        id: "SoldPage",
        name: "Sold",
      },
    ]);
    const getIsActiveRouteTab = computed(() => {
      return store.getters.getIsActiveRouteTab;
    });
    watchEffect(() => {
      if (getIsActiveRouteTab.value == ""){
        store.commit("setActiveRouteTab", route.name);
        activeRouteTab.value = route.name;
      }
      activeRouteTab.value = getIsActiveRouteTab.value;
    });

    function setPropertyListingType(e){
      let routeName = e.target.id;
      let isActiveRoute = getIsActiveRouteTab.value;
      if (routeName != isActiveRoute){
        searchPayload.value = {
          city: route.params.city,
          state_code: route.params.slug,
          activeRouteTab: routeName,
        };
        store.commit("setUseRouterPush", searchPayload.value);
        store.commit("setSearchedData", searchPayload.value);
        console.log("Active Route page Object:", searchPayload.value);
      }
    };
    return {
      activeRouteTab,
      propertyListingType,
      setPropertyListingType
    }
 },
}
</script>