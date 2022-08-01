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
            v-if="activeBranch == 'Other Listings'" 
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
                        Sort: Relevence
                      </dropdown-button-select-option>
                      <dropdown-button-select-option value="newest">
                        Sort: Newest Listings</dropdown-button-select-option>
                      <dropdown-button-select-option value="price_high">
                        Sort: Price high</dropdown-button-select-option>
                      <dropdown-button-select-option value="price_low">
                        Sort: Price low</dropdown-button-select-option>
                      <dropdown-button-select-option value="photos">
                        Sort: Most photos</dropdown-button-select-option>
                      <dropdown-button-select-option value="sqft_high">
                        Sort: Square feet high</dropdown-button-select-option>
                    </dropdown-button-select>
                  </dropdown-button-select-box>
                </div>
              </div>
            </div>
          </div>
          <no-search-term-match-for-agent-and-other-listings 
            v-else-if="filterIsActiveAndAllPropertiesIsZero">
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
    const allPropertyListings = ref([]);
    const propertyListingByAgent = ref([]);
    const propertyListingByOthers = ref([]);
    const activePropertyListings = ref([]);
    const listingTitle = ref("");

    const isLoading = computed(() => store.getters.getIsLoading);
    const error = computed(() => store.getters.getErrorCatch);
    const searchedData = computed(() => store.getters.getSearchedData );
    const activeBranch = computed(() => store.getters.getActiveBranch);
    const getHomeTypes = computed(() => store.getters.getHomeType);
    const getMinPriceRange = computed(() => store.getters.getPriceRangeMin);
    const getMaxPriceRange = computed(() => store.getters.getPriceRangeMax);
    const getNumberOfBedInProperty = computed(
      () => store.getters.getNumberOfBed);

    watchEffect(async () => {
      let sortType = "relevence";
      let propertyType = getHomeTypes.value;
      let bedNumber = getNumberOfBedInProperty.value;
      let priceMin = getMinPriceRange.value;
      let priceMax = getMaxPriceRange.value;

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
      };
      store.commit("setIsLoading", true);

      const { propertyDetail } = await useFetch( 
        activeRouteTab.value, 
        props.slug, 
        props.city,
        sortType,
        propertyType,
        bedNumber,
        priceMin,
        priceMax
      );
  
      if (!propertyDetail.value.data.properties){
        return;
      }
      allPropertyListings.value = propertyDetail.value.data.properties;

      console.log("allPropertyListings:", allPropertyListings.value);

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

    });
    watchEffect(() => {
      activePropertyListings.value = 
        activeBranch.value == "Agent Listings" 
          ? propertyListingByAgent.value
          : propertyListingByOthers.value;
      store.commit("setActiveListing", activePropertyListings.value);
    });

    const filterIsActiveAndAllPropertiesIsZero = computed(() => {
      let filterIsActive;
      if (getHomeTypes.value){
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
      return allPropertyListings.value.length == 0 && filterIsActive 
        ? true 
        : false;
    });

    const propertyCountIsGreaterThanOne = computed(() => {
      return activePropertyListings.value.length > 1 ? "homes" : "home"
    })
    return {
      isLoading,
      error,
      searchedData,
      listingTitle,
      activeBranch,
      activePropertyListings,
      allPropertyListings,
      propertyListingByAgent,
      propertyListingByOthers,
      filterIsActiveAndAllPropertiesIsZero,
      propertyCountIsGreaterThanOne
    }
  },
}
</script>
