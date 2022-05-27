<template>
  <button-group-multi-buttons 
    v-bind:options="propertyListingTemplate"
    v-bind:isActiveTab="activeRouteTemplate"
    v-on:getOptionId="setPropertyListingTemplate">
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
    const activeRouteTemplate = ref("");
    const propertyListingTemplate = ref([
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
    // const getSearchedData = computed(() => {
    //   return store.getters.getSearchedData;
    // });
    watchEffect(() => {
      if (getIsActiveRouteTab.value == ""){
        store.commit("setActiveRoutePath", route.name);
        activeRouteTemplate.value = route.name;
      }
      activeRouteTemplate.value = getIsActiveRouteTab.value;
    });

    function setPropertyListingTemplate(e){
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
      }
    };
    return {
      activeRouteTemplate,
      propertyListingTemplate,
      setPropertyListingTemplate
    }
 },
}
</script>