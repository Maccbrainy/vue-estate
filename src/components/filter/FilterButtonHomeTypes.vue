<template>
  <div>
    <dropdown-button
      class="w-44"
      v-bind:filterActivated="buttonActivated"
      v-bind:buttonTitle="storeData.filterDescriptionInfo.homeType"
      menuTitle="Home Type"
    >
      <filter-core-home-types
        v-if="disableOnMobile"
        v-bind:listOptions="homeTypes"
      >
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
export default {
  name: "FilterButtonHomeTypes",
  props: {
    disableOnMobile: {
      type: Boolean,
    },
  },
  components: {
    DropdownButton,
    FilterCoreHomeTypes,
    // DropdownButtonMultiCheckBoxes
  },
  setup() {
    const store = useStore();
    const homeTypes = ref([...settingsData.homeTypes]);
    const storeData = computed(() => store.getters.getStore);
    const buttonActivated = computed(() =>
      storeData.value.filterDescriptionInfo.homeType == "All Rental Types"
        ? false
        : storeData.value.filterDescriptionInfo.homeType == "All Home Types"
        ? false
        : true
    );
    return {
      homeTypes,
      storeData,
      buttonActivated,
    };
  },
};
</script>
