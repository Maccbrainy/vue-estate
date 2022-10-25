<template>
  <div>
    <button-group-multi-buttons 
      v-bind:options="bathroomOptions"
      v-bind:isActiveTab="bathroomFilterValue"
      v-on:getOptionId="numberOfBathHandler">
    </button-group-multi-buttons>
  </div>
</template>
<script>
import { ref, computed, watchEffect } from "vue";
import { ButtonGroupMultiButtons } from "@/components/buttonui/index";
import { useStore } from "vuex";
import settingsData from "@/api/settingsData.json";
export default ({
  name: "FilterCoreBathrooms",
  components: {
    ButtonGroupMultiButtons
  },
  setup() {
    const store = useStore();
    const bathroomOptions = [...settingsData.bathroomOptions];
    const storeData = computed(() => store.getters.getStore);
    const numberOfBath = ref(storeData.value.propertyFilters.numberOfBath);
    const bathroomFilterValue = computed(
      () => numberOfBath.value || bathroomOptions[0].id)
    const numberOfBathHandler = (e) =>{
      let noOfBaths = e.target.id;
      let bathFilter = noOfBaths == bathroomOptions[0].id ? "" : noOfBaths;
      store.commit("setNumberOfBathRoom", bathFilter);
      return noOfBaths;
    };

    watchEffect(() => {
      let titleFilter = numberOfBath.value 
        ? `${numberOfBath.value}+ Baths`  
        : bathroomOptions[0].id;
      store.commit("setBathroomInfo", titleFilter);
    });

    return {
      numberOfBathHandler,
      bathroomOptions,
      bathroomFilterValue,
    }
  }
})
</script>