<template>
  <div>
    <dropdown-button 
      class="w-44"
      v-bind:filterActivated="buttonActivated" 
      v-bind:buttonTitle="homeTypeTitle" 
      menuTitle="Home Type">
      <filter-core-home-types 
        v-if="disableOnMobile" 
        v-bind:listOptions="homeTypes">
      </filter-core-home-types>
    </dropdown-button>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { 
  DropdownButton, 
  // DropdownButtonMultiCheckBoxes 
} from "@/components/buttonui/index";
import { FilterCoreHomeTypes } from "@/components/filter";
import settingsData from "@/api/settingsData.json";
export default ({
  name: "FilterButtonHomeTypes",
  props: {
    disableOnMobile: {
      type: Boolean
    }
  },
  components: {
    DropdownButton,
    FilterCoreHomeTypes
    // DropdownButtonMultiCheckBoxes
  },
  setup() {
    const store = useStore();
    const homeTypes = ref([...settingsData.homeTypes]);
    const homeTypeTitle = computed(() => store.getters.getHomeTypeTitleInfo);
    const buttonActivated = computed(() => 
      homeTypeTitle.value == "All Rental Types" 
        ? false 
        : homeTypeTitle.value == "All Home Types"
        ? false
        : true 
    );
    return {
      homeTypes,
      homeTypeTitle,
      buttonActivated
    }
  }
})
</script>