<template>
  <filter-button-container></filter-button-container>
  <div class="flex flex-grow flex-auto flex-col z-0" tabindex="-1">
    <div 
      v-bind:class="{
        'transform -translate-x-full': mapViewChanges
      }" 
      class="w-1/2 sf:w-full block relative flex-1 -bottom-16">
      <div tabindex="-1" class="flex flex-auto flex-col px-2 py-1">
        <div 
          class="flex justify-between flex-col flex-auto flex-start pl-2 pb-2">
          <h2 
            v-if="activeBranch == agentType[1].id" 
            class="bg-gray-100 text-base font-normal text-gray-500 px-4 py-4 mr-3 mb-3">
            Includes homes for sale by owner, plus foreclosures and auctions not listed by agents.
          </h2>
          <div class="pt-1 mb-1">
            <h1 
              v-bind:class="{
                'animate-pulse bg-gray-200 h-6 w-3/4': !listingTitle && isLoading}" 
              class="text-lg font-bold text-gray-600">
              <span v-if="activePropertyListings.length > 0">
                {{ listingTitle }}
              </span>
            </h1>
            <div class="flex w-full justify-between">
              <div class="flex justify-between w-full flex-wrap items-center">
                <h2 
                  v-bind:class="{
                    'animate-pulse bg-gray-200 w-1/2 h-5 mt-4': isLoading }" 
                  class=" text-base font-normal text-gray-500">
                  <span v-if="activePropertyListings.length > 0 && !isLoading"> 
                    {{ activePropertyListings.length }} 
                    {{ propertyCountIsGreaterThanOne }}
                  </span> 
                </h2>
                <filter-button-sorting v-show="activePropertyListings.length > 0">
                </filter-button-sorting>
              </div>
            </div>
          </div>
          <no-search-term-match-for-agent-and-other-listings 
            v-if="filterIsActiveAndAllPropertiesIsZero">
          </no-search-term-match-for-agent-and-other-listings>
          <no-search-term-for-agent-or-other-listings 
            v-if="
              allPropertyListings.length > 0 && 
              activePropertyListings.length < 1">
          </no-search-term-for-agent-or-other-listings>
        </div>
        <is-loading v-if="isLoading"></is-loading>
        <ul 
          v-bind:class="{ 'animate-pulse': isLoading}"
          class="flex flex-wrap">
          <search-result-item-card 
            v-for="home in activePropertyListings"
            v-bind:key="home.property_id"
            v-bind:home="home">
          </search-result-item-card>
        </ul>
      </div>
    </div>
    <no-search-term-match 
      v-if="!filterIsActiveAndAllPropertiesIsZero && !isLoading">
    </no-search-term-match>
    <search-result-google-map v-model:mapView="mapViewChanges">
      <!-- v-bind:discoveredHomes="discoveredHomes" -->
    </search-result-google-map>
  </div>
</template>
<script>
import { ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useFetch } from "@/api/useFetch.js";
import { 
  FilterButtonContainer, 
  FilterButtonSorting 
} from "@/components/filter";
import settingsData from "@/api/settingsData.json";
import IsLoading from "@/components/IsLoading.vue";
import NoSearchTermMatch from "@/components/NoSearchTermMatch.vue";
import NoSearchTermMatchForAgentAndOtherListings from "@/components/NoSearchTermMatchForAgentAndOtherListings.vue";
import NoSearchTermForAgentOrOtherListings from "@/components/NoSearchTermForAgentOrOtherListings.vue";
import SearchResultGoogleMap from "@/components/SearchResultGoogleMap.vue";
import SearchResultItemCard from "@/components/SearchResultItemCard.vue";
import { 
  useListingTitle, 
  useSortListingsByAgentAndOthers,
} from "@/composables";
export default {
  name: "SearchResultContentLayout",
  props: {
    name: String,
    slug: [String, Number],
    city: String,
    title: String,
  },
  components:{
    IsLoading,
    SearchResultGoogleMap,
    SearchResultItemCard,
    FilterButtonContainer,
    NoSearchTermMatch,
    NoSearchTermMatchForAgentAndOtherListings,
    NoSearchTermForAgentOrOtherListings,
    FilterButtonSorting,
},
  setup(props) {
    const store = useStore();
    const activeRouteTab = ref("");
    const allPropertyListings = ref([]);
    const propertyListingByAgent = ref([]);
    const propertyListingByOthers = ref([]);
    const listingTitle = ref("");
    const isLoading = ref(Boolean);
    const mapViewChanges = ref(false);

    const routeNames = ref([...settingsData.routeNames]);
    const agentType = ref([...settingsData.agentType]);

    // const isStateLoading = computed(() => store.getters.getIsLoading);
    const error = computed(() => store.getters.getErrorCatch);
    const searchedData = computed(() => store.getters.getSearchedData );
    const activeBranch = computed(() => store.getters.getActiveBranch);

    const getHomeTypes = computed(() => store.getters.getHomeType);
    const getMinPriceRange = computed(() => store.getters.getPriceRangeMin);
    const getMaxPriceRange = computed(() => store.getters.getPriceRangeMax);
    const getSortingType = computed(() => store.getters.getPropertySorting);
    const getNumberOfBedInProperty = computed(
      () => store.getters.getNumberOfBed);
    const getAllowsCats = computed(() => store.getters.getAllowsCats);
    const getAllowsDogs = computed(() => store.getters.getAllowsDogs);

    const getHomeFeatures = computed(() => store.getters.getHomeFeatures);
    const getNumberOfBath = computed(() => store.getters.getNumberOfBath);
    const getSearchRadius = computed(() => store.getters.getSearchRadius);
    const getLotSize = computed(() => store.getters.getLotSize);
    const getIsForeclosure = computed(() => store.getters.getIsForeclosure);
    const getHasOpenHouses = computed(() => store.getters.getHasOpenHouses);
    const getHas3DTours = computed(() => store.getters.getHas3DTours);
    const getIsNewConstructions = computed(() => store.getters.getIsNewConstructions);
    const getIsContingents = computed(() => store.getters.getIsContingents);
    const getIsNewPlans = computed(() => store.getters.getIsNewPlans);
    const getYearAgeMax = computed(() => store.getters.getYearAgeMax);
    const getYearAgeMin = computed(() => store.getters.getYearAgeMin);


    // const getIsActiveRouteTab = computed(
    //   () => store.getters.getIsActiveRouteTab);

    watchEffect(() => {
      switch (props.name) {
        case routeNames.value[0].id:
          activeRouteTab.value = routeNames.value[0].queryFormat;
          break;
        case routeNames.value[1].id:
          activeRouteTab.value = routeNames.value[1].queryFormat;
          break;
        case routeNames.value[2].id:
          activeRouteTab.value = routeNames.value[2].queryFormat;
          break;
        // case "RentsNearMe":
        //   activeRouteTab.value = "list-for-rent";
        //   store.commit("setActiveRoutePath", "RentPage");
        //   break;
        // case "SalesNearMe":
        //   activeRouteTab.value = routeNames.value[0].queryFormat;
        //   store.commit("setActiveRoutePath", "BuyPage");
        //   break;
      };
    });

    watchEffect(async () => {
      store.commit("setIsLoading", true);
      isLoading.value = true;
      const { propertyDetail } = await useFetch( 
        activeRouteTab.value, 
        props.slug, 
        props.city,
        getSortingType.value,
        getHomeTypes.value,
        getNumberOfBedInProperty.value,
        getMinPriceRange.value,
        getMaxPriceRange.value,
        getAllowsCats.value,
        getAllowsDogs.value,
        getHomeFeatures.value,
        getNumberOfBath.value,
        getSearchRadius.value,
        getLotSize.value,
        getIsForeclosure.value,
        getHasOpenHouses.value,
        getHas3DTours.value,
        getIsNewConstructions.value,
        getIsContingents.value,
        getIsNewPlans.value,
        getYearAgeMax.value,
        getYearAgeMin.value,
      );
  
      if (!propertyDetail.value){
        console.log("allPropertyListings:", propertyDetail.value);
        isLoading.value = true;
        store.commit("setIsLoading", false);
        return;
      }
      allPropertyListings.value = propertyDetail.value.data.properties;
      isLoading.value = false;
      console.log("allPropertyListings:", allPropertyListings.value);

      const { listingsByOthers, listingsByAgent } = 
        useSortListingsByAgentAndOthers(allPropertyListings.value );
      const { listTitle } = useListingTitle(props.name, props.slug, props.city);

      listingTitle.value = listTitle.value;
      propertyListingByAgent.value = listingsByAgent.value;
      propertyListingByOthers.value = listingsByOthers.value;

      /** Update the store allPropertyListings
       * Update the app loading state isLoading
      */
      store.commit("setAllPropertyListings", allPropertyListings.value);
      store.commit("setIsLoading", false);

    });
    const activePropertyListings = computed(() => {
      let activeListings = 
        activeBranch.value == agentType.value[0].id 
          ? propertyListingByAgent.value
          : propertyListingByOthers.value;
      store.commit("setActiveListing", activeListings);
      return activeListings;
    });

    const filterIsActiveAndAllPropertiesIsZero = computed(() => {
      let filterIsActive = false;
      let filterMoreIsActive = false;
      if (getHomeTypes.value.length > 0){
        filterIsActive = true;
      }
      if (getNumberOfBedInProperty.value){
        filterIsActive = true;
      }
      if (getMinPriceRange.value){
        filterIsActive = true;
      }
      if (getMaxPriceRange.value){
        filterIsActive = true;
      }
      if (getAllowsCats.value){
        filterIsActive = true;
      }
      if (getAllowsDogs.value){
        filterIsActive = true;
      }
      //Filter is Active From FilterMore
      if (getHomeFeatures.value.length > 0){
        filterIsActive = true;
        filterMoreIsActive = true;
      }
      if (getNumberOfBath.value){
        filterIsActive = true;
        filterMoreIsActive = true;
      }
      if (getSearchRadius.value){
        filterIsActive = true;
        filterMoreIsActive = true;
      }
      if (getLotSize.value){
        filterIsActive = true;
        filterMoreIsActive = true;
      }
      if (getYearAgeMax.value){
        filterIsActive = true;
        filterMoreIsActive = true;
      }
      if (getYearAgeMin.value){
        filterIsActive = true;
        filterMoreIsActive = true;
      }
      if (getIsForeclosure.value){
        filterIsActive = true;
        filterMoreIsActive = true;
      }
      if (getHasOpenHouses.value){
        filterIsActive = true;
        filterMoreIsActive = true;
      }
      if (getHas3DTours.value){
        filterIsActive = true;
        filterMoreIsActive = true;
      }
      if (getIsNewConstructions.value){
        filterIsActive = true;
        filterMoreIsActive = true;
      }
      if (getIsContingents.value){
        filterIsActive = true;
        filterMoreIsActive = true;
      }
      if (getIsNewPlans.value){
        filterIsActive = true;
        filterMoreIsActive = true;
      }
      store.commit("setFilterIsActive", filterIsActive);
      store.commit("setFilterMoreIsActive", filterMoreIsActive);
      return allPropertyListings.value.length < 1 && filterIsActive 
        ? true 
        : false;
    });

    const propertyCountIsGreaterThanOne = computed(() => {
      let countSuffix = `available in Vue Estate`;
      return activePropertyListings.value.length > 1 
        ? `homes ${countSuffix}`
        : `home ${countSuffix}`
    });

    return {
      agentType,
      isLoading,
      mapViewChanges,
      error,
      searchedData,
      listingTitle,
      activeBranch,
      activePropertyListings,
      allPropertyListings,
      propertyListingByAgent,
      propertyListingByOthers,
      filterIsActiveAndAllPropertiesIsZero,
      propertyCountIsGreaterThanOne,
      // noSearchTermMatch
    }
  },
}
</script>
