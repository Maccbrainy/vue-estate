<template>
  <div>
    <dropdown-button 
      v-bind:filterActivated="buttonActivated" 
      v-bind:buttonTitle="priceIndicator" 
      menuTitle="Price Range">
      <filter-core-price-range :key="componentPriceKey">
      </filter-core-price-range>
    </dropdown-button>
  </div>
</template>
<script>
import { DropdownButton } from "@/components/buttonui/index";
import { ref, computed, watchEffect } from "vue";
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
    const componentPriceKey = ref(0);

    const buttonActivated = computed(() =>
      priceIndicator.value == "Any Price" ? false : true
    );
    watchEffect(() => {
      if (!storeData.value.searchedData){
        console.log("COMP KEY RESET");
        componentPriceKey.value += 1;
      }
    })
    return {
      priceIndicator,
      buttonActivated,
      componentPriceKey
    }
  }
}
</script>