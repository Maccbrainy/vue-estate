<template>
  <div>
    <button-group-multi-buttons 
      v-bind:options="bedOptions"
      v-bind:isActiveTab="bedRoomFilterValue"
      v-on:getOptionId="numberOfBed">
    </button-group-multi-buttons>
  </div>
</template>
<script>
import { ref, watchEffect } from "vue";
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
    const bedRoomFilterValue = ref(bedOptions[0].id);
    const bedRoomFilterTitle = ref(`${bedOptions[0].id}`);

    const numberOfBed = (e) =>{
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
      numberOfBed,
      bedOptions,
      bedRoomFilterValue,
      bedRoomFilterTitle,
    }
  }
})
</script>