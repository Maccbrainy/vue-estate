<template>
  <div>
    <dropdown-button-multi-check-boxes 
      v-model:value="checkedFeatures"
      v-on:change="checkedSignal" 
      v-bind:propertyOptions="featureOptions">
    </dropdown-button-multi-check-boxes>
  </div>
</template>
<script>
import { computed, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { DropdownButtonMultiCheckBoxes } from "@/components/buttonui/index";
import settingsData from "@/api/settingsData.json";
export default ({
  name: "FilterCoreFeatures",
  props: {
    listOptionsOnSales: {
      type: Array
    },
    listOptionsOnRentals: {
      type: Array
    }
  },
  components: {
    DropdownButtonMultiCheckBoxes
  },
  setup(props) {
    const store = useStore();
    const storeData = computed(() => store.getters.getStore);
    const homeFeatures = ref(storeData.value.propertyFilters.features);
    const activeRoute = ref(storeData.value.activeRoutePath);
    let checkedFeatures = ref([...homeFeatures.value]);
    const routeNames = ref([...settingsData.routeNames]);

    const featureOptions = computed(() => {
      let features = 
        activeRoute.value == routeNames.value[1].id 
          ? props.listOptionsOnRentals
          : props.listOptionsOnSales;
      return features
    });
    const defaultTitle = computed(() => {
      let title = 
        activeRoute.value == routeNames.value[1].id 
          ? "All Rental Features" 
          : "All Home Features";
      return title;
    });
    watchEffect(() => {
      let typeTitle = 
        homeFeatures.value.length == 0
          ? defaultTitle
          : homeFeatures.value.length == 1 
          ? getHomeTypeTitle(featureOptions.value, homeFeatures.value[0])
          : `Home Features (${homeFeatures.value.length})`;
      store.commit("setHomeFeaturesTitleInfo", typeTitle);
      console.log("FUCK YOU NOT REACTING:", typeTitle);
    })
    const getHomeTypeTitle = (types, theCheckedTypeId) => {
      let typeChecked = types.filter((type) => type.id == theCheckedTypeId);
      return typeChecked[0].title;
    };
    const checkedSignal = () => {
      getHomeTypeTitle(featureOptions.value, homeFeatures.value[0])
      store.commit("setHomeFeatures", checkedFeatures.value);
    };
    return {
      checkedSignal,
      checkedFeatures,
      featureOptions
    }
  }
})
</script>