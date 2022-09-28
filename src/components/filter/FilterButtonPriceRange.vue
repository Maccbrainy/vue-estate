<template>
  <div>
    <dropdown-button
      v-bind:filterActivated="buttonActivated"
      v-bind:buttonTitle="storeData.filterDescriptionInfo.priceRange"
      menuTitle="Price Range"
    >
      <filter-core-price-range></filter-core-price-range>
    </dropdown-button>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { DropdownButton } from "@/components/buttonui/index";
import { FilterCorePriceRange } from "@/components/filter";
export default {
  name: "FilterButtonRange",
  components: {
    DropdownButton,
    FilterCorePriceRange,
  },
  setup() {
    const store = useStore();
    const storeData = computed(() => store.getters.getStore);
    const buttonActivated = computed(() =>
      storeData.value.filterDescriptionInfo.priceRange == "Any Price"
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
