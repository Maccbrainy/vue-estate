<template>
  <dropdown-button buttonTitle="All Beds" menuTitle="Bedrooms">
    <button-group-multi-buttons 
      v-bind:options="bedOptions"
      v-on:getOptionId="numberOfBed">
    </button-group-multi-buttons>
  </dropdown-button>
</template>
<script>
import { reactive } from "vue";
import { 
  DropdownButton,
  ButtonGroupMultiButtons 
} from "@/components/buttonui/index";
import { useStore } from "vuex";
export default ({
  name: "FilterButtonGroup",
  components: {
    DropdownButton,
    ButtonGroupMultiButtons
  },
  setup() {
    const store = useStore();
    const bedOptions = reactive(["Studio", 1, 2, 3, 4]);

    function numberOfBed(e){
      console.log("You clicked me!", e.target.id);
      store.commit("setNumberOfBedRoom", e.target.id);
    }
    return {
      numberOfBed,
      bedOptions,
    }
  }
})
</script>