<template>
  <div>
    <button-group-multi-buttons
      v-bind:options="bathroomOptions"
      v-bind:isActiveTab="bathroomFilterValue"
      v-on:getOptionId="numberOfBathHandler"
    >
    </button-group-multi-buttons>
  </div>
</template>
<script>
import { computed, watchEffect, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { ButtonGroupMultiButtons } from "@/components/buttonui/index";
import { useStore } from "vuex";
import settingsData from "@/api/settingsData.json";
export default {
  name: "FilterCoreBathrooms",
  components: {
    ButtonGroupMultiButtons,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const bathroomOptions = [...settingsData.bathroomOptions];
    const storeData = computed(() => store.getters.getStore);
    const bathroomFilterValue = computed(
      () =>
        storeData.value.propertyFilters.numberOfBath || bathroomOptions[0].id
    );
    const numberOfBathHandler = (e) => {
      let noOfBaths = e.target.id;
      let bathFilter = noOfBaths == bathroomOptions[0].id ? "" : noOfBaths;
      store.commit("setNumberOfBathRoom", bathFilter);
      return noOfBaths;
    };

    watchEffect(() => {
      let titleFilter = storeData.value.propertyFilters.numberOfBath
        ? `${storeData.value.propertyFilters.numberOfBath}+ Bathrooms`
        : bathroomOptions[0].id;
      store.commit("setBathroomInfo", titleFilter);
    });
    onBeforeMount(() => {
      if (route.query.bath) {
        store.commit("setNumberOfBathRoom", route.query.bath);
      }
    });
    return {
      numberOfBathHandler,
      bathroomOptions,
      bathroomFilterValue,
    };
  },
};
</script>
