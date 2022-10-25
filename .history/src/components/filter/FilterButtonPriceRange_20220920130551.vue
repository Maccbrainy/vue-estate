<template>
  <div>
    <dropdown-button 
      v-bind:filterActivated="buttonActivated" 
      v-bind:buttonTitle="priceIndicator" 
      menuTitle="Price Range">
      <filter-core-price-range></filter-core-price-range>
    </dropdown-button>
  </div>
</template>
<script>
import { DropdownButton } from "@/components/buttonui/index";
import { computed } from "vue";
import { useStore } from "vuex";
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
    const priceIndicator = computed(
      () => storeData.value.filterDescriptionInfo.priceRange);

    const buttonActivated = computed(() =>
      priceIndicator.value == "Any Price" ? false : true
    );
    return {
      priceIndicator,
      buttonActivated,
    }
  }
}
</script>