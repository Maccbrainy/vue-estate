<template>
  <dropdown-button :buttonTitle="priceIndicator" menuTitle="Price Range">
    <div class="flex">
      <dropdown-button-select-box>
        <dropdown-button-select v-model="selectedMin">
          <dropdown-button-select-option value>
            No Min
          </dropdown-button-select-option>
          <dropdown-button-select-option 
            v-for="priceRange in priceRanges"
            v-bind:key="priceRange.index" 
            v-bind:value="priceRange">
            ${{ priceRange }}
          </dropdown-button-select-option>
        </dropdown-button-select>
      </dropdown-button-select-box>
      <button-separator></button-separator>
      <dropdown-button-select-box>
        <dropdown-button-select v-model="selectedMax"> 
          <dropdown-button-select-option value>
            No Max
          </dropdown-button-select-option>
          <dropdown-button-select-option 
            v-for="priceRange in priceRanges"
            v-bind:key="priceRange.index" 
            v-bind:value="priceRange">
            ${{ priceRange }}
          </dropdown-button-select-option>
        </dropdown-button-select>
      </dropdown-button-select-box>
    </div>
  </dropdown-button>
</template>
<script>
import { 
  DropdownButton, 
  ButtonSeparator, 
  DropdownButtonSelect, 
  DropdownButtonSelectBox, 
  DropdownButtonSelectOption, 
} from "@/components/buttonui/index";
import { ref, watchEffect, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "FilterButtonRange",
  components: {
    DropdownButton,
    ButtonSeparator,
    DropdownButtonSelect,
    DropdownButtonSelectBox,
    DropdownButtonSelectOption,
  },
  setup() {
    const priceRanges = ref([ 
      10000, 20000, 30000, 40000, 600000, 700000, 800000, 900000 
    ]);
    const store = useStore();
    const selectedMin = ref("");
    const selectedMax = ref("");

    const priceIndicator = computed(() =>{
      return !selectedMin.value && !selectedMax.value 
        ? "Any Price" 
        : `${selectedMin.value} - ${selectedMax.value}`
    });

    // console.log("Min:", selectedMin.value);
    // console.log("Max:", selectedMax.value);

    watchEffect(() => {
      let minRange = selectedMin.value;
      let maxRange = selectedMax.value;

      store.commit("setMinPriceRange", minRange);
      store.commit("setMaxPriceRange", maxRange);
      // console.log("minRange price value:", minRange); 
      // console.log("maxRange price value:", maxRange); 
    });

    return {
      priceRanges,
      selectedMin,
      selectedMax,
      priceIndicator

    }
  }
}
</script>