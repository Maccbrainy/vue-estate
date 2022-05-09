<template>
  <nav-bar-container>
    <nav-bar-search-form></nav-bar-search-form>
    <nav-bar></nav-bar>
  </nav-bar-container>
  <filter-button-container></filter-button-container>
  <div class="flex flex-grow flex-auto flex-col z-0" tabindex="-1">
    <div v-if="discoveredHomes" class="w-1/2 block relative flex-1 -bottom-16">
      <div tabindex="-1" class="flex flex-auto flex-col px-2 py-1">
        <div 
          class="flex justify-between flex-col flex-auto flex-start pl-2 pb-2">
          <h2 
            v-show="!agentListIsActive" 
            class="bg-gray-100 text-base font-normal text-gray-500 px-4 py-4 mr-3 mb-3">
            Includes homes for sale by owner, plus foreclosures and auctions not listed by agents.
          </h2>
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
        <ul class="flex flex-wrap">
          <search-result-item-card 
            v-for="home in activeListing"
            v-bind:key="home.id"
            v-bind:home="home">
          </search-result-item-card>
        </ul>
      </div>
    </div>
    <no-search-term-match v-else></no-search-term-match>
    <search-result-google-map v-bind:discoveredHomes="discoveredHomes">
    </search-result-google-map>
  </div>
</template>
<script>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { 
  DropdownButtonSelect, 
  DropdownButtonSelectOption, 
  DropdownButtonSelectBox 
} from "@/components/buttonui/index";
import FilterButtonContainer from "@/components/FilterButtonContainer.vue";
import NavBarContainer from "@/components/NavBarContainer.vue";
import NavBar from "@/components/NavBar.vue";
import NavBarSearchForm from "@/components/NavBarSearchForm.vue";
import NoSearchTermMatch from "@/components/NoSearchTermMatch.vue";
import SearchResultGoogleMap from "@/components/SearchResultGoogleMap.vue";
import SearchResultItemCard from "@/components/SearchResultItemCard.vue";
import searchInfoQuerySanitizer from "@/composables/searchInfoQuerySanitizer";
import buildRouterParamsUrl from "@/composables/buildRouterParamsUrl";
import clientLocalStorage from "@/composables/clientLocalStorage";
import searchResultTitle from "@/composables/searchResultTitle";
import checkPresenceOfHyphenAndRemove from "@/composables/checkPresenceOfHyphenAndRemove";
import checkWhiteSpacesAndReplaceWithHypen from "@/composables/checkWhiteSpacesAndReplaceWithHypen";
import homeLocationFinderSearchControllers from "@/api/homeLocationFinderSearchControllers";
import https from "@/api/index";
import computedHomeResourcesSearched from "@/composables/computedHomeResourcesSearched";
import computedPropertyByAgentAndNonAgent from "@/composables/computedPropertyByAgentAndNonAgent";
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
  },
  setup(props) {
    const store = useStore();
    const stateSearchedData = ref("");
    // const propertyListings = ref([]);

    //From searchedData Store
    const searchedData = computed(() => {
      return store.getters.getSearchedData
    });

    https().getListings();
    // console.log("From SRCL file:", propertyListings.value);
  
    //From allPropertListings Store
    const allPropertListings = computed(() => {
      return store.getters.getAllPropertyListings;
    });
    // console.log("From store:", allPropertListings.value);

    watch(searchedData, (val) => {
      stateSearchedData.value = val;
      buildRouterParamsUrl(
        stateSearchedData.value["state"], 
        stateSearchedData.value["city"]);
    });
    const { hypenatedProp } = checkWhiteSpacesAndReplaceWithHypen(props.city);
    const { hyphenFreeProp } = checkPresenceOfHyphenAndRemove(props.city);


    //Formatting the search term to Capitalize
    const { validatedSearchInfo } = searchInfoQuerySanitizer(props.slug);
    const { searchTerm } = buildRouterParamsUrl(
      validatedSearchInfo, 
      hypenatedProp.value, 
      hyphenFreeProp.value);

    const { savedSearchedData } = clientLocalStorage(
      searchTerm.value, 
      hyphenFreeProp.value
    );
    const { resultTitle } = searchResultTitle(
      searchTerm.value, 
      hyphenFreeProp.value
    );

    const { homeLocationFinders } = homeLocationFinderSearchControllers();

    // onBeforeMount(() => {
    //   https();
    //   console.log("This is madness!");
    // })
    const { discoveredHomes } = computedHomeResourcesSearched(
      allPropertListings.value,
      homeLocationFinders, 
      props.slug,
      hyphenFreeProp.value);

    const { 
      activeListing, 
      listingsByAgent, 
      listingsByOthers, 
      agentListIsActive 
    } = computedPropertyByAgentAndNonAgent(discoveredHomes.value);

    const homeCountIsAboveOne = computed(() => {
      return activeListing.value.length > 1 ? true : false
    });
    onMounted(() => {
      if (discoveredHomes.value && searchedData.value) {
        store.commit("setSuccessfulSearchHistory", searchedData.value);
      }
    });
    return {
      searchTerm,
      hypenatedProp, 
      savedSearchedData,
      resultTitle,
      homeLocationFinders,
      discoveredHomes,
      homeCountIsAboveOne,
      validatedSearchInfo,
      buildRouterParamsUrl,
      listingsByAgent,
      listingsByOthers,
      activeListing,
      agentListIsActive
    }
  },
  // computed: {
  //   // searchedData: function(){
  //   //   return this.$store.state.searchedData;
  //   // }
  //   // searchedData: function(){
  //   //   console.log("Layout:", this.$store.getters.getSearchedDataB );
  //   //   return this.$store.getters.getSearchedDataB;
  //   // }
    
  // },
  // computed: mapGetters({
  //     searchedData: 'getSearchedDataB',
  //   }),
  // watch: {
  //   // searchedData(value){
  //   //   console.log("Watching old method:", value);
  //   // }
  //   searchedData(value){
  //     // if(value){
  //       this.stateSearchedData = value;
  //       // buildRouterParamsUrl(this.stateSearchedData);
  //       console.log("Watching old this:", this.stateSearchedData);
  //     // }

  //   }
  // },
}
</script>
