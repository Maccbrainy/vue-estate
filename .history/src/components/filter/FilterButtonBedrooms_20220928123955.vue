<template>
  <div>
    <dropdown-button
      v-bind:filterActivated="buttonActivated"
      v-bind:buttonTitle="storeData.filterDescriptionInfo.bedroom"
      menuTitle="Bedrooms"
    >
      <filter-core-bedrooms></filter-core-bedrooms>
    </dropdown-button>
  </div>
</template>
<script>
import { computed } from "vue";
import { DropdownButton } from "@/components/buttonui/index";
import { useStore } from "vuex";
import { FilterCoreBedrooms } from "@/components/filter";
import settingsData from "@/api/settingsData.json";
export default {
  name: "FilterButtonBedrooms",
  components: {
    DropdownButton,
    FilterCoreBedrooms,
  },
  setup() {
    const store = useStore();
    const bedOptions = [...settingsData.bedOptions];
    const storeData = computed(() => store.getters.getStore);
    const buttonActivated = computed(() =>
      storeData.value.filterDescriptionInfo.bedroom == bedOptions[0].id
        ? false
        : true
    );
    return {
      storeData,
      buttonActivated,
    };
  },
};
</script>
