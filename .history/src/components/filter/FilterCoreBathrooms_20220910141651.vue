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
    const getNumberOfBath = computed(() => store.getters.getNumberOfBath);
    const defaultBathValue = computed(() => 
      getNumberOfBath.value ? getNumberOfBath.value : bathroomOptions[0].id
    )
    const bathroomFilterValue = ref(defaultBathValue.value);

    const numberOfBathHandler = (e) =>{
      let noOfBaths = e.target.id;
      let bathFilter = noOfBaths == bathroomOptions[0].id ? "" : noOfBaths;
      store.commit("setNumberOfBathRoom", bathFilter);
      return noOfBaths;
    };

    watchEffect(() => {
      let titleFilter = getNumberOfBath.value 
        ? `${getNumberOfBath.value}+ Baths`  
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