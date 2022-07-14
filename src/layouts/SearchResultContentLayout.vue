<template>
  <nav-bar-container>
    <nav-bar-search-form></nav-bar-search-form>
    <nav-bar></nav-bar>
  </nav-bar-container>
  <filter-button-container></filter-button-container>
  <div class="flex flex-grow flex-auto flex-col z-0" tabindex="-1">
    <is-loading v-if="stateIsLoading"></is-loading>
    <div v-if="!errorCaught">
      <div v-if="allPropertyListings" class="w-1/2 sf:w-full block relative flex-1 -bottom-16">
        <div tabindex="-1" class="flex flex-auto flex-col px-2 py-1">
          <div 
            class="flex justify-between flex-col flex-auto flex-start pl-2 pb-2">
            <h2 
              v-if="!agentBranch" 
              class="bg-gray-100 text-base font-normal text-gray-500 px-4 py-4 mr-3 mb-3">
              Includes homes for sale by owner, plus foreclosures and auctions not listed by agents.
            </h2>
            <div v-if="activePropertyListings.length > 0">
              <h1 class="text-lg font-bold text-gray-600 mb-1 pt-1">
                {{ listingTitle }}
              </h1>
              <div class="flex w-full justify-between">
                <div class="flex justify-between w-full flex-wrap items-center">

                  <!-- v-show="homeCountIsAboveOne" -->
                  <h2 
                    
                    class="text-base font-normal text-gray-500">
                    {{ activePropertyListings.length }} homes available in Vue Estate
                  </h2>

                  <!-- v-show="!homeCountIsAboveOne" -->
                  <h2 
                    
                    class="text-base font-normal text-gray-500">
                    <!-- {{ activeListing.length }} home available in Vue Estate -->
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
              v-else-if="listingsForAgentAndOtherIsZero">
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
  useAgentAndOtherListsIsEqualToZero 
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
    const stateIsLoading = ref(Boolean);
    const errorCaught = ref(Boolean);
    const activeRouteTab = ref("");
    const allPropertyListings = ref({});
    const propertyListingByAgent = ref({});
    const propertyListingByOthers = ref({});
    const listingsForAgentAndOtherIsZero = ref(Boolean);
    const activePropertyListings = ref({});
    const listingTitle = ref("");
    const agentBranch = ref("");
    
    const searchedData = computed(() => {
      return store.getters.getSearchedData
    });
    const getIsActiveRouteTab = computed(() => {
      return store.getters.getIsActiveRouteTab;
    });

    watchEffect(async () => {
      switch (getIsActiveRouteTab.value) {
        case "RentPage":
          activeRouteTab.value = "list-for-rent"
          break;
        case "SoldPage":
          activeRouteTab.value = "list-sold"
          break;
        case "BuyPage":
          activeRouteTab.value = "list-for-sale"
          break;
      };

      const { propertyDetail } = await useFetch( 
        activeRouteTab.value, 
        props.slug, 
        props.city
      );

      allPropertyListings.value = propertyDetail.value.data.properties;

      const { listingsByOthers, listingsByAgent, agentListingIsActive } 
        = useSortListingsByAgentAndOthers( allPropertyListings.value );
      const { listTitle } = useListingTitle(props.slug, props.city);
      const { agentAndOtherListsIsZero } = useAgentAndOtherListsIsEqualToZero( listingsByAgent.value, listingsByOthers.value);

      listingTitle.value = listTitle.value;
      agentBranch.value = agentListingIsActive.value;
      propertyListingByAgent.value = listingsByAgent.value;
      propertyListingByOthers.value = listingsByOthers.value;
      listingsForAgentAndOtherIsZero.value = agentAndOtherListsIsZero.value;
      
      /** Update the store allPropertyListings
       * Update the app loading state isLoading
       * Update the ActiveListing 
      */
      store.commit("setAllPropertyListings", allPropertyListings.value);
      store.commit("setIsLoading", false);
      store.commit("setActiveListing", activePropertyListings.value);

      console.log("AgentLists:", listingsByAgent.value);
      console.log("OthersLists:", listingsByOthers.value);
      
    });
    const getIsLoadingStatus = computed(() => {
      return store.getters.getIsLoading;
    });
    watchEffect(() => {
      stateIsLoading.value = getIsLoadingStatus.value;
    });
    const getError = computed(() => {
      return store.getters.getErrorCatch;
    });
    watchEffect(() => {
      errorCaught.value = getError.value;
    });
    const getActiveListBranch = computed(() => {
      return store.getters.getActiveBranch;
    });

    watchEffect(() =>{
      agentBranch.value = 
        getActiveListBranch.value === "Agent Listings" ? true : false;

      activePropertyListings.value = agentBranch.value 
        ? propertyListingByAgent.value 
        : propertyListingByOthers.value;

    });
 
    // *const unwatchEffect = watchEffect(async () => {
    //   if (props.slug && props.city){
    //     console.log("Store Action API terminated!");
    //     return;
    //   } 
    //   if (props.slug && !props.city) {
    //     console.log("Remote Api fetching running!");
    //     await store.dispatch("setPropertiesFromRemoteApi", props.slug);
    //     unwatchEffect();
    //   }
    // });
    return {
      stateIsLoading,
      errorCaught,
      searchedData,
      listingTitle,
      agentBranch,
      activePropertyListings,
      allPropertyListings,
      listingsForAgentAndOtherIsZero
    }
  },
}
</script>
