<template>
  <dropdown-button :buttonTitle="priceIndicator" menuTitle="Price Range">
    <div class="flex">
      <dropdown-button-select-box>
        <dropdown-button-select v-model="selectedMin" ref="selectMinRef" @change="minChangeEvent">
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
        <dropdown-button-select v-model="selectedMax" ref="selectMaxRef"> 
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
import { ref, watchEffect } from "vue";
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
      "0",
      "10K",
      "20K",
      "30K",
      "50K",
      "100K",
      "130K",
      "150K",
      "200K",
      "300K",
      "400K",
      "500K",
      "600K",
      "700K",
      "800K",
      "900K",
      "1M",
      "1.5M",
      "2M",
      "10M"
    ]);
    const store = useStore();
    const selectedMin = ref(priceRanges.value[0]);
    const selectedMax = ref(priceRanges.value[0]);
    const minPrice = ref("");
    const maxPrice = ref("");
    const priceIndicator = ref("");
    const selectMinRef = ref([]);
    const selectMaxRef = ref([]);


    watchEffect(() => {
      minPrice.value = 
        selectedMin.value == priceRanges.value[0] 
          ? null 
          : maxChangeEvent(selectedMin.value);
      maxPrice.value = 
        selectedMax.value == priceRanges.value[0] 
          ? null 
          : maxChangeEvent(selectedMax.value);

      if (!minPrice.value){
        selectedMax.value = 0;
        store.commit("setMinPriceRange", minPrice.value);
        store.commit("setMaxPriceRange", minPrice.value);
      }
      if (minPrice.value && maxPrice.value){ 
        let indexMin = selectMinRef.value.$el.selectedIndex;
        let indexMax = selectMaxRef.value.$el.selectedIndex;
        if (maxPrice.value < minPrice.value){
          console.log("IndexMin > IndexMax true:", indexMin);
          console.log("IndexMax > IndexMin false:", indexMax);
          selectedMin.value = selectedMax.value;
          store.commit("setMinPriceRange", maxPrice.value);
          store.commit("setMaxPriceRange", null);
          selectedMax.value = 0;
        }
        if (maxPrice.value > minPrice.value){ 
          store.commit("setMaxPriceRange", maxPrice.value);
        }
        if (minPrice.value == maxPrice.value){
          console.log("IndexMin equality:", indexMin);
          console.log("IndexMax equality:", indexMax);
          store.commit("setMinPriceRange", minPrice.value);
          store.commit("setMaxPriceRange", maxPrice.value);
        }
      }
      if (minPrice.value){
        store.commit("setMinPriceRange", minPrice.value);
      };

      let maxInfo = `- ${selectedMax.value}`;
      priceIndicator.value = 
        selectedMin.value == 0 && selectedMax.value == 0
          ? "Any Price" 
          : selectedMax.value == 0
          ? selectedMin.value
          : `${selectedMin.value} ${maxInfo}`
    });

    const sanitizeMillionPrice = (price) => {
      let splitted = price.split("");
      return splitted.length == 4 || splitted.length == 5  
        ? price.replace(/M/g,"00000").replace(/\./g,"")
        : price.replace(/M/g,"000000").replace(/\./g,"")
    };
    const minChangeEvent = (e) => {
      let price = e.target.value;
      let priceValue = price.endsWith("K") 
        ? price.replace(/K/g,"000")
        : price.endsWith("M") 
        ? sanitizeMillionPrice(price)
        : price;
      return priceValue;
    }
    const maxChangeEvent = (priceTag) => {
      // let price = e.target.value;
      let price = priceTag;
      let priceValue = price.endsWith("K") 
        ? price.replace(/K/g,"000")
        : price.endsWith("M") 
        ? sanitizeMillionPrice(price)
        : price;
      let priceNumber = parseInt(priceValue);
      console.log("Parse Interger:", priceNumber);
      return priceNumber;
    }

    return {
      priceRanges,
      selectedMin,
      selectedMax,
      minPrice,
      maxPrice,
      priceIndicator,
      selectMinRef,
      selectMaxRef,
      minChangeEvent,
      maxChangeEvent

    }
  }
}
</script>