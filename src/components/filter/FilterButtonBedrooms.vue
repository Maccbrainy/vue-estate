<template>
  <dropdown-button buttonTitle="All Beds" menuTitle="Bedrooms">
    <button-group-multi-buttons 
      v-bind:options="bedOptions"
      v-bind:isActiveTab="noOfBeds"
      v-on:getOptionId="numberOfBed">
    </button-group-multi-buttons>
  </dropdown-button>
</template>
<script>
import { reactive, computed } from "vue";
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
    const bedOptions = reactive([
      {
        id: "Studio",
        name: "Studio",
      },
      {
        id: "1+",
        name: "1+",
      },
      {
        id: "2+",
        name: "2+",
      },
      {
        id: "3+",
        name: "3+",
      },
      {
        id: "4+",
        name: "4+",
      }
    ]);
    const noOfBeds = computed(() => bedOptions[0].id);
    function numberOfBed(e){
      console.log("You clicked me!", e.target.id);
      store.commit("setNumberOfBedRoom", e.target.id);
    }
    return {
      noOfBeds,
      numberOfBed,
      bedOptions,
    }
  }
})
</script>