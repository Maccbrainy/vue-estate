<template>
  <dropdown-button
    v-bind:filterActivated="buttonActivated" 
    v-bind:buttonTitle="priceIndicator" 
    menuTitle="Price Range">
    <div class="flex">
      <dropdown-button-select-box>
        <dropdown-button-select v-model="selectedMin">
          <dropdown-button-select-option 
            v-for="(priceRange, index) in priceRanges"
            v-bind:key="index"
            v-bind:value="priceRange">
            {{ index == 0 ? "No Min" : `$${priceRange}`}}
          </dropdown-button-select-option>
        </dropdown-button-select>
      </dropdown-button-select-box>
      <button-separator></button-separator>
      <dropdown-button-select-box>
        <dropdown-button-select v-model="selectedMax"> 
          <dropdown-button-select-option 
            v-for="(priceRange, index) in priceRanges"
            v-bind:key="index" 
            v-bind:value="priceRange">
            {{ index == 0 ? "No Max" : `$${priceRange}`}}
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
import { convertLetterKToZeros, convertLetterMToZeros } from "@/helper";
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
      "0",
      "10k",
      "20k",
      "30k",
      "50k",
      "100k",
      "130k",
      "150k",
      "200k",
      "300k",
      "400k",
      "500k",
      "600k",
      "700k",
      "800k",
      "900k",
      "1m",
      "1.5m",
      "2m",
      "5m",
      "7m",
      "10m"
    ]);
    const store = useStore();
    const selectedMin = ref(priceRanges.value[0]);
    const selectedMax = ref(priceRanges.value[0]);
    const priceIndicator = ref("");

    watchEffect(() => {
      let minPrice = 
        selectedMin.value == priceRanges.value[0] 
          ? null 
          : convertLetterKToZeros(selectedMin.value, convertLetterMToZeros);
      let maxPrice = 
        selectedMax.value == priceRanges.value[0] 
          ? null 
          : convertLetterKToZeros(selectedMax.value, convertLetterMToZeros);

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

      let maxInfo = `- $${selectedMax.value}`;
      priceIndicator.value = 
        selectedMin.value == 0 && selectedMax.value == 0
          ? "Any Price" 
          : selectedMax.value == 0
          ? `$${selectedMin.value}+`
          : `$${selectedMin.value} ${maxInfo}`
    });

    const buttonActivated = computed(() => {
      return priceIndicator.value == "Any Price" ? false : true;
    });

    return {
      priceRanges,
      selectedMin,
      selectedMax,
      priceIndicator,
      buttonActivated
    }
  }
}
</script>