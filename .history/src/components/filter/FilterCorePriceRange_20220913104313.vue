<template>
  <div class="flex">
    <dropdown-button-select-box>
      <dropdown-button-select v-model="selectedMin">
        <dropdown-button-select-option 
          v-for="priceRange in priceRanges"
          v-bind:key="priceRange.title"
          v-bind:value="priceRange.id">
          {{ priceRange.id == 0 ? "No Min" : `$${priceRange.title}`}}
        </dropdown-button-select-option>
      </dropdown-button-select>
    </dropdown-button-select-box>
    <button-separator></button-separator>
    <dropdown-button-select-box>
      <dropdown-button-select v-model="selectedMax"> 
        <dropdown-button-select-option 
          v-for="priceRange in priceRanges"
          v-bind:key="priceRange.title" 
          v-bind:value="priceRange.id">
          {{ priceRange.id == 0 ? "No Max" : `$${priceRange.title}`}}
        </dropdown-button-select-option>
      </dropdown-button-select>
    </dropdown-button-select-box>
  </div>
</template>
<script>
import { 
  ButtonSeparator, 
  DropdownButtonSelect, 
  DropdownButtonSelectBox, 
  DropdownButtonSelectOption, 
} from "@/components/buttonui/index";
import { ref, watchEffect, computed } from "vue";
import { useStore } from "vuex";
import settingsData from "@/api/settingsData.json";
export default {
  name: "FilterCorePriceRange",
  components: {
    ButtonSeparator,
    DropdownButtonSelect,
    DropdownButtonSelectBox,
    DropdownButtonSelectOption,
  },
  setup() {
    const store = useStore();
    const routeNames = ref([...settingsData.routeNames]);
    const priceRangesForSale = ref([...settingsData.priceRangesForSale]);
    const priceRangeForRent = ref([...settingsData.priceRangeForRent]);

    const getMinPriceRange = computed(
      () => store.getters.getPriceRangeMin || "0");
    const getMaxPriceRange = computed(
      () => store.getters.getPriceRangeMax || "0");

    const selectedMin = ref(getMinPriceRange.value);
    const selectedMax = ref(getMaxPriceRange.value);
    const priceIndicator = ref("");

    const getIsActiveRouteTab = computed(
      () => store.getters.getIsActiveRouteTab
    ); 
    const priceRanges = computed(() => {
      resetRangeValues()
      return getIsActiveRouteTab.value == routeNames.value[1].id
        ? priceRangeForRent.value
        : priceRangesForSale.value;
    })
    function resetRangeValues(){
      selectedMin.value = 0;
      selectedMax.value = 0;
    }
    watchEffect(() => {
      let minPrice = 
        selectedMin.value == 0 ? null : parseInt(selectedMin.value);
      let maxPrice = 
        selectedMax.value == 0 ? null : parseInt(selectedMax.value);
 
      if (!minPrice && maxPrice > 0){
        store.commit("setMinPriceRange", minPrice);
        store.commit("setMaxPriceRange", maxPrice);
      }
      if (!minPrice && !maxPrice){
        store.commit("setMinPriceRange", minPrice);
        store.commit("setMaxPriceRange", maxPrice);
      }

      if (minPrice && maxPrice){ 

        if (minPrice > maxPrice){

          console.log("minPrice is greaterthan maxPrice");

          let minValue = selectedMin.value;
          selectedMin.value = selectedMax.value;
          selectedMax.value = minValue;

          store.commit("setMinPriceRange", maxPrice);
          store.commit("setMaxPriceRange", minPrice);
        }
        if (maxPrice > minPrice){
          store.commit("setMinPriceRange", minPrice);
          store.commit("setMaxPriceRange", maxPrice);
        }
        if (minPrice == maxPrice){
          store.commit("setMinPriceRange", minPrice);
          store.commit("setMaxPriceRange", maxPrice);
        }
      }
      if (minPrice && !maxPrice){
        store.commit("setMinPriceRange", minPrice);
        store.commit("setMaxPriceRange", maxPrice);
      };

      let minPriceTitle = getPriceRangeDataTitle(priceRanges.value, minPrice);
      let maxTitle = getPriceRangeDataTitle(priceRanges.value, maxPrice);

      let maxPriceTitle = `- $${maxTitle}`;
      priceIndicator.value = 
        !minPrice && !maxPrice
          ? "Any Price" 
          : !maxPrice
          ? `$${minPriceTitle}+`
          : `$${minPriceTitle} ${maxPriceTitle}`;
      store.commit("setPriceRangeInfo", priceIndicator.value);
    });

    function getPriceRangeDataTitle(ranges, rangeValue){
      if (rangeValue){
        let data = ranges.filter((range) => range.id == rangeValue);
        return `${data[0].title}`;
      }
    }

    return {
      routeNames,
      priceRanges,
      priceRangesForSale,
      priceRangeForRent,
      selectedMin,
      selectedMax,
      priceIndicator,
    }
  }
}
</script>