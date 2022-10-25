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
import { ref, computed, watchEffect } from "vue";
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
    const getNumberOfBedInProperty = computed(
      () => store.getters.getNumberOfBed);
    const defaultBedValue = computed(() =>
      getNumberOfBedInProperty.value 
        ? getNumberOfBedInProperty.value 
        : bedOptions[0].id);
    const bedRoomFilterValue = ref(defaultBedValue.value);
    const bedRoomFilterTitle = ref(`${bedOptions[0].id}`);

    const numberOfBedHandler = (e) =>{
      let noOfBeds = e.target.id;
      bedRoomFilterValue.value = noOfBeds;
      let bedFilter = noOfBeds == bedOptions[0].id ? "" : noOfBeds;
      //Remove + sign from bedroom filter title;
      bedRoomFilterTitle.value = !bedFilter ? noOfBeds : `${noOfBeds}+ Beds`;
      store.commit("setNumberOfBedRoom", bedFilter);
      return noOfBeds;
    };

    watchEffect(() => {
      store.commit("setBedroomInfo", bedRoomFilterTitle.value);
    });

    return {
      numberOfBedHandler,
      bedOptions,
      bedRoomFilterValue,
      bedRoomFilterTitle,
    }
  }
})
</script>