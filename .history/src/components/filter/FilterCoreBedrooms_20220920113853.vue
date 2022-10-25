<template>
  <div>
    <button-group-multi-buttons 
      v-bind:options="bedOptions"
      v-bind:isActiveTab="bedRoomFilterValue"
      v-on:getOptionId="numberOfBedHandler">
    </button-group-multi-buttons>
  </div>
</template>
<script>
import { computed, watchEffect } from "vue";
import { ButtonGroupMultiButtons } from "@/components/buttonui/index";
import { useStore } from "vuex";
import settingsData from "@/api/settingsData.json";
export default ({
  name: "FilterCoreBedrooms",
  components: {
    ButtonGroupMultiButtons
  },
  setup() {
    const store = useStore();
    const bedOptions = [...settingsData.bedOptions];
    const storeData = computed(() => store.getters.getStore);
    const bedRoomFilterValue = computed(() =>
      storeData.value.propertyFilters.numberOfBed 
        ? storeData.value.propertyFilters.numberOfBed 
        : bedOptions[0].id);

    const numberOfBedHandler = (e) =>{
      let noOfBeds = e.target.id;
      let bedFilter = noOfBeds == bedOptions[0].id ? "" : noOfBeds;
      store.commit("setNumberOfBedRoom", bedFilter);
      return noOfBeds;
    };

    watchEffect(() => {
      let titleFilter = storeData.value.propertyFilters.numberOfBed 
        ? `${storeData.value.propertyFilters.numberOfBed}+ Bedrooms`  
        : bedOptions[0].id;
      store.commit("setBedroomInfo", titleFilter);
    });

    return {
      numberOfBedHandler,
      bedOptions,
      bedRoomFilterValue,
    }
  }
})
</script>