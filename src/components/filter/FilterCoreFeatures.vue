<template>
  <div>
    <dropdown-button-multi-check-boxes
      v-model:value="checkedFeatures"
      v-on:change="checkedSignal"
      v-bind:propertyOptions="featureOptions"
    >
    </dropdown-button-multi-check-boxes>
  </div>
</template>
<script>
import { computed, ref, watchEffect, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { DropdownButtonMultiCheckBoxes } from "@/components/buttonui/index";
import settingsData from "@/api/settingsData.json";
export default {
  name: "FilterCoreFeatures",
  props: {
    listOptionsOnSales: {
      type: Array,
    },
    listOptionsOnRentals: {
      type: Array,
    },
  },
  components: {
    DropdownButtonMultiCheckBoxes,
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const storeData = computed(() => store.getters.getStore);
    let checkedFeatures = ref([...storeData.value.propertyFilters.features]);
    const routeNames = ref([...settingsData.routeNames]);

    const featureOptions = computed(() => {
      let optionFeatures =
        storeData.value.activeRoutePath == routeNames.value[1].id
          ? props.listOptionsOnRentals
          : props.listOptionsOnSales;
      return optionFeatures;
    });

    const checkedSignal = () => {
      store.commit("setHomeFeatures", checkedFeatures.value);
    };
    /** regExStringToArray to convert the incoming homeFeature string
     * from the array.join() effect of @useRouterPush.js function to a
     * proper array
     * */
    const regExStringToArray = /\s*(?:,|$)\s*/;

    watchEffect(() => {
      let propertyFeatures = route.query.homeFeatures
        ? route.query.homeFeatures.split(regExStringToArray)
        : [];
      checkedFeatures.value = propertyFeatures;
      store.commit("setHomeFeatures", propertyFeatures);
    });
    onBeforeMount(() => {
      if (route.query.homeFeatures) {
        /** regExStringToArray to convert the incoming homeFeatures string
         * from the array.join() effect of @useRouterPush.js function to a proper array
         * */
        checkedFeatures.value =
          route.query.homeFeatures.split(regExStringToArray);
        store.commit("setHomeFeatures", checkedFeatures.value);
      }
    });
    return {
      checkedSignal,
      checkedFeatures,
      featureOptions,
    };
  },
};
</script>
