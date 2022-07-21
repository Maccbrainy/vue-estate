<template>
  <nav-bar-container>
    <nav-bar-search-form></nav-bar-search-form>
    <nav-bar></nav-bar>
  </nav-bar-container>
  <filter-button-container></filter-button-container>
  <div class="flex flex-grow flex-auto flex-col z-0" tabindex="-1">
    <is-loading v-if="isLoading"></is-loading>
    <div 
      v-else-if="allPropertyListings" 
      class="w-1/2 sf:w-full block relative flex-1 -bottom-16">
      <div tabindex="-1" class="flex flex-auto flex-col px-2 py-1">
        <div 
          class="flex justify-between flex-col flex-auto flex-start pl-2 pb-2">
          <h2 
            v-if="otherBranch" 
            class="bg-gray-100 text-base font-normal text-gray-500 px-4 py-4 mr-3 mb-3">
            Includes homes for sale by owner, plus foreclosures and auctions not listed by agents.
          </h2>
          <div v-if="activePropertyListings.length > 0">
            <h1 class="text-lg font-bold text-gray-600 mb-1 pt-1">
              {{ listingTitle }}
            </h1>
            <div class="flex w-full justify-between">
              <div class="flex justify-between w-full flex-wrap items-center">
                <h2 class="text-base font-normal text-gray-500">
                  {{ activePropertyListings.length }} 
                  {{ propertyCountIsGreaterThanOne }} available in Vue Estate
                </h2>
                <div>
                  <dropdown-button-select-box>
                    <dropdown-button-select class="shadow-none border-none">
                      <dropdown-button-select-option value>
                        Sort: Just For You
                      </dropdown-button-select-option>
                      <dropdown-button-select-option value="Newest Listings">
                        Sort: Newest Listings</dropdown-button-select-option>
                      <dropdown-button-select-option value="Bathrooms">
                        Sort: Bathrooms</dropdown-button-select-option>
                      <dropdown-button-select-option value="Bedrooms">
                        Sort: Bedrooms</dropdown-button-select-option>
                      <dropdown-button-select-option value="Most photos">
                        Sort: Most photos</dropdown-button-select-option>
                      <dropdown-button-select-option value="Square feet">
                        Sort: Square feet</dropdown-button-select-option>
                    </dropdown-button-select>
                  </dropdown-button-select-box>
                </div>
              </div>
            </div>
          </div>
          <no-search-term-match-for-agent-and-other-listings 
            v-else-if="activeListingIsZeroAndThereIsFilterSelected">
          </no-search-term-match-for-agent-and-other-listings>
          <no-search-term-for-agent-or-other-listings v-else>
          </no-search-term-for-agent-or-other-listings>
        </div>
        <ul class="flex flex-wrap">
          <search-result-item-card 
            v-for="home in activePropertyListings"
            v-bind:key="home.property_id"
            v-bind:home="home">
          </search-result-item-card>
        </ul>
      </div>
    </div>
    <no-search-term-match v-else></no-search-term-match>
    <search-result-google-map>
      <!-- v-bind:discoveredHomes="discoveredHomes" -->
    </search-result-google-map>
  </div>
</template>
<script>
import { ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useFetch } from "@/api/useFetch.js";
import { 
  DropdownButtonSelect, 
  DropdownButtonSelectOption, 
  DropdownButtonSelectBox 
} from "@/components/buttonui";
import { FilterButtonContainer } from "@/components/filter";
import NavBarContainer from "@/components/NavBarContainer.vue";
import NavBar from "@/components/NavBar.vue";
import IsLoading from "@/components/IsLoading.vue";
import NavBarSearchForm from "@/components/NavBarSearchForm.vue";
import NoSearchTermMatch from "@/components/NoSearchTermMatch.vue";
import NoSearchTermMatchForAgentAndOtherListings from "@/components/NoSearchTermMatchForAgentAndOtherListings.vue";
import NoSearchTermForAgentOrOtherListings from "@/components/NoSearchTermForAgentOrOtherListings.vue";
import SearchResultGoogleMap from "@/components/SearchResultGoogleMap.vue";
import SearchResultItemCard from "@/components/SearchResultItemCard.vue";
import { 
  useListingTitle, 
  useSortListingsByAgentAndOthers,
  // useAgentAndOtherListsIsEqualToZero 
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
    NavBar,
    IsLoading,
    NavBarSearchForm,
    DropdownButtonSelect,
    NavBarContainer,
    SearchResultGoogleMap,
    SearchResultItemCard,
    DropdownButtonSelectBox,
    DropdownButtonSelectOption,
    FilterButtonContainer,
    NoSearchTermMatch,
    NoSearchTermMatchForAgentAndOtherListings,
    NoSearchTermForAgentOrOtherListings
  },
  setup(props) {
    const store = useStore();
    const activeRouteTab = ref("");
    const allPropertyListings = ref({});
    const propertyListingByAgent = ref([]);
    const propertyListingByOthers = ref([]);
    const listingTitle = ref("");
    
    const searchedData = computed(() => {
      return store.getters.getSearchedData
    });
    const getIsActiveRouteTab = computed(() => {
      return store.getters.getIsActiveRouteTab;
    });
    
    console.log("Get route name:", getIsActiveRouteTab.value);
    watchEffect(async () => {
      switch (props.name) {
        case "RentPage":
        // case "RentsNearMe":
          activeRouteTab.value = "list-for-rent";
          // store.commit("setActiveRoutePath", "RentPage");
          break;
        case "SoldPage":
          activeRouteTab.value = "list-sold";
          break;
        case "BuyPage":
        // case "SalesNearMe":
          activeRouteTab.value = "list-for-sale";
          // store.commit("setActiveRoutePath", "BuyPage");
          break;
        // default:
        //   console.log("Active Route path is default");
        //   return;
      };
      store.commit("setIsLoading", true);
      const { propertyDetail } = await useFetch( 
        activeRouteTab.value, 
        props.slug, 
        props.city
      );
      if (!propertyDetail.value.data.properties){
        return
      }
      allPropertyListings.value = propertyDetail.value.data.properties;

      const { listingsByOthers, listingsByAgent } = 
        useSortListingsByAgentAndOthers(allPropertyListings.value );
      const { listTitle } = useListingTitle(props.slug, props.city);

      listingTitle.value = listTitle.value;
      propertyListingByAgent.value = listingsByAgent.value;
      propertyListingByOthers.value = listingsByOthers.value;

      /** Update the store allPropertyListings
       * Update the app loading state isLoading
      */
      store.commit("setAllPropertyListings", allPropertyListings.value);
      store.commit("setIsLoading", false);

      console.log("AgentLists:", listingsByAgent.value);
      console.log("OthersLists:", listingsByOthers.value);

    });
    const isLoading = computed(() => {
      return store.getters.getIsLoading;
    });

    const error = computed(() => {
      return store.getters.getErrorCatch;
    });

    const activeBranch = computed(() => {
      return store.getters.getActiveBranch;
    });
    const otherBranch = computed(() => 
      activeBranch.value !== "Agent Listings" ? true : false)
    const agentBranch = computed(() => 
      activeBranch.value == "Agent Listings" ? true : false)
    
    const updatedActiveListings = computed(() => {
      let updatedList = 
        activeBranch.value === "Agent Listings" 
          ? propertyListingByAgent.value
          : propertyListingByOthers.value;
      store.commit("setActiveListing", updatedList);
      return updatedList;
    });

    const getMinPriceRange = computed(() => {
      return store.getters.getPriceRangeMin;
    });
    const getMaxPriceRange = computed(() => {
      return store.getters.getPriceRangeMax;
    });
    watchEffect(() => {
      let minPrice = getMinPriceRange.value;
      let maxPrice = getMaxPriceRange.value;
      let activeProperties = updatedActiveListings.value;
      if (!maxPrice && !minPrice) {
        let defaultProperty = agentBranch.value 
          ? propertyListingByAgent.value 
          : propertyListingByOthers.value;
        store.commit("setActiveListing", defaultProperty);
        return defaultProperty;
      }
      if (activeProperties){
        const filteredPropertiesOnMinPriceOnly = activeProperties.filter(
          (property) => property["price"] >= minPrice
        );
        const filteredPropertiesWithMaxPrice = 
          filteredPropertiesOnMinPriceOnly.filter(
            (property) => property["price"] <= maxPrice
          )
        const filteredProperties = maxPrice 
          ? filteredPropertiesWithMaxPrice 
          : filteredPropertiesOnMinPriceOnly;
        store.commit("setActiveListing", filteredProperties);
        console.log("Filtered Props", filteredProperties);
      }

    });
    const activePropertyListings = computed(() => {
      return store.getters.getActiveListing;
    });
    const activeListingIsZeroAndThereIsFilterSelected = computed(() => {
      let activeListLength = activePropertyListings.value.length;
      let listingIsZeroAndThereIsFilter = 
        agentBranch.value && 
        activeListLength == 0 && 
        activeListLength < propertyListingByAgent.value.length 
          ? true
          : otherBranch.value && 
            activeListLength == 0 && 
            activeListLength < propertyListingByOthers.value.length
          ? true
          : false
      return listingIsZeroAndThereIsFilter;
    });

    const propertyCountIsGreaterThanOne = computed(() => {
      return activePropertyListings.value.length > 1 ? "homes" : "home"
    })
    return {
      isLoading,
      error,
      searchedData,
      listingTitle,
      otherBranch,
      updatedActiveListings,
      activePropertyListings,
      allPropertyListings,
      propertyListingByAgent,
      propertyListingByOthers,
      activeListingIsZeroAndThereIsFilterSelected,
      propertyCountIsGreaterThanOne
    }
  },
}
</script>
