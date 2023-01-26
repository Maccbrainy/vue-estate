<template>
  <div
    class="
      h-2/3
      px-2
      pb-8
      overflow-y-auto overflow-x-hidden
      sm:pt-6
      overscroll-contain
    "
    tabindex="-1"
  >
    <filter-route-tab></filter-route-tab>
    <dropdown-button-fieldset class="hidden xlm:block" fieldsetTitle="Price">
      <filter-core-price-range></filter-core-price-range>
    </dropdown-button-fieldset>
    <dropdown-button-fieldset class="hidden xlm:block" fieldsetTitle="Bedrooms">
      <filter-core-bedrooms></filter-core-bedrooms>
    </dropdown-button-fieldset>
    <dropdown-button-fieldset
      v-show="isRentPage"
      class="hidden xlm:block"
      fieldsetTitle="Pets Allowed"
    >
      <button-radio @click="dogsHandler" v-model:value="isDogsAllowed"
        >Dogs Allowed</button-radio
      >
      <button-radio @click="catsHandler" v-model:value="isCatsAllowed"
        >Cats Allowed</button-radio
      >
    </dropdown-button-fieldset>
    <dropdown-button-fieldset
      class="hidden xlm:block"
      fieldsetTitle="Home Type"
    >
      <filter-core-home-types v-bind:listOptions="homeTypes">
      </filter-core-home-types>
    </dropdown-button-fieldset>
    <dropdown-button-fieldset
      v-if="isBuyPage || isRentPage"
      fieldsetTitle="Features"
    >
      <filter-core-features
        v-bind:listOptionsOnSales="featuresOnSalePage"
        v-bind:listOptionsOnRentals="featuresOnRentPage"
        v-bind:routeTypes="routeNames"
      >
      </filter-core-features>
    </dropdown-button-fieldset>
    <dropdown-button-fieldset
      v-show="isBuyPage"
      fieldsetTitle="More Property Types"
    >
      <button-radio @click="foreclosureHandler" v-model:value="foreclosureOnly">
        Foreclosures Only</button-radio
      >
      <button-radio
        @click="isNewConstructionHandler"
        v-model:value="isNewConstruction"
      >
        New Constructions</button-radio
      >
      <button-radio @click="isNewPlanHandler" v-model:value="isNewPlan">
        Homes not yet built</button-radio
      >
    </dropdown-button-fieldset>
    <dropdown-button-fieldset fieldsetTitle="Bathrooms">
      <filter-core-bathrooms></filter-core-bathrooms>
    </dropdown-button-fieldset>
    <dropdown-button-fieldset fieldsetTitle="Search Radius (Miles Away)">
      <dropdown-button-select-box>
        <dropdown-button-select v-model="searchRadius">
          <dropdown-button-select-option
            v-for="searchRadiusInMile in searchRadiusesInMiles"
            v-bind:key="searchRadiusInMile.title"
            v-bind:value="searchRadiusInMile.id"
          >
            {{ searchRadiusInMile.title }}
          </dropdown-button-select-option>
        </dropdown-button-select>
      </dropdown-button-select-box>
    </dropdown-button-fieldset>
    <dropdown-button-fieldset fieldsetTitle="Square Feet">
      <div class="flex">
        <button-input
          v-model:in-focus="squarefeetMinFocus"
          v-model:search-text="squarefeetMin"
          placeholder="No Min"
        >
        </button-input>
        <button-separator></button-separator>
        <button-input
          v-model:in-focus="squarefeetMaxFocus"
          v-model:search-text="squarefeetMax"
          placeholder="No Max"
        >
        </button-input>
      </div>
    </dropdown-button-fieldset>
    <dropdown-button-fieldset fieldsetTitle="Lot Size">
      <dropdown-button-select-box>
        <dropdown-button-select v-model="lotSize">
          <dropdown-button-select-option
            v-for="lotSizeAcreage in lotSizeAcreages"
            v-bind:key="lotSizeAcreage.title"
            v-bind:value="lotSizeAcreage.id"
          >
            {{ lotSizeAcreage.title }}
          </dropdown-button-select-option>
        </dropdown-button-select>
      </dropdown-button-select-box>
    </dropdown-button-fieldset>
    <dropdown-button-fieldset fieldsetTitle="Year Built">
      <div class="flex">
        <button-input
          v-model:search-text="ageMin"
          v-model:in-focus="ageMinFocus"
          placeholder="Min Year"
        >
        </button-input>
        <button-separator></button-separator>
        <button-input
          v-model:search-text="ageMax"
          v-model:in-focus="ageMaxFocus"
          placeholder="Max Year"
        >
        </button-input>
      </div>
    </dropdown-button-fieldset>
    <dropdown-button-fieldset fieldsetTitle="MLS#">
      <button-input
        placeholder="MLS#"
        v-model:in-focus="mlsFocus"
        v-model:search-text="mlsFind"
      >
      </button-input>
    </dropdown-button-fieldset>
    <dropdown-button-fieldset v-show="isBuyPage">
      <button-radio @click="threeDHandler" v-model:value="isMatterPorts">
        3D tours Only</button-radio
      >
      <button-radio
        @click="openHousesHandler"
        v-model:value="hasOpenHousesOnly"
      >
        Open Houses</button-radio
      >
      <button-radio @click="contingentHandler" v-model:value="isContingent">
        Contingents Only</button-radio
      >
    </dropdown-button-fieldset>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { ref, watchEffect, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import settingsData from "@/api/settingsData.json";

import {
  FilterRouteTab,
  FilterCorePriceRange,
  FilterCoreBedrooms,
  FilterCoreHomeTypes,
  FilterCoreFeatures,
  FilterCoreBathrooms,
} from "@/components/filter";
import {
  ButtonSeparator,
  ButtonInput,
  ButtonRadio,
  DropdownButtonFieldset,
  DropdownButtonSelectBox,
  DropdownButtonSelect,
  DropdownButtonSelectOption,
} from "@/components/buttonui";
export default {
  components: {
    ButtonInput,
    ButtonSeparator,
    ButtonRadio,
    DropdownButtonFieldset,
    DropdownButtonSelectBox,
    DropdownButtonSelect,
    DropdownButtonSelectOption,
    FilterCoreBathrooms,
    FilterCoreFeatures,
    FilterCoreHomeTypes,
    FilterCoreBedrooms,
    FilterCorePriceRange,
    FilterRouteTab,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const activeRouteTab = ref("");
    const routeNames = ref([...settingsData.routeNames]);
    const homeTypes = ref([...settingsData.homeTypes]);
    const searchRadiusesInMiles = ref([...settingsData.searchRadiusInMiles]);
    const featuresOnSalePage = ref([...settingsData.typeFeatures]);
    const featuresOnRentPage = ref([...settingsData.typeAmenities]);
    const lotSizeAcreages = ref([...settingsData.lotSizes]);

    const storeData = computed(() => store.getters.getStore);

    const isDogsAllowed = ref("");
    const isCatsAllowed = ref("");
    const foreclosureOnly = ref("");
    const hasOpenHousesOnly = ref("");
    const isMatterPorts = ref("");
    const isNewConstruction = ref("");
    const isContingent = ref("");
    const isNewPlan = ref("");

    const mlsFind = ref("");
    const squarefeetMinFocus = ref(null);
    const squarefeetMaxFocus = ref(null);
    const ageMinFocus = ref(null);
    const ageMaxFocus = ref(null);
    const mlsFocus = ref(null);

    const squarefeetMin = ref("");
    const squarefeetMax = ref("");
    const ageMin = ref(storeData.value.propertyFilters.age_min);
    const ageMax = ref(storeData.value.propertyFilters.age_max);
    const lotSize = ref(
      storeData.value.propertyFilters.lotSize || lotSizeAcreages.value[0].id
    );
    const searchRadius = ref(
      storeData.value.propertyFilters.searchRadius ||
        searchRadiusesInMiles.value[0].id
    );

    watchEffect(() => {
      isDogsAllowed.value = storeData.value.propertyFilters.allowsDogs;
      isCatsAllowed.value = storeData.value.propertyFilters.allowsCats;
      foreclosureOnly.value = storeData.value.propertyFilters.isForeclosures;
      hasOpenHousesOnly.value = storeData.value.propertyFilters.hasOpenHouses;
      isMatterPorts.value = storeData.value.propertyFilters.has3DTours;
      isNewConstruction.value =
        storeData.value.propertyFilters.isNewConstructions;
      isContingent.value = storeData.value.propertyFilters.isContingents;
      isNewPlan.value = storeData.value.propertyFilters.isNewPlans;
    });
    watchEffect(() => {
      let regExpNumbersOnly = /^\d+$/;
      let ageMinIsANumber = regExpNumbersOnly.test(ageMin.value) ? true : false;
      if (!ageMin.value && !ageMinFocus.value) {
        store.commit("setYearBuiltAgeMin", "");
      }
      if (!ageMinFocus.value && ageMinIsANumber && ageMin.value.length == 4) {
        store.commit("setYearBuiltAgeMin", ageMin.value);
      }
    });

    watchEffect(() => {
      let yearAgeMin = ageMin.value;
      let yearAgeMax = ageMax.value;
      let regExpNumbersOnly = /^\d+$/;
      let ageMaxIsANumber = regExpNumbersOnly.test(ageMax.value) ? true : false;

      if (!yearAgeMax && !ageMinFocus.value && !ageMaxFocus.value) {
        store.commit("setYearBuiltAgeMax", "");
      }
      if (
        !ageMaxFocus.value &&
        ageMaxIsANumber &&
        ageMax.value.length == 4 &&
        !ageMinFocus.value
      ) {
        if (!yearAgeMin) {
          ageMin.value = 0;
        }
        if (yearAgeMin > yearAgeMax) {
          ageMin.value = yearAgeMax;
          ageMax.value = yearAgeMin;
          store.commit("setYearBuiltAgeMin", ageMin.value);
        }
        // let isAgeMin = ageMin.value == 0 ? "" : ageMin.value;
      }
    });
    watchEffect(() => {
      let regExpNumbersOnly = /^\d+$/;
      let isANumberProp = regExpNumbersOnly.test(squarefeetMin.value)
        ? true
        : false;
      if (
        !squarefeetMinFocus.value &&
        isANumberProp &&
        squarefeetMin.value.length > 2
      ) {
        alert(squarefeetMin.value, squarefeetMinFocus.value);
      }
    });
    watchEffect(() => {
      let regExpNumbersOnly = /^\d+$/;
      let isANumberProp = regExpNumbersOnly.test(squarefeetMax.value)
        ? true
        : false;
      if (
        !squarefeetMaxFocus.value &&
        isANumberProp &&
        squarefeetMax.value.length > 2
      ) {
        alert(squarefeetMax.value);
        // console.log("squarefeetMax text:", squarefeetMax.value);
        // console.log("sqftMax Is in focus:", squarefeetMaxFocus.value);
      }
    });
    watchEffect(() => {
      let sizeOfLot = lotSize.value == 0 ? "" : lotSize.value;
      store.commit("setLotSize", sizeOfLot);
    });
    watchEffect(() => {
      let radius = searchRadius.value == 0 ? "" : searchRadius.value;
      store.commit("setSearchRadius", radius);
    });
    function dogsHandler() {
      let dogsAreAllowed = isDogsAllowed.value ? "" : true;
      store.commit("setIsDogsAllowed", dogsAreAllowed);
    }
    function catsHandler() {
      let catsAreAllowed = isCatsAllowed.value ? "" : true;
      store.commit("setIsCatsAllowed", catsAreAllowed);
    }
    function foreclosureHandler() {
      let foreclosure = foreclosureOnly.value ? "" : true;
      store.commit("setIsForeclosuresOnly", foreclosure);
    }
    function openHousesHandler() {
      let hasOpenHouses = hasOpenHousesOnly.value ? "" : true;
      store.commit("setIsHasOpenHousesOnly", hasOpenHouses);
    }
    function threeDHandler() {
      let has3Dtour = isMatterPorts.value ? "" : true;
      store.commit("setIsMatterPorts", has3Dtour);
    }
    function isNewConstructionHandler() {
      let newConstruction = isNewConstruction.value ? "" : true;
      store.commit("setIsNewConstructions", newConstruction);
    }
    function contingentHandler() {
      let contingentOnly = isContingent.value ? "" : true;
      store.commit("setIsContingents", contingentOnly);
    }
    function isNewPlanHandler() {
      let yetToBeBuilt = isNewPlan.value ? "" : true;
      store.commit("setIsNewPlans", yetToBeBuilt);
    }
    watchEffect(() => {
      if (!mlsFocus.value && mlsFind.value)
        alert("MLS# Search Filter coming soon!");
    });

    const isBuyPage = computed(() =>
      storeData.value.activeRoutePath == routeNames.value[0].id ? true : false
    );
    const isRentPage = computed(() =>
      storeData.value.activeRoutePath == routeNames.value[1].id ? true : false
    );
    const isSoldPage = computed(() =>
      storeData.value.activeRoutePath == routeNames.value[2].id ? true : false
    );

    watchEffect(() => {
      let isHasOpenHouses = route.query.hasOpenHouses || "";
      store.commit("setIsHasOpenHousesOnly", isHasOpenHouses);
      let isNewConstruction = route.query.newConstruction || "";
      store.commit("setIsNewConstructions", isNewConstruction);
    });
    onBeforeMount(() => {
      if (route.query.lotSize) {
        lotSize.value = route.query.lotSize;
        store.commit("setLotSize", lotSize.value);
      }
      if (route.query.hasOpenHouses) {
        hasOpenHousesOnly.value = route.query.hasOpenHouses;
        store.commit("setIsHasOpenHousesOnly", hasOpenHousesOnly.value);
      }
      if (route.query.has3DTours) {
        isMatterPorts.value = route.query.has3DTours;
        store.commit("setIsMatterPorts", isMatterPorts.value);
      }
      if (route.query.foreClosure) {
        foreclosureOnly.value = route.query.foreClosure;
        store.commit("setIsForeclosuresOnly", foreclosureOnly.value);
      }
      if (route.query.newConstruction) {
        isNewConstruction.value = route.query.newConstruction;
        store.commit("setIsNewConstructions", isNewConstruction.value);
      }
      if (route.query.newPlans) {
        isNewPlan.value = route.query.newPlans;
        store.commit("setIsNewPlans", isNewPlan.value);
      }
      if (route.query.radius) {
        searchRadius.value = route.query.radius;
        store.commit("setSearchRadius", searchRadius.value);
      }
      if (route.query.contingents) {
        isContingent.value = route.query.contingents;
        store.commit("setIsContingents", isContingent.value);
      }
      if (route.query.yearBuiltMin) {
        ageMin.value = route.query.yearBuiltMin;
        store.commit("setIsyearBuiltMin", ageMin.value);
      }
      if (route.query.yearBuiltMax) {
        ageMax.value = route.query.yearBuiltMax;
        store.commit("setIsyearBuiltMax", ageMax.value);
      }
    });
    return {
      routeNames,
      squarefeetMin,
      squarefeetMax,
      squarefeetMinFocus,
      squarefeetMaxFocus,
      ageMin,
      ageMax,
      ageMinFocus,
      ageMaxFocus,
      lotSize,
      lotSizeAcreages,
      homeTypes,
      featuresOnSalePage,
      featuresOnRentPage,
      searchRadius,
      searchRadiusesInMiles,
      activeRouteTab,
      isDogsAllowed,
      isCatsAllowed,
      hasOpenHousesOnly,
      foreclosureOnly,
      isMatterPorts,
      isNewConstruction,
      isContingent,
      isNewPlan,
      isBuyPage,
      isRentPage,
      isSoldPage,
      mlsFocus,
      mlsFind,
      openHousesHandler,
      threeDHandler,
      contingentHandler,
      dogsHandler,
      catsHandler,
      foreclosureHandler,
      isNewConstructionHandler,
      isNewPlanHandler,
    };
  },
};
</script>
