<template>
  <dropdown-button 
    v-bind:filterActivated="buttonActivated" 
    v-bind:buttonTitle="homeTypeTitle" 
    menuTitle="Home Type">
    <dropdown-button-multi-check-boxes 
      v-model:value="checkedHomeType" 
      v-bind:propertyOptions="homeTypes">
    </dropdown-button-multi-check-boxes>
    <!-- <div>{{ checkedHomeType }}</div> -->
  </dropdown-button>
</template>
<script>
import { computed, ref, watchEffect } from "vue";
import { useStore } from "vuex";
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
    const store = useStore();
    const allHomeTypesTitle = "All Home Types";
    let checkedHomeType = ref([]);
    let homeTypes = ref([
      "Single", 
      "Multi-Family", 
      "Condo", 
      "Land", 
      "Mobile/Manufactured",
      "Others"
    ]);
    watchEffect(() => {
      store.commit("setHomeType", checkedHomeType.value);
    });
    const homeTypeTitle = computed(()=> {
      return checkedHomeType.value.length == 0
        ? allHomeTypesTitle
        : checkedHomeType.value.length == 1 
        ? checkedHomeType.value[0]
        : `Home Types (${checkedHomeType.value.length})`
    })
    const buttonActivated = computed(() => {
      return homeTypeTitle.value == allHomeTypesTitle ? false : true;
    });
    return {
      homeTypes,
      checkedHomeType,
      homeTypeTitle,
      buttonActivated
    }
  }
})
</script>