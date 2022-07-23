<template>
  <dropdown-button
    v-bind:filterActivated="buttonActivated" 
    v-bind:buttonTitle="bedRoomFilterTitle" 
    menuTitle="Bedrooms">
    <button-group-multi-buttons 
      v-bind:options="bedOptionsDetails"
      v-bind:isActiveTab="bedRoomFilterValue"
      v-on:getOptionId="numberOfBed">
    </button-group-multi-buttons>
  </dropdown-button>
</template>
<script>
import { ref, reactive, computed } from "vue";
import { 
  DropdownButton,
  ButtonGroupMultiButtons 
} from "@/components/buttonui/index";
import { useStore } from "vuex";
export default ({
  name: "FilterButtonBedrooms",
  components: {
    DropdownButton,
    ButtonGroupMultiButtons
  },
  setup() {
    const store = useStore();
    const bedOptionsDetails = reactive([
      {
        id: "All Beds",
        name: "Studio+",
      },
      {
        id: "1",
        name: "1+",
      },
      {
        id: "2",
        name: "2+",
      },
      {
        id: "3",
        name: "3+",
      },
      {
        id: "4",
        name: "4+",
      }
    ]);
    const bedRoomFilterValue = ref(bedOptionsDetails[0].id);
    const bedRoomFilterTitle = ref(`${bedOptionsDetails[0].id}`);

    const numberOfBed = (e) =>{
      let noOfBeds = e.target.id;
      bedRoomFilterValue.value = noOfBeds;
      let bedFilter = noOfBeds == bedOptionsDetails[0].id ? "" : noOfBeds;
      //Remove + sign from bedroom filter title;
      bedRoomFilterTitle.value = !bedFilter ? noOfBeds : `${noOfBeds}+ Beds`;
      store.commit("setNumberOfBedRoom", bedFilter);
      return noOfBeds;
    };
    const buttonActivated = computed(() => {
      return bedRoomFilterTitle.value == bedOptionsDetails[0].id ? false : true;
    });
    return {
      numberOfBed,
      bedOptionsDetails,
      bedRoomFilterValue,
      bedRoomFilterTitle,
      buttonActivated
    }
  }
})
</script>