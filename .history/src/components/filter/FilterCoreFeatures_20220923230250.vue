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
      let features =
        storeData.value.activeRoutePath == routeNames.value[1].id
          ? props.listOptionsOnRentals
          : props.listOptionsOnSales;
      return features;
    });
    const defaultTitle = computed(() => {
      let title =
        storeData.value.activeRoutePath == routeNames.value[1].id
          ? "All Rental Features"
          : "All Home Features";
      return title;
    });
    watchEffect(() => {
      let typeTitle =
        checkedFeatures.value.length == 0
          ? defaultTitle.value
          : checkedFeatures.value.length == 1
          ? getHomeTypeTitle(featureOptions.value, checkedFeatures.value[0])
          : `Home Features (${checkedFeatures.value.length})`;
      store.commit("setHomeFeaturesTitleInfo", typeTitle);
    });
    const getHomeTypeTitle = (types, theCheckedTypeId) => {
      let typeChecked = types.filter((type) => type.id == theCheckedTypeId);
      return typeChecked[0].title;
    };
    const checkedSignal = () => {
      store.commit("setHomeFeatures", checkedFeatures.value);
    };
    onBeforeMount(() => {
      if (route.query.homeFeatures) {
        /** Regex to convert the incoming homeFeatures string effect
         * from the array.join() @useRouterPush.js function
         * */
        let regEx = /\s*(?:,|$)\s*/;
        checkedFeatures.value = route.query.homeFeatures.split(regEx);
        store.commit("setHomeFeatures", checkedFeatures.value);
      }
      console.log(">>>>CORE FEATURES ONBEFOREMOUNT");
    });
    return {
      checkedSignal,
      checkedFeatures,
      featureOptions,
    };
  },
};
</script>
