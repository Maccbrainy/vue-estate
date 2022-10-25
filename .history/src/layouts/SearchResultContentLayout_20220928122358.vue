<template>
  <filter-button-container :key="$route.name"></filter-button-container>
  <div class="flex flex-grow flex-auto flex-col z-0" tabindex="-1">
    <div
      v-bind:class="{
        'transform -translate-x-full': mapViewChanges,
      }"
      class="w-1/2 sf:w-full block relative flex-1 -bottom-16"
    >
      <div tabindex="-1" class="flex flex-auto flex-col px-2 py-1">
        <div
          class="flex justify-between flex-col flex-auto flex-start pl-2 pb-2"
        >
          <h2
            v-if="storeData.activeListBranch == agentType[1].id"
            class="
              bg-gray-100
              text-base
              font-normal
              text-gray-500
              px-4
              py-4
              mr-3
              mb-3
            "
          >
            Includes homes for sale by owner, plus foreclosures and auctions not
            listed by agents.
          </h2>
          <div class="pt-1 mb-1">
            <h1
              v-bind:class="{
                'animate-pulse bg-gray-200 h-6 w-3/4':
                  !listingTitle && isLoading,
              }"
              class="text-lg font-bold text-gray-600"
            >
              <span v-if="activePropertyListings.length > 0">
                {{ listingTitle }}
              </span>
            </h1>
            <ul
              v-show="filterIsActive"
              class="flex list-disc list-inside text-xs text-gray-400 space-x-2"
            >
              <li
                v-for="activeFilterEntry in activeFilterDescriptionEnteries"
                v-bind:key="activeFilterEntry"
              >
                <span class="-ml-1 capitalize">{{ activeFilterEntry }}</span>
              </li>
            </ul>
            <div class="flex w-full justify-between pt-3">
              <div class="flex justify-between w-full flex-wrap items-center">
                <h2
                  v-bind:class="{
                    'animate-pulse bg-gray-200 w-1/2 h-5 mt-4': isLoading,
                  }"
                  class="text-base font-normal text-gray-500"
                >
                  <span v-if="activePropertyListings.length > 0 && !isLoading">
                    {{ activePropertyListings.length }}
                    {{ propertyCountIsGreaterThanOne }}
                  </span>
                </h2>
                <filter-button-sorting
                  v-show="activePropertyListings.length > 0"
                >
                </filter-button-sorting>
              </div>
            </div>
          </div>
          <no-search-term-match-for-agent-and-other-listings
            v-if="filterIsActiveAndAllPropertiesIsZero && !isLoading"
          >
          </no-search-term-match-for-agent-and-other-listings>
          <no-search-term-for-agent-or-other-listings
            v-if="
              allPropertyListings.length > 0 &&
              activePropertyListings.length < 1
            "
          >
          </no-search-term-for-agent-or-other-listings>
        </div>
        <is-loading v-if="isLoading || storeData.isLoading"></is-loading>
        <ul class="flex flex-wrap">
          <search-result-item-card
            v-for="home in activePropertyListings"
            v-bind:key="home.property_id"
            v-bind:home="home"
            v-bind:routeName="name"
          >
          </search-result-item-card>
        </ul>
      </div>
    </div>
    <no-search-term-match
      v-if="filterIsNotActiveAndAllPropertiesIsZero && !isLoading"
    >
    </no-search-term-match>
    <search-result-google-map v-model:mapView="mapViewChanges">
      <!-- v-bind:discoveredHomes="discoveredHomes" -->
    </search-result-google-map>
  </div>
</template>
<script>
import { ref, computed, watchEffect, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { onBeforeRouteLeave } from "vue-router";
import { useFetch } from "@/api/useFetch.js";
import {
  FilterButtonContainer,
  FilterButtonSorting,
} from "@/components/filter";
import { removeUnderScoresFromAString } from "@/helper";
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
// import { useRouter } from "vue-router";
export default {
  name: "SearchResultContentLayout",
  // async beforeRouteEnter(to, from, next) {
  //   let queryEndpointType =
  //     to.name == "RentPage"
  //       ? "list-for-rent"
  //       : to.name == "SoldPage"
  //       ? "list-sold"
  //       : to.name == "RentsNearMe"
  //       ? "list-for-rent"
  //       : "list-for-sale";
  //   let slug =
  //     to.params.lat && to.params.long
  //       ? ""
  //       : to.params.slug
  //       ? to.params.slug
  //       : "CA";
  //   let city =
  //     to.params.lat && to.params.long
  //       ? ""
  //       : to.params.city
  //       ? to.params.city
  //       : "San Francisco";
  //   //Extract numbers from a string with floats(.) in longitude and latitudes
  //   let latitude = to.params.lat
  //     ? `${to.params.lat}`.replace(/[^\d.-]/g, '')
  //     : "";
  //   let longitude = to.params.long
  //     ? `${to.params.long}`.replace(/[^\d.-]/g, '')
  //     : "";
  //   let priceMax = "";
  //   let sortType = "relevance";
  //   const { propertyDetail, err } = await useFetch(
  //     queryEndpointType,
  //     latitude,
  //     longitude,
  //     slug,
  //     city,
  //     from.params.price,
  //     priceMax,
  //     to.params.bed,
  //     to.params.homeType,
  //     to.params.bath,
  //     to.params.homeFeatures,
  //     sortType,
  //     to.params.catsAllowed,
  //     to.params.dogsAllowed,
  //   );
  //   const { listTitle } = useListingTitle(to.name, slug, city);
  //   next( vm => {
  //     vm.setData(propertyDetail, err, listTitle);
  //   });
  // },

  props: {
    name: String,
    slug: [String, Number],
    city: String,
    bed: String,
    bath: String,
    priceMin: String,
    priceMax: String,
    homeType: String,
    dogsAllowed: String,
    catsAllowed: String,
    homeFeatures: String,
    yearBuiltMin: String,
    yearBuiltMax: String,
    lotSize: String,
    hasOpenHouses: String,
    has3DTours: String,
    foreClosure: String,
    newConstruction: String,
    newPlans: String,
    radius: String,
    contingents: String,
  },
  components: {
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
    // const router = useRouter();
    const error = ref("");
    const isLoading = ref(false);
    const defaultCity = ref("San Francisco");
    const defaultStateCode = ref("CA");
    const allPropertyListings = ref([]);
    const propertyListingByAgent = ref([]);
    const propertyListingByOthers = ref([]);
    const activePropertyListings = ref([]);
    const listingTitle = ref("");
    const filterIsActive = ref(false);
    const mapViewChanges = ref(false);
    const routeNames = ref([...settingsData.routeNames]);
    const agentType = ref([...settingsData.agentType]);
    const storeData = computed(() => store.getters.getStore);
    const isRouteFromRentsNearOrSalesNearMe = ref(false);

    // onBeforeRouteUpdate(async (to) => {
    //   console.log(">>>>>ONBEFOREROUTEUPDATE>>>>SRCL:", to.name);
    //   console.log("onBeforeRouteUpdate reacted!!!");
    //   isLoading.value = true;
    //   store.commit("setFetchingIsBusy", true);
    //   let queryEndpointType =
    //     to.name == "RentPage"
    //       ? "list-for-rent"
    //       : to.name == "SoldPage"
    //       ? "list-sold"
    //       : "list-for-sale";
    //   let latitude = "";
    //   let longitude = "";
    //   const { propertyDetail, err } = await useFetch(
    //     queryEndpointType,
    //     latitude,
    //     longitude,
    //     to.params.slug,
    //     to.params.city,
    //     storeData.value.propertyFilters.priceMinRange,
    //     storeData.value.propertyFilters.priceMaxRange,
    //     storeData.value.propertyFilters.numberOfBed,
    //     storeData.value.propertyFilters.homeType,
    //     storeData.value.propertyFilters.numberOfBath,
    //     storeData.value.propertyFilters.features,
    //     storeData.value.propertyFilters.sorting,
    //     storeData.value.propertyFilters.allowsCats,
    //     storeData.value.propertyFilters.allowsDogs,
    //     storeData.value.propertyFilters.searchRadius,
    //     storeData.value.propertyFilters.lotSize,
    //     storeData.value.propertyFilters.isForeclosures,
    //     storeData.value.propertyFilters.hasOpenHouses,
    //     storeData.value.propertyFilters.has3DTours,
    //     storeData.value.propertyFilters.isNewConstructions,
    //     storeData.value.propertyFilters.isContingents,
    //     storeData.value.propertyFilters.isNewPlans,
    //     storeData.value.propertyFilters.age_max,
    //     storeData.value.propertyFilters.age_min,
    //   );
    //   allPropertyListings.value = propertyDetail.value;
    //   error.value = err;
    //   const { listingsByOthers, listingsByAgent } =
    //     useSortListingsByAgentAndOthers(allPropertyListings.value );
    //   const { listTitle } = useListingTitle(
    //     to.name,
    //     to.params.slug,
    //     to.params.city
    //   );
    //   isLoading.value = false;
    //   store.commit("setFetchingIsBusy", false);
    //   listingTitle.value = listTitle.value;
    //   propertyListingByAgent.value = listingsByAgent.value;
    //   propertyListingByOthers.value = listingsByOthers.value;
    //   store.commit("setAllPropertyListings", propertyDetail.value);
    // });
    // function setData(propertyData, err, title){
    //   allPropertyListings.value = propertyData.value;
    //   error.value = err.value;
    //   listingTitle.value = title;
    //   console.log("ERROR DATA FETCH:", error.value);
    //   store.commit("setAllPropertyListings", propertyData.value);
    // };

    watchEffect(() => {
      let isBuyPage =
        storeData.value.activeRoutePath == routeNames.value[0].id
          ? true
          : false;
      let isRentPage =
        storeData.value.activeRoutePath == routeNames.value[1].id
          ? true
          : false;
      let isSoldPage =
        storeData.value.activeRoutePath == routeNames.value[2].id
          ? true
          : false;

      activePropertyListings.value =
        isRentPage || isSoldPage
          ? allPropertyListings.value
          : isBuyPage &&
            storeData.value.activeListBranch == agentType.value[0].id
          ? propertyListingByAgent.value
          : propertyListingByOthers.value;
      store.commit("setActiveListing", activePropertyListings.value);
    });

    const propertyCountIsGreaterThanOne = computed(() => {
      let countSuffix = `available in Vue Estate`;
      return activePropertyListings.value.length > 1
        ? `homes ${countSuffix}`
        : `home ${countSuffix}`;
    });
    watchEffect(() => {
      let filterMoreIsActive = false;
      filterIsActive.value = false;
      let updateRouterParams = {};
      if (storeData.value.propertyFilters.homeType.length > 0) {
        filterIsActive.value = true;
        updateRouterParams.homeType = storeData.value.propertyFilters.homeType;
      }
      if (storeData.value.propertyFilters.numberOfBed) {
        filterIsActive.value = true;
        updateRouterParams.bed = storeData.value.propertyFilters.numberOfBed;
      }
      if (storeData.value.propertyFilters.priceMinRange) {
        filterIsActive.value = true;
        updateRouterParams.priceMin =
          storeData.value.propertyFilters.priceMinRange;
      }
      if (storeData.value.propertyFilters.priceMaxRange) {
        filterIsActive.value = true;
        updateRouterParams.priceMax =
          storeData.value.propertyFilters.priceMaxRange;
      }
      if (storeData.value.propertyFilters.allowsCats) {
        filterIsActive.value = true;
        updateRouterParams.catsAllowed =
          storeData.value.propertyFilters.allowsCats;
      }
      if (storeData.value.propertyFilters.allowsDogs) {
        filterIsActive.value = true;
        updateRouterParams.dogsAllowed =
          storeData.value.propertyFilters.allowsDogs;
      }
      if (storeData.value.propertyFilters.sorting) {
        updateRouterParams.sortType = storeData.value.propertyFilters.sorting;
      }
      //Filter is Active From FilterMore
      if (storeData.value.propertyFilters.features.length > 0) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.homeFeatures =
          storeData.value.propertyFilters.features;
      }
      if (storeData.value.propertyFilters.numberOfBath) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.bath = storeData.value.propertyFilters.numberOfBath;
      }
      if (storeData.value.propertyFilters.searchRadius) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.radius =
          storeData.value.propertyFilters.searchRadius;
      }
      if (storeData.value.propertyFilters.lotSize) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.lotSize = storeData.value.propertyFilters.lotSize;
      }
      if (storeData.value.propertyFilters.age_max) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.ageMax = storeData.value.propertyFilters.age_max;
      }
      if (storeData.value.propertyFilters.age_min) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.ageMin = storeData.value.propertyFilters.age_min;
      }
      if (storeData.value.propertyFilters.isForeclosures) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.foreclosure =
          storeData.value.propertyFilters.isForeclosures;
      }
      if (storeData.value.propertyFilters.hasOpenHouses) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.openHouses =
          storeData.value.propertyFilters.hasOpenHouses;
      }
      if (storeData.value.propertyFilters.has3DTours) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.threeDTours =
          storeData.value.propertyFilters.has3DTours;
      }
      if (storeData.value.propertyFilters.isNewConstructions) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.newConstruction =
          storeData.value.propertyFilters.isNewConstructions;
      }
      if (storeData.value.propertyFilters.isContingents) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.contingents =
          storeData.value.propertyFilters.isContingents;
      }
      if (storeData.value.propertyFilters.isNewPlans) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.newPlans =
          storeData.value.propertyFilters.isNewPlans;
      }

      updateRouterParams.activeRouteTab = storeData.value.activeRoutePath;
      updateRouterParams.state_code = props.slug;
      updateRouterParams.city = props.city;

      if (
        filterIsActive.value &&
        storeData.value.activeRoutePath == "BuyPage" &&
        props.name == "BuyPage" &&
        storeData.value.searchedData
      ) {
        console.log("000filterIsActive.value && BuyPage");
        store.commit("setUseRouterPush", updateRouterParams);
      }
      if (
        (filterIsActive.value && props.name == "SalesNearMe") ||
        (filterIsActive.value && props.name == "RentsNearMe")
      ) {
        updateRouterParams.activeRouteTab = storeData.value.activeRoutePath;
        updateRouterParams.state_code = "CA";
        updateRouterParams.city = "San Francisco";
        console.log("001filterIsActive.value && SalesNearMe OR RentsNearMe");
        store.commit("setUseRouterPush", updateRouterParams);
      }
      if (
        !filterIsActive.value &&
        props.name != "SalesNearMe" &&
        props.name != "RentsNearMe" &&
        storeData.value.searchedData
      ) {
        console.log(
          "002filterIsNotActive && NotSalesNearMe AND NotRentsNearMe"
        );

        updateRouterParams.activeRouteTab = storeData.value.activeRoutePath;
        updateRouterParams.state_code = storeData.value.searchedData.state_code;
        updateRouterParams.city = storeData.value.searchedData.city;

        store.commit("setUseRouterPush", updateRouterParams);
      }
      if (
        filterIsActive.value &&
        storeData.value.activeRoutePath == "RentPage" &&
        props.name == "RentPage" &&
        storeData.value.searchedData
      ) {
        console.log("003filterIsActive.value && RentPage");
        store.commit("setUseRouterPush", updateRouterParams);
      }
      if (
        filterIsActive.value &&
        storeData.value.activeRoutePath == "SoldPage" &&
        props.name == "SoldPage" &&
        storeData.value.searchedData
      ) {
        console.log("004filterIsActive.value && SoldPage");
        store.commit("setUseRouterPush", updateRouterParams);
      }
      store.commit("setFilterIsActive", filterIsActive.value);
      store.commit("setFilterMoreIsActive", filterMoreIsActive);
    });
    const activeFilterDescriptionEnteries = computed(() => {
      let activeFilterEntries = [];
      let filterEntries = {
        bed: storeData.value.propertyFilters.numberOfBed 
          ? `${storeData.value.propertyFilters.numberOfBed}+ Bedrooms`
          : "",
        bath: storeData.value.propertyFilters.numberOfBath
          ? `${storeData.value.propertyFilters.numberOfBath}+ Bathrooms`
            : "",
        priceRange:
          !storeData.value.propertyFilters.priceMinRange && !storeData.value.propertyFilters.priceMaxRange
            ? ""
            : storeData.value.filterDescriptionInfo.priceRange,
        homeType1st: removeUnderScoresFromAString(storeData.value.propertyFilters.homeType[0]),
        homeType2nd: removeUnderScoresFromAString(storeData.value.propertyFilters.homeType[1]), 
        homeType3rd: removeUnderScoresFromAString(storeData.value.propertyFilters.homeType[2]), 
        homeType4th: removeUnderScoresFromAString(storeData.value.propertyFilters.homeType[3]), 
        petFriendly: storeData.value.propertyFilters.allowsCats && storeData.value.propertyFilters.allowsDogs ? "Cats and Dogs friendly" : storeData.value.propertyFilters.allowsDogs ? "Dogs allowed" : storeData.value.propertyFilters.allowsCats ? "Cats allowed" : "",
        homeFeaturesIst: removeUnderScoresFromAString(storeData.value.propertyFilters.features[0]),
        homeFeatures2nd: removeUnderScoresFromAString(storeData.value.propertyFilters.features[1]),
        homeFeatures3rd: removeUnderScoresFromAString(storeData.value.propertyFilters.features[2]),
        homeFeatures4th: removeUnderScoresFromAString(storeData.value.propertyFilters.features[3]),
        // yearBuiltMin: storeData.value.filterDescriptionInfo.yearBuiltMin,
        // yearBuiltMax: storeData.value.filterDescriptionInfo.yearBuiltMax,
        hasOpenHouses: storeData.value.propertyFilters.hasOpenHouses ? "Open Houses" : "",
        has3DTours: storeData.value.propertyFilters.has3DTours ? "3DTours" : "",
        foreClosure: storeData.value.propertyFilters.isForeclosures ? "Foreclosures" : "",
        newConstruction: storeData.value.propertyFilters.isNewConstructions ? "New Constructions" : "",
        newPlans: storeData.value.propertyFilters.isNewPlans ? "New Plans" : "",
        searchRadius: storeData.value.propertyFilters.searchRadius ? `${storeData.value.propertyFilters.searchRadius} Mile(s)` : "",
        contingents: storeData.value.propertyFilters.isContingents ? "Contingents" : "",
        lotSize: storeData.value.propertyFilters.lotSize ? `${storeData.value.propertyFilters.lotSize}+ acre LotSize` : "",

      };
      if (filterIsActive.value) {
        let entriesArray = Object.values(filterEntries);
        let activatedValidFilters = entriesArray.filter((entry) => entry);
        let activeFilterEntriesRange = activatedValidFilters.map(
          (entry, index) => {
            if (index < 4) {
              return entry;
            }
          }
        );
        let activeFilterEntriesLimit = [...activeFilterEntriesRange]
          .concat("and others")
          .filter((entry) => entry != undefined);
        activeFilterEntries =
          activatedValidFilters.length > 4
            ? activeFilterEntriesLimit
            : activeFilterEntriesRange;
      }
      return activeFilterEntries;
    });
    const isRentsNearMeOrSalesNearMe = computed(() => {
      return props.name == "RentsNearMe" || props.name == "SalesNearMe"
        ? true
        : false;
    });

    const isPostalCodeUsedByUser = computed(() => {
      //Test if search is Postal/zip is used by user
      let regExpNumbersOnly = /^\d+$/; //Regular Expression for Number detection
      return regExpNumbersOnly.test(props.slug)
    });

    watchEffect(async () => {
      isLoading.value = true;
      store.commit("setFetchingIsBusy", true);
      let queryEndpointType =
        props.name == "RentPage"
          ? "list-for-rent"
          : props.name == "SoldPage"
          ? "list-sold"
          : props.name == "RentsNearMe"
          ? "list-for-rent"
          : "list-for-sale";
      let latitude = "";
      let longitude = "";

      let isRoutesDefaultStateCode = isRentsNearMeOrSalesNearMe.value
        ? defaultStateCode.value
        : "";
      let isRoutesDefaultCity = isRentsNearMeOrSalesNearMe.value
        ? defaultCity.value
        : "";

      let propertySlug = isRentsNearMeOrSalesNearMe.value
        ? isRoutesDefaultStateCode
        : !isPostalCodeUsedByUser.value ? props.slug : "";
      let propertyCity = isRentsNearMeOrSalesNearMe.value
        ? isRoutesDefaultCity
        : props.city;
      
      let postalCode = isPostalCodeUsedByUser.value ? props.slug : "";

      const { propertyDetail, err } = await useFetch(
        queryEndpointType,
        propertySlug,
        propertyCity,
        storeData.value.propertyFilters.sorting,
        props.bed,
        props.bath,
        props.priceMin,
        props.priceMax,
        props.homeType,
        props.dogsAllowed,
        props.catsAllowed,
        props.homeFeatures,
        props.yearBuiltMin,
        props.yearBuiltMax,
        props.lotSize,
        props.hasOpenHouses,
        props.has3DTours,
        props.foreClosure,
        props.newConstruction,
        props.newPlans,
        props.radius,
        props.contingents,
        latitude,
        longitude,
        postalCode
      );

      error.value = err.value;

      isLoading.value = false;
      store.commit("setFetchingIsBusy", false);
      console.log("FETCH DATA AFTER NAVIGATION DATA!!!:", propertyDetail.value);
      console.log("FETCH DATA AFTER NAVIGATION ERROR!!!:", error.value);
      if (propertyDetail.value.length < 1) {
        return;
      }

      allPropertyListings.value = propertyDetail.value;
      store.commit("setAllPropertyListings", propertyDetail.value);

      const { listingsByOthers, listingsByAgent } =
        useSortListingsByAgentAndOthers(allPropertyListings.value);
      const { listTitle } = useListingTitle(props.name, props.slug, props.city);

      listingTitle.value = listTitle.value;
      propertyListingByAgent.value = listingsByAgent.value;
      propertyListingByOthers.value = listingsByOthers.value;
    });

    const filterIsNotActiveAndAllPropertiesIsZero = computed(() => {
      return storeData.value.allPropertyListings.length < 1 &&
        !filterIsActive.value
        ? true
        : false;
    });

    const filterIsActiveAndAllPropertiesIsZero = computed(() => {
      return allPropertyListings.value.length < 1 && filterIsActive.value
        ? true
        : false;
    });

    onMounted(() => {
      if (!storeData.value.searchedData) {
        let activeRoutePath =
          props.name == "RentsNearMe"
            ? "RentPage"
            : props.name == "SalesNearMe"
            ? "BuyPage"
            : props.name;

        let propsCity = isRentsNearMeOrSalesNearMe.value
          ? defaultCity.value
          : props.city;
        let propsStateCode = isRentsNearMeOrSalesNearMe.value
          ? defaultStateCode.value
          : props.slug;
        let searchPayload = {
          city: propsCity,
          state_code: propsStateCode,
          activeRouteTab: activeRoutePath,
        };
        store.commit("setSearchedData", searchPayload);

        console.log(
          "<><><><><><>SRCL IS MOUNTED when searchData is empty!!!<><><><><><><>"
        );
      }
      console.log("<><><><><><>SRCL IS MOUNTED!!!<><><><><><><>");
      store.commit("setIsLoading", false);
    });
    onBeforeRouteLeave((to, from) => {
      if (from.name == "RentsNearMe" || from.name == "SalesNearMe") {
        isRouteFromRentsNearOrSalesNearMe.value = true;
        console.log(
          "RentsNearMeORSalesNearMe @onBeforeRouteLeave:",
          isRouteFromRentsNearOrSalesNearMe.value
        );
      }
      console.log(">>> onBeforeRouteLeave PRICECORE");
    });
    onBeforeUnmount(() => {
      store.commit("setIsLoading", true);

      if (!isRouteFromRentsNearOrSalesNearMe.value) {
        store.dispatch("resetPropertyFilterState");
        console.log(
          "RentsNearMeORSalesNearMe is:",
          isRouteFromRentsNearOrSalesNearMe.value
        );
      }
      console.log("UNBEFOREUNMOUNT REACTED");
    });
    return {
      // setData,
      defaultCity,
      defaultStateCode,
      agentType,
      isLoading,
      mapViewChanges,
      error,
      listingTitle,
      storeData,
      activePropertyListings,
      allPropertyListings,
      propertyListingByAgent,
      propertyListingByOthers,
      filterIsActive,
      filterIsActiveAndAllPropertiesIsZero,
      filterIsNotActiveAndAllPropertiesIsZero,
      propertyCountIsGreaterThanOne,
      activeFilterDescriptionEnteries,
      isRentsNearMeOrSalesNearMe,
      isRouteFromRentsNearOrSalesNearMe,
    };
  },
};
</script>
