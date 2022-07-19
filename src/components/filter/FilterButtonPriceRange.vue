<template>
  <dropdown-button :buttonTitle="priceIndicator" menuTitle="Price Range">
    <div class="flex">
      <dropdown-button-select-box>
        <dropdown-button-select v-model="selectedMin">
          <dropdown-button-select-option 
            v-for="priceRange in priceRanges"
            v-bind:key="priceRange.index" 
            v-bind:value="priceRange.val">
            {{ priceRange.val == "" ? "No Min" : `$${priceRange.name}`}}
          </dropdown-button-select-option>
        </dropdown-button-select>
      </dropdown-button-select-box>
      <button-separator></button-separator>
      <dropdown-button-select-box>
        <dropdown-button-select v-model="selectedMax"> 
          <dropdown-button-select-option 
            v-for="priceRange in priceRanges"
            v-bind:key="priceRange.index" 
            v-bind:value="priceRange.val">
            {{ priceRange.val == "" ? "No Max" : `$${priceRange.name}`}}
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
      {
        val:"",
        name: "No"
      },
      {
        val:10000,
        name: "10K"
      },
      {
        val:20000,
        name: "20K"
      },
      {
        val:40000,
        name: "40K"
      },
      {
        val:80000,
        name: "80K"
      },
      {
        val:100000,
        name: "100K"
      },
      {
        val:200000,
        name: "200K"
      },
      {
        val:400000,
        name: "400K"
      },
      {
        val:800000,
        name: "800K"
      },
      {
        val:1000000,
        name: "1M"
      },
      {
        val:1500000,
        name: "1.5M"
      }, 
       
    ]);
    const store = useStore();
    const selectedMin = ref("");
    const selectedMax = ref("");
    const priceIndicator = ref("");

    watchEffect(() => {
      let minRange = selectedMin.value;
      let maxRange = selectedMax.value;

      if (minRange == ""){
        store.commit("setMinPriceRange", minRange);
        store.commit("setMaxPriceRange", minRange);
      }
      if (!maxRange){
        store.commit("setMaxPriceRange", maxRange);
      }
      if (!minRange && maxRange) {
        selectedMin.value = "";
        selectedMax.value = "";
        store.commit("setMinPriceRange", minRange);
      };
      if (minRange){
        store.commit("setMinPriceRange", minRange);
      };
      if (minRange && maxRange){
        if (maxRange < minRange){

          selectedMin.value = maxRange;
          selectedMax.value = "";
          store.commit("setMinPriceRange", maxRange);
          store.commit("setMaxPriceRange", selectedMax.value);
        } 
        if (maxRange > minRange){
          store.commit("setMaxPriceRange", maxRange);
        }
        if (minRange == maxRange){
          store.commit("setMaxPriceRange", maxRange);
        }
      };

      let maxInfo = `- ${selectedMax.value}`;
      priceIndicator.value = 
        !selectedMin.value && !selectedMax.value 
          ? "Any Price" 
          : !selectedMax.value
          ? selectedMin.value
          : `${selectedMin.value} ${maxInfo}`

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