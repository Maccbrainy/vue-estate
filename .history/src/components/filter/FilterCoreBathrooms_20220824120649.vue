<template>
  <div>
    <button-group-multi-buttons 
      v-bind:options="bathroomOptions"
      v-bind:isActiveTab="bathroomFilterValue"
      v-on:getOptionId="numberOfBath">
    </button-group-multi-buttons>
  </div>
</template>
<script>
import { ref, watchEffect } from "vue";
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
    const bathroomFilterValue = ref(bathroomOptions[0].id);
    const bathroomFilterTitle = ref(`${bathroomOptions[0].id}`);

    const numberOfBath = (e) =>{
      let noOfBaths = e.target.id;
      bathroomFilterValue.value = noOfBaths;
      let bathFilter = noOfBaths == bathroomOptions[0].id ? "" : noOfBaths;
      //Remove + sign from bedroom filter title;
      bathroomFilterTitle.value = !bathFilter 
        ? noOfBaths 
        : `${noOfBaths}+ Baths`;
      store.commit("setNumberOfBathRoom", bathFilter);
      return noOfBaths;
    };

    watchEffect(() => {
      store.commit("setBathroomInfo", bathroomFilterTitle.value);
    });

    return {
      numberOfBath,
      bathroomOptions,
      bathroomFilterValue,
      bathroomFilterTitle,
    }
  }
})
</script>