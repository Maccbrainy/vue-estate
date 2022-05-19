<template>
  <nav-bar-container>
    <nav-bar-search-form></nav-bar-search-form>
    <nav-bar></nav-bar>
  </nav-bar-container>
  <filter-button-container></filter-button-container>
  <div class="flex flex-grow flex-auto flex-col z-0" tabindex="-1">
    <div v-if="!allPropertListings" class="w-1/2 sf:w-full block relative flex-1 -bottom-16">
      <div tabindex="-1" class="flex flex-auto flex-col px-2 py-1">
        <div 
          class="flex justify-between flex-col flex-auto flex-start pl-2 pb-2">
          <h2 
            v-show="!agentListIsActive" 
            class="bg-gray-100 text-base font-normal text-gray-500 px-4 py-4 mr-3 mb-3">
            Includes homes for sale by owner, plus foreclosures and auctions not listed by agents.
          </h2>
          <div v-if="activeListing.length > 0 ? true : false">
            <h1 class="text-lg font-bold text-gray-600 mb-1 pt-1">
              {{ resultTitle }}
            </h1>
            <div class="flex w-full justify-between">
              <div class="flex justify-between w-full flex-wrap items-center">
                <h2 
                  v-show="homeCountIsAboveOne" 
                  class="text-base font-normal text-gray-500">
                  {{ activeListing.length }} homes available in Vue Estate
                </h2>
                <h2 
                  v-show="!homeCountIsAboveOne" 
                  class="text-base font-normal text-gray-500">
                  {{ activeListing.length }} home available in Vue Estate
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
            v-else-if="listingsByAgentAndByOtherIsZero">
          </no-search-term-match-for-agent-and-other-listings>
          <no-search-term-for-agent-or-other-listings v-else>
          </no-search-term-for-agent-or-other-listings>
        </div>
        <ul class="flex flex-wrap">
          <search-result-item-card 
            v-for="home in activeListing"
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
import { 
  DropdownButtonSelect, 
  DropdownButtonSelectOption, 
  DropdownButtonSelectBox 
} from "@/components/buttonui";
import { FilterButtonContainer } from "@/components/filter";
import NavBarContainer from "@/components/NavBarContainer.vue";
import NavBar from "@/components/NavBar.vue";
import NavBarSearchForm from "@/components/NavBarSearchForm.vue";
import NoSearchTermMatch from "@/components/NoSearchTermMatch.vue";
import NoSearchTermMatchForAgentAndOtherListings from "@/components/NoSearchTermMatchForAgentAndOtherListings.vue";
import NoSearchTermForAgentOrOtherListings from "@/components/NoSearchTermForAgentOrOtherListings.vue";
import SearchResultGoogleMap from "@/components/SearchResultGoogleMap.vue";
import SearchResultItemCard from "@/components/SearchResultItemCard.vue";
export default {
  name: "SearchResultContentLayout",
  props: {
    slug: [String, Number],
    city: String,
    title: String,
  },
  components:{
    NavBar,
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
    const isLoading = ref(false);
    const searchedData = computed(() => {
      return store.getters.getSearchedData
    });
    console.log("Just searched:", searchedData.value);

    const unwatchEffect = watchEffect(async () => {
      if (props.slug && props.city){
        console.log("Store Action API terminated!");
        return;
      } 
      if (props.slug && !props.city) {
        console.log("Remote Api fetching running!");
        await store.dispatch("setPropertiesFromRemoteApi", props.slug);
        unwatchEffect();
      }
    });

    const allPropertListings = computed(() => {
      return store.getters.getAllPropertyListings;
    });
    console.log("All properties searched:", allPropertListings.value);

    // const { homeLocationFinders } = homeLocationFinderSearchControllers();
    // const { discoveredHomes } = computedHomeResourcesSearched(
    //   allPropertListings.value,
    //   homeLocationFinders, 
    //   props.slug,
    //   hyphenFreeProp.value);
    // const { 
    //   activeListing, 
    //   listingsByAgent, 
    //   listingsByOthers, 
    //   agentListIsActive 
    // } = computedPropertyByAgentAndNonAgent(discoveredHomes.value);
    // const homeCountIsAboveOne = computed(() => {
    //   return activeListing.value.length > 1 ? true : false
    // });

    // const listingsByAgentAndByOtherIsZero = computed(() => {
    //   return listingsByAgent.value.length == 0 && listingsByOthers.value.length == 0 ? true : false;
    // })
    return {
      isLoading,
      allPropertListings
    }
  },
}
</script>
