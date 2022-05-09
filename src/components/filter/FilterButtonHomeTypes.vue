<template>
  <dropdown-button buttonTitle="All Home Types" menuTitle="Home Type">
    <dropdown-button-multi-check-boxes 
      v-model:value="checkedHomeType" 
      v-bind:propertyOptions="homeTypes">
    </dropdown-button-multi-check-boxes>
    <div>{{ checkedHomeType }}</div>
  </dropdown-button>
</template>
<script>
import { ref } from "vue";
// import { useStore } from "vuex";
import { 
  DropdownButton, 
  DropdownButtonMultiCheckBoxes 
} from "@/components/buttonui/index";
export default ({
  name: "FilterButtonHomeTypes",
  components: {
    DropdownButton,
    DropdownButtonMultiCheckBoxes
  },
  setup() {
    // const store = useStore();
    let checkedHomeType = ref([]);
    let homeTypes = ref([
      "Single", 
      "Multi-Family", 
      "Condo", 
      "Land", 
      "Mobile/Manufactured",
      "Others"
    ]);

    return {
      homeTypes,
      checkedHomeType,
    }
  }
})
</script>