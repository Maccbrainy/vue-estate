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

    // const defaultTitle = computed(() => {
    //   let title =
    //     storeData.value.activeRoutePath == routeNames.value[1].id
    //       ? "All Rental Features"
    //       : "All Home Features";
    //   return title;
    // });
    // watchEffect(() => {
    //   if (storeData.value.activeRoutePath) {
    //     let typeTitle =
    //       checkedFeatures.value.length == 0
    //         ? defaultTitle.value
    //         : checkedFeatures.value.length == 1
    //         ? getHomeTypeTitle(featureOptions.value, checkedFeatures.value[0])
    //         : `Home Features (${checkedFeatures.value.length})`;
    //     store.commit("setHomeFeaturesTitleInfo", typeTitle);
    //   }
    // });
    // const getHomeTypeTitle = (types, theCheckedTypeId) => {
    //   let typeChecked = types.filter((type) => type.id == theCheckedTypeId);
          // TypeError: Cannot read properties of undefined (reading 'title') fixed in the
         // next line of code
    //   let title =
    //     typeChecked.length > 0 ? typeChecked[0].title : defaultTitle.value;
    //   return title;
    // };
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
