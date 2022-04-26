<template>
  <nav-bar-container>
    <nav-bar-search-form></nav-bar-search-form>
    <nav-bar></nav-bar>
  </nav-bar-container>
  <filter-button-container></filter-button-container>
  <div class="flex flex-grow flex-auto flex-col z-0" tabindex="-1">
    <div v-if="discoveredHomes" class="w-1/2 block relative flex-1 -bottom-16">
      <div tabindex="-1" class="flex flex-auto flex-col px-2 py-3">
        <div 
          class="flex justify-between flex-col flex-auto flex-start pl-2 pb-2">
          <h1 class="text-lg font-bold text-gray-600 mb-1">
            {{ resultTitle }}
          </h1>
          <div class="flex w-full justify-between">
            <div class="flex justify-between w-full flex-wrap items-center">
              <h2 class="text-base font-normal text-gray-500">
                {{ discoveredHomesCount }}
              </h2>
              <div>
                <dropdown-button-select-box>
                  <dropdown-button-select class="shadow-none border-none">
                    <dropdown-button-select-option>
                      Sort: Just For You
                    </dropdown-button-select-option>
                    <dropdown-button-select-option value="a">
                      Sort: Mortgage</dropdown-button-select-option>
                    <dropdown-button-select-option value="b">
                      Sort: Bedrooms</dropdown-button-select-option>
                    <dropdown-button-select-option value="c">
                      Sort: Most photos</dropdown-button-select-option>
                  </dropdown-button-select>
                </dropdown-button-select-box>
              </div>
            </div>
          </div>
        </div>
        <ul class="flex flex-wrap">
          <search-result-item-card 
            v-for="home in discoveredHomes"
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
import homeResourcesData from "@/api/homeResourcesData";
import computedHomeResourcesSearched from "@/composables/computedHomeResourcesSearched";
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
    const searchedDataFromStore = computed(() => {
      return store.getters.getSearchedData
    });

    watch(searchedDataFromStore, (val) => {
      stateSearchedData.value = val;
      buildRouterParamsUrl(
        stateSearchedData.value["state"], 
        stateSearchedData.value["city"]);
    });
    const { hypenatedProp } = checkWhiteSpacesAndReplaceWithHypen(props.city);
    const { hyphenFreeProp } = checkPresenceOfHyphenAndRemove(props.city);
    const { validatedSearchInfo } = searchInfoQuerySanitizer(props.slug);
    const { searchTerm } = buildRouterParamsUrl(
      validatedSearchInfo, 
      hypenatedProp.value, 
      hyphenFreeProp.value);
    const { savedSearchedData } = clientLocalStorage( searchTerm.value, hyphenFreeProp.value);
    const { resultTitle } = searchResultTitle(searchTerm.value, hyphenFreeProp.value);
    const { homeLocationFinders } = homeLocationFinderSearchControllers();
    const { homeResources } = homeResourcesData();
    const { discoveredHomes } = computedHomeResourcesSearched(
      homeResources, 
      homeLocationFinders, 
      props.slug,
      hyphenFreeProp.value);
    // console.log("Our Homes:", discoveredHomes);
    const discoveredHomesCount = computed(() => {
      return discoveredHomes.value.length > 1 
        ? `${discoveredHomes.value.length} homes available on Homesive`
        : `${discoveredHomes.value.length} home available on Homesive`
    })

    onMounted(() => {
      if (discoveredHomes.value && searchedDataFromStore.value) {
        store.commit("setSuccessfulSearchHistory", searchedDataFromStore.value);
      }
    });
    return {
      searchTerm,
      hypenatedProp, 
      savedSearchedData,
      resultTitle,
      homeLocationFinders,
      homeResources,
      discoveredHomes,
      discoveredHomesCount,
      validatedSearchInfo,
      buildRouterParamsUrl,
    }
  },
  // computed: {
  //   // searchedData: function(){
  //   //   return this.$store.state.searchedData;
  //   // }
  //   // searchedDataFromStore: function(){
  //   //   console.log("Layout:", this.$store.getters.getSearchedDataB );
  //   //   return this.$store.getters.getSearchedDataB;
  //   // }
    
  // },
  // computed: mapGetters({
  //     searchedDataFromStore: 'getSearchedDataB',
  //   }),
  // watch: {
  //   // searchedData(value){
  //   //   console.log("Watching old method:", value);
  //   // }
  //   searchedDataFromStore(value){
  //     // if(value){
  //       this.stateSearchedData = value;
  //       // buildRouterParamsUrl(this.stateSearchedData);
  //       console.log("Watching old this:", this.stateSearchedData);
  //     // }

  //   }
  // },
}
</script>
