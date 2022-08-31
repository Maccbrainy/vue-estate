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
    let checkedFeatures = ref([]);
    const featureOptions = ref([]);
    const routeNames = ref([...settingsData.routeNames]);

    const getActiveRoutePath = computed(
      () => store.getters.getIsActiveRouteTab);

    watchEffect(() => {
      featureOptions.value = 
        getActiveRoutePath.value == routeNames.value[1].id 
          ? props.listOptionsOnRentals
          : props.listOptionsOnSales;
      checkedFeatures.value = [];
      store.commit("setHomeFeatures", []);
    });

    watchEffect(() => {
      let defaultTitle = 
        getActiveRoutePath.value == routeNames.value[1].id 
          ? "All Rental Features" 
          : "All Home Features";

      let typeTitle = 
        checkedFeatures.value.length == 0
          ? defaultTitle
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

    return {
      checkedSignal,
      checkedFeatures,
      featureOptions
    }
  }
})
</script>