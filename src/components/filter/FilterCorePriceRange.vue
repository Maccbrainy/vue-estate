<template>
  <div class="flex">
    <dropdown-button-select-box>
      <dropdown-button-select v-model="selectedMin">
        <dropdown-button-select-option
          v-for="priceRange in priceRanges"
          v-bind:key="priceRange.title"
          v-bind:value="priceRange.id"
        >
          {{ priceRange.id == 0 ? "No Min" : `$${priceRange.title}` }}
        </dropdown-button-select-option>
      </dropdown-button-select>
    </dropdown-button-select-box>
    <button-separator></button-separator>
    <dropdown-button-select-box>
      <dropdown-button-select v-model="selectedMax">
        <dropdown-button-select-option
          v-for="priceRange in priceRanges"
          v-bind:key="priceRange.title"
          v-bind:value="priceRange.id"
        >
          {{ priceRange.id == 0 ? "No Max" : `$${priceRange.title}` }}
        </dropdown-button-select-option>
      </dropdown-button-select>
    </dropdown-button-select-box>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref, computed, watchEffect, onBeforeMount } from "vue";
import settingsData from "@/api/settingsData.json";
import {
  ButtonSeparator,
  DropdownButtonSelect,
  DropdownButtonSelectBox,
  DropdownButtonSelectOption,
} from "@/components/buttonui/index";
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
    const route = useRoute();
    const routeNames = ref([...settingsData.routeNames]);
    const priceRangesForSale = ref([...settingsData.priceRangesForSale]);
    const priceRangeForRent = ref([...settingsData.priceRangeForRent]);
    const storeData = computed(() => store.getters.getStore);

    const selectedMin = ref(
      storeData.value.propertyFilters.priceMinRange || "0"
    );
    const selectedMax = ref(
      storeData.value.propertyFilters.priceMaxRange || "0"
    );
    const priceIndicator = ref("");

    const priceRanges = computed(() => {
      let pagePriceRange =
        storeData.value.activeRoutePath == routeNames.value[1].id
          ? priceRangeForRent.value
          : priceRangesForSale.value;
      return pagePriceRange;
    });

    function getPriceRangeDataTitle(ranges, rangeValue) {
      let data = ranges.filter((range) => range.id == rangeValue);
      if (rangeValue) {
        if (!data[0]) {
          return ranges[0].id;
        }
        return data[0].title;
      }
      return ranges[0].id;
    }
    watchEffect(() => {
      if (storeData.value.activeRoutePath || priceRanges.value) {
        let minPrice =
          selectedMin.value == 0 ? null : parseInt(selectedMin.value);
        let maxPrice =
          selectedMax.value == 0 ? null : parseInt(selectedMax.value);

        if (!minPrice && maxPrice > 0) {
          store.commit("setMinPriceRange", minPrice);
          store.commit("setMaxPriceRange", maxPrice);
        }
        if (!minPrice && !maxPrice) {
          store.commit("setMinPriceRange", minPrice);
          store.commit("setMaxPriceRange", maxPrice);
        }

        if (minPrice && maxPrice) {
          if (minPrice > maxPrice) {
            let minValue = selectedMin.value;
            selectedMin.value = selectedMax.value;
            selectedMax.value = minValue;

            store.commit("setMinPriceRange", maxPrice);
            store.commit("setMaxPriceRange", minPrice);
          }
          if (maxPrice > minPrice) {
            store.commit("setMinPriceRange", minPrice);
            store.commit("setMaxPriceRange", maxPrice);
          }
          if (minPrice == maxPrice) {
            store.commit("setMinPriceRange", minPrice);
            store.commit("setMaxPriceRange", maxPrice);
          }
        }
        if (minPrice && !maxPrice) {
          store.commit("setMinPriceRange", minPrice);
          store.commit("setMaxPriceRange", maxPrice);
        }

        let minPriceTitle = getPriceRangeDataTitle(
          priceRanges.value,
          selectedMin.value
        );
        let maxTitle = getPriceRangeDataTitle(
          priceRanges.value,
          selectedMax.value
        );

        let maxPriceTitle = `- $${maxTitle}`;
        priceIndicator.value =
          selectedMin.value == 0 && selectedMax.value == 0
            ? "Any Price"
            : selectedMax.value == 0
            ? `$${minPriceTitle}+`
            : `$${minPriceTitle}${maxPriceTitle}`;
        store.commit("setPriceRangeInfo", priceIndicator.value);
      }
    });
    onBeforeMount(() => {
      if (route.query.priceMin) {
        selectedMin.value = route.query.priceMin;
        store.commit("setMinPriceRange", selectedMin.value);
      }
      if (route.query.priceMax) {
        selectedMax.value = route.query.priceMax;
        store.commit("setMaxPriceRange", selectedMax.value);
      }
    });

    return {
      routeNames,
      priceRanges,
      priceRangesForSale,
      priceRangeForRent,
      selectedMin,
      selectedMax,
      priceIndicator,
    };
  },
};
</script>
