<template>
  <div 
    class="
      h-full 
      bg-white 
      shadow-lg 
      rounded-lg 
      z-40 
      text-base text-gray-600 
      font-normal">
    <div class="h-2/3 px-2 pb-8 overflow-y-auto overflow-x-hidden sm:pt-6">
      <filter-route-tab></filter-route-tab>
      <dropdown-button-fieldset class="hidden mf:block" fieldsetTitle="Price">
        <filter-core-price-range></filter-core-price-range>
      </dropdown-button-fieldset>
      <dropdown-button-fieldset 
        class="hidden mf:block" 
        fieldsetTitle="Bedrooms">
        <filter-core-bedrooms></filter-core-bedrooms>
      </dropdown-button-fieldset>
      <dropdown-button-fieldset 
        v-show="isRentPage" 
        class="hidden mf:block" 
        fieldsetTitle="Pets Allowed">
        <button-radio v-model:value="isDogsAllowed">Dogs Allowed</button-radio>
        <button-radio v-model:value="isCatsAllowed">Cats Allowed</button-radio>
      </dropdown-button-fieldset>
      <dropdown-button-fieldset 
        class="hidden mf:block" 
        fieldsetTitle="Home Type">
        <filter-core-home-types v-bind:listOptions="homeTypes">
        </filter-core-home-types>
      </dropdown-button-fieldset>
      <dropdown-button-fieldset v-if="!isSoldPage" fieldsetTitle="Features">
        <filter-core-features 
          v-bind:listOptionsOnSales="featuresOnSalePage"
          v-bind:listOptionsOnRentals="featuresOnRentPage"
          v-bind:routeTypes="routeNames">
        </filter-core-features>
      </dropdown-button-fieldset>
      <dropdown-button-fieldset 
        v-if="isBuyPage" 
        fieldsetTitle="More Property Types">
        <button-radio v-model:value="foreclosureOnly">
          Foreclosures Only</button-radio>
        <button-radio v-model:value="isNewConstruction">
          New Constructions</button-radio>
        <button-radio v-model:value="isNewPlan">
          Homes not yet built</button-radio>
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
              v-bind:value="searchRadiusInMile.id">
              {{ searchRadiusInMile.title}}
            </dropdown-button-select-option>
          </dropdown-button-select>
        </dropdown-button-select-box>
      </dropdown-button-fieldset>
      <dropdown-button-fieldset fieldsetTitle="Square Feet">
        <div class="flex">
          <button-input 
            v-model:in-focus="squarefeetMinFocus" 
            v-model:search-text="squarefeetMin" 
            placeholder="No Min">
          </button-input>
          <button-separator></button-separator>
          <button-input 
            v-model:in-focus="squarefeetMaxFocus" 
            v-model:search-text="squarefeetMax"
            placeholder="No Max">
          </button-input>
        </div>
      </dropdown-button-fieldset>
      <dropdown-button-fieldset fieldsetTitle="Lot Size">
        <dropdown-button-select-box>
          <dropdown-button-select v-model="lotSize">
            <dropdown-button-select-option 
              v-for="lotSizeAcreage in lotSizeAcreages"
              v-bind:key="lotSizeAcreage.title"
              v-bind:value="lotSizeAcreage.id">
              {{ lotSizeAcreage.title }}
            </dropdown-button-select-option>
          </dropdown-button-select>
        </dropdown-button-select-box>
      </dropdown-button-fieldset>
      <dropdown-button-fieldset fieldsetTitle="Year Built">
        <!-- <filter-core-year-built></filter-core-year-built> -->
        <div class="flex">
          <button-input 
            v-model:search-text="ageMin" 
            v-model:in-focus="ageMinFocus" 
            placeholder="Min Year">
          </button-input>
          <button-separator></button-separator>
          <button-input 
            v-model:search-text="ageMax" 
            v-model:in-focus="ageMaxFocus" 
            placeholder="Max Year">
          </button-input>
        </div>
      </dropdown-button-fieldset>
      <dropdown-button-fieldset fieldsetTitle="MLS#">
        <button-input 
          placeholder="MLS#" 
          v-model:in-focus="mlsFocus" 
          v-model:search-text="mlsFind">
        </button-input>
      </dropdown-button-fieldset>
      <dropdown-button-fieldset v-if="isBuyPage">
        <button-radio v-model:value="isMatterPorts">3D tours Only</button-radio>
        <button-radio v-model:value="hasOpenHousesOnly">
          Open Houses</button-radio>
        <button-radio v-model:value="isContingent">
          Contingents Only</button-radio>
      </dropdown-button-fieldset>
    </div>
    <div 
      class="
        w-full 
        absolute 
        md:bottom-0 
        bottom-16 
        px-4 py-2 
        bg-white 
        lm:rounded-lg">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { ref, watchEffect, computed } from "vue";
import settingsData from "@/api/settingsData.json";
import { useStore } from "vuex";
import { 
  FilterRouteTab, 
  FilterCorePriceRange,
  FilterCoreBedrooms,
  FilterCoreHomeTypes,
  FilterCoreFeatures,
  FilterCoreBathrooms,
  // FilterCoreYearBuilt
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
export default ({
  components: {
    ButtonInput,
    ButtonSeparator,
    ButtonRadio,
    DropdownButtonFieldset,
    DropdownButtonSelectBox,
    DropdownButtonSelect,
    DropdownButtonSelectOption,
    // FilterCoreYearBuilt,
    FilterCoreBathrooms,
    FilterCoreFeatures,
    FilterCoreHomeTypes,
    FilterCoreBedrooms,
    FilterCorePriceRange,
    FilterRouteTab,
  },
  setup() {
    const store = useStore();
    const activeRouteTab = ref("");
    // const filterMoreIsActive = ref(false);

    const routeNames = ref([...settingsData.routeNames]);
    const homeTypes = ref([...settingsData.homeTypes]);
    const searchRadiusesInMiles = ref([...settingsData.searchRadiusInMiles]);
    const featuresOnSalePage = ref([...settingsData.typeFeatures]);
    const featuresOnRentPage = ref([...settingsData.typeAmenities]);
    const lotSizeAcreages = ref([...settingsData.lotSizes]);

    // const checkedTypeOfListing = ref([]);

    const squarefeetMinFocus = ref(null);
    const squarefeetMaxFocus = ref(null);
    const ageMinFocus = ref(null);
    const ageMaxFocus = ref(null);
    const mlsFocus = ref(null);

    const squarefeetMin = ref("");
    const squarefeetMax = ref("");
    const ageMin = ref("");
    const ageMax = ref("");
    const lotSize = ref(lotSizeAcreages.value[0].id);
    const searchRadius = ref(searchRadiusesInMiles.value[0].id);
    const isDogsAllowed = ref(false);
    const isCatsAllowed = ref(false);
    const foreclosureOnly = ref(false);
    const hasOpenHousesOnly = ref(false);
    const isMatterPorts = ref(false); 
    const isNewConstruction = ref(false); 
    const isContingent = ref(false); 
    const isNewPlan = ref(false);
    const mlsFind = ref("");

    const isBuyPage = ref(Boolean);
    const isRentPage = ref(Boolean);
    const isSoldPage = ref(Boolean);

    const getActiveRoutePath = computed(
      () => store.getters.getIsActiveRouteTab);

    watchEffect(() => {
      let regExpNumbersOnly = /^\d+$/;
      let ageMinIsANumber = regExpNumbersOnly.test(ageMin.value) ? true : false;
      if (!ageMin.value && !ageMinFocus.value){
        console.log("ageMin text:", "");
      }
      if (!ageMinFocus.value && ageMinIsANumber && ageMin.value.length == 4){
        console.log("ageMinOnly text:", ageMin.value);
      }
    });
    
    watchEffect(() => {
      let yearAgeMin = ageMin.value;
      let yearAgeMax = ageMax.value;
      let regExpNumbersOnly = /^\d+$/;
      let ageMaxIsANumber = regExpNumbersOnly.test(ageMax.value) ? true : false;

      if (!yearAgeMax && !ageMinFocus.value && !ageMaxFocus.value){
        console.log("ageMax text:", "");
      }
      if (
        !ageMaxFocus.value && 
        ageMaxIsANumber && 
        ageMax.value.length == 4 && 
        !ageMinFocus.value
      ){
        if (!yearAgeMin) {
          ageMin.value = 0;
        }
        if (yearAgeMin > yearAgeMax) {
          ageMin.value = yearAgeMax;
          ageMax.value = yearAgeMin;
          console.log("ageMin text:", ageMin.value);
        }
        // let isAgeMin = ageMin.value == 0 ? "" : ageMin.value;
        let isAgeMax = ageMax.value;
        console.log("ageMax text:", isAgeMax);
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
        squarefeetMin.value.length > 2){
        console.log("squarefeetMin text:", squarefeetMin.value);
        console.log("sqftMin Is in focus:", squarefeetMinFocus.value);
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
        squarefeetMax.value.length > 2){
        console.log("squarefeetMax text:", squarefeetMax.value);
        console.log("sqftMax Is in focus:", squarefeetMaxFocus.value);
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
    watchEffect(() => {
      let dogsAreAllowed = isDogsAllowed.value ? isDogsAllowed.value : "";
      store.commit("setIsDogsAllowed", dogsAreAllowed);
    });
    watchEffect(() => {
      let catsAreAllowed = isCatsAllowed.value ? isCatsAllowed.value : "";
      store.commit("setIsCatsAllowed", catsAreAllowed);
    });
    watchEffect(() => {
      let foreclosure = foreclosureOnly.value ? foreclosureOnly.value : "";
      store.commit("setIsForeclosuresOnly", foreclosure);
    });
    watchEffect(() => {
      let hasOpenHouses = hasOpenHousesOnly.value ? hasOpenHousesOnly.value : "";
      store.commit("setIsHasOpenHousesOnly", hasOpenHouses);
    });
    watchEffect(() => {
      let has3Dtour = isMatterPorts.value ? isMatterPorts.value : "";
      store.commit("setIsMatterPorts", has3Dtour);
    });
    watchEffect(() => {
      let newConstruction = isNewConstruction.value 
        ? isNewConstruction.value 
        : "";
      store.commit("setIsNewConstructions", newConstruction);
    });
    watchEffect(() => {
      let contingentOnly = isContingent.value ? isContingent.value : "";
      store.commit("setIsContingents", contingentOnly);
    });
    watchEffect(() => {
      let yetToBeBuilt = isNewPlan.value ? isNewPlan.value : "";
      store.commit("setIsNewPlans", yetToBeBuilt);
    });
    watchEffect(() => {
      if (!mlsFocus.value && mlsFind.value)
        alert("MLS# Search Filter coming soon!");
    });

    watchEffect(() => {
      isBuyPage.value = 
        getActiveRoutePath.value == routeNames.value[0].id ? true : false;
      isRentPage.value = 
        getActiveRoutePath.value == routeNames.value[1].id ? true : false;
      isSoldPage.value = 
        getActiveRoutePath.value == routeNames.value[2].id ? true : false;
    });

    return {
      // isANumberProp,
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
      // checkedTypeOfListing,
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
    }
  }
})
</script>