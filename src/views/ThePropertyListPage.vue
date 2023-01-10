<template>
  <filter-button-container v-bind:key="$route.fullPath"></filter-button-container>
  <div class="flex flex-grow flex-auto flex-col z-0 outline-none">
    <div
      v-bind:class="{
        'transform -translate-x-full': mapViewFullScreen,
      }"
      class="
        w-1/2
        sf:w-full
        block
        relative
        flex-1
        -bottom-16
        outline-none
        transition-all
        delay-500
        duration-1000
      "
    >
      <div tabindex="-1" class="flex flex-auto flex-col px-2 py-1 outline-none">
        <div
          class="flex justify-between flex-col flex-auto flex-start pl-2 pb-2"
        >
          <h2
            v-if="storeData.activeListBranch == agentType[1].id && isSalePage"
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
                'animate-pulse bg-gray-200 h-6 w-1/4':
                  !listingTitle && isLoading,
              }"
              class="text-lg font-bold text-gray-600"
            >
              <span v-if="totalItemsMatchingRowsInSearch > 0">
                {{ listingTitle }}
              </span>
            </h1>
            <ul
              v-show="
                filterIsActive && storeData.activeListBranch != agentType[1].id
               && totalItemsMatchingRowsInSearch > 0"
              :class="{
                'animate-pulse bg-gray-200 mt-0.5 h-2 w-1/4': isLoading,
                'list-disc list-inside': !isLoading,
              }"
              class="flex text-xs text-gray-400 space-x-2"
            >
              <li
                v-for="activeFilterEntry in activeFilterDescriptionEnteries"
                v-bind:key="activeFilterEntry"
                v-show="!isLoading"
              >
                <span class="-ml-1 capitalize">
                  <span>{{ activeFilterEntry }}</span>
                </span>
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
                  <span v-if="!isLoading && totalItemsMatchingRowsInSearch > 0">
                    {{ `${totalItemsMatchingRowsInSearch.toLocaleString()}` }}
                    {{ propertyCountIsGreaterThanOne }}
                  </span>
                </h2>
                <filter-button-sorting v-show="totalItemsMatchingRowsInSearch > 0"></filter-button-sorting>
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
        <ul v-show="totalItemsMatchingRowsInSearch > 0" class="flex flex-wrap">
          <property-item-card 
            v-for="home in activePropertyListings"
            v-bind:key="home.property_id"
            v-bind:home="home"
            v-bind:routeName="name"
          >
          </property-item-card>
        </ul>
        <widget-pagination
          v-show="
            !isLoading &&
            storeData.activeListBranch != agentType[1].id &&
            totalItemsMatchingRowsInSearch > 0
          "
          :total-items="totalItemsMatchingRowsInSearch"
          :per-page="pageLimit"
          :offset="pageOffSet"
          :current-page="setCurrentPage"
          :total-items-in-current-page="activePropertyListings.length"
          @page-changed="onPageChange"
        ></widget-pagination>
      </div>
    </div>
    <no-search-term-match
      v-if="filterIsNotActiveAndAllPropertiesIsZero && !isLoading"
    >
    </no-search-term-match>
    <widget-google-map>
      <!-- v-bind:discoveredHomes="discoveredHomes" -->
    </widget-google-map>
  </div>
</template>
<script>
import {
  ref,
  computed,
  watchEffect,
  onMounted,
  onBeforeUnmount,
  inject,
} from "vue";
import { useStore } from "vuex";
import { onBeforeRouteLeave, useRoute, onBeforeRouteUpdate } from "vue-router";
import { useFetch } from "@/api/useFetch.js";
import {
  FilterButtonContainer,
  FilterButtonSorting,
} from "@/components/filter";
import { removeUnderScoresFromAString } from "@/helper";
import settingsData from "@/api/settingsData.json";
import IsLoading from "@/components/IsLoading.vue";
import {
  NoSearchTermMatch,
  NoSearchTermMatchForAgentAndOtherListings,
  NoSearchTermForAgentOrOtherListings,
} from "@/components/not-found";
import { WidgetGoogleMap, WidgetPagination } from "@/components/widgets";
import PropertyItemCard from "@/components/PropertyItemCard.vue";
import {
  useListingTitle,
  useSortListingsByAgentAndOthers,
} from "@/composables";
export default {
  name: "ThePropertyListPage",
  props: {
    name: String,
    slug: [String, Number],
    page: [String, Number],
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
    sortType: String,
  },
  components: {
    IsLoading,
    PropertyItemCard,
    FilterButtonContainer,
    NoSearchTermMatch,
    NoSearchTermMatchForAgentAndOtherListings,
    NoSearchTermForAgentOrOtherListings,
    FilterButtonSorting,
    WidgetPagination,
    WidgetGoogleMap,
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const { mapViewFullScreen } = inject("provider");
    const isSalePage = ref(false);
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
    const routeNames = ref([...settingsData.routeNames]);
    const agentType = ref([...settingsData.agentType]);
    const storeData = computed(() => store.getters.getStore);
    const isRouteFromRentsNearOrSalesNearMe = ref(false);
    const setCurrentPage = ref(parseInt(props.page) || 1);
    const pageLimit = ref(40);
    const pageOffSet = ref(0); //The offset of items to be ignored in response for paging
    const totalItemsMatchingRowsInSearch = ref(0);
    const useIsPostalCode = (slug) => {
      //Test if search is Postal/zip is used by user
      let regExpNumbersOnly = /^\d+$/; //Regular Expression for Number detection
      return regExpNumbersOnly.test(slug);
    };

    onBeforeRouteUpdate((to, from) => {
      if (to.query.page === from.query.page) {
        setCurrentPage.value = 1;
        store.commit("setPropertyPagination", setCurrentPage.value);
      }
    });

    const onPageChange = (page) => {
      setCurrentPage.value = parseInt(page);
      store.commit("setPropertyPagination", setCurrentPage.value);
    };
    watchEffect(() => {
      let filterMoreIsActive = false;
      filterIsActive.value = false;
      let updateRouterParams = {};
      const {
        activeRoutePath,
        searchedData: { state_code, city },
        propertyFilters: {
          homeType,
          numberOfBed,
          priceMinRange,
          priceMaxRange,
          allowsCats,
          allowsDogs,
          sorting,
          features,
          numberOfBath,
          searchRadius,
          lotSize,
          age_max,
          age_min,
          isForeclosures,
          hasOpenHouses,
          has3DTours,
          isNewConstructions,
          isContingents,
          isNewPlans,
          pagination,
        },
      } = storeData.value;

      if (homeType.length > 0) {
        filterIsActive.value = true;
        updateRouterParams.homeType = homeType;
      }
      if (numberOfBed) {
        filterIsActive.value = true;
        updateRouterParams.bed = numberOfBed;
      }
      if (priceMinRange) {
        filterIsActive.value = true;
        updateRouterParams.priceMin = priceMinRange;
      }
      if (priceMaxRange) {
        filterIsActive.value = true;
        updateRouterParams.priceMax = priceMaxRange;
      }
      if (allowsCats) {
        filterIsActive.value = true;
        updateRouterParams.catsAllowed = allowsCats;
      }
      if (allowsDogs) {
        filterIsActive.value = true;
        updateRouterParams.dogsAllowed = allowsDogs;
      }
      if (sorting) {
        filterIsActive.value = true;
        updateRouterParams.sortType = sorting;
      }
      //Pagination update to the route
      if (pagination) {
        filterIsActive.value = true;
        updateRouterParams.pagination = pagination;
      }

      //Filter is Active From FilterMore
      if (features.length > 0) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.homeFeatures = features;
      }
      if (numberOfBath) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.bath = numberOfBath;
      }
      if (searchRadius) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.radius = searchRadius;
      }
      if (lotSize) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.lotSize = lotSize;
      }
      if (age_max) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.ageMax = age_max;
      }
      if (age_min) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.ageMin = age_min;
      }
      if (isForeclosures) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.foreclosure = isForeclosures;
      }
      if (hasOpenHouses) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.openHouses = hasOpenHouses;
      }
      if (has3DTours) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.threeDTours = has3DTours;
      }
      if (isNewConstructions) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.newConstruction = isNewConstructions;
      }
      if (isContingents) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.contingents = isContingents;
      }
      if (isNewPlans) {
        filterIsActive.value = true;
        filterMoreIsActive = true;
        updateRouterParams.newPlans = isNewPlans;
      }

      updateRouterParams.activeRouteTab = activeRoutePath;
      updateRouterParams.state_code = useIsPostalCode(props.slug)
        ? props.slug
        : state_code;
      updateRouterParams.city = useIsPostalCode(props.slug) ? "" : city;

      //Pagination update to the route
      // updateRouterParams.pagination =
      //   setCurrentPage.value == 1 ? null : setCurrentPage.value;

      if (
        filterIsActive.value &&
        activeRoutePath == "BuyPage" &&
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
        // updateRouterParams.activeRouteTab = activeRoutePath;
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
        store.commit("setUseRouterPush", updateRouterParams);
      }
      if (
        filterIsActive.value &&
        activeRoutePath == "RentPage" &&
        props.name == "RentPage" &&
        storeData.value.searchedData
      ) {
        console.log("003filterIsActive.value && RentPage");
        store.commit("setUseRouterPush", updateRouterParams);
      }
      if (
        filterIsActive.value &&
        activeRoutePath == "SoldPage" &&
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
          !storeData.value.propertyFilters.priceMinRange &&
          !storeData.value.propertyFilters.priceMaxRange
            ? ""
            : storeData.value.filterDescriptionInfo.priceRange,
        homeType1st: removeUnderScoresFromAString(
          storeData.value.propertyFilters.homeType[0]
        ),
        homeType2nd: removeUnderScoresFromAString(
          storeData.value.propertyFilters.homeType[1]
        ),
        homeType3rd: removeUnderScoresFromAString(
          storeData.value.propertyFilters.homeType[2]
        ),
        homeType4th: removeUnderScoresFromAString(
          storeData.value.propertyFilters.homeType[3]
        ),
        petFriendly:
          storeData.value.propertyFilters.allowsCats &&
          storeData.value.propertyFilters.allowsDogs
            ? "Cats and Dogs friendly"
            : storeData.value.propertyFilters.allowsDogs
            ? "Dogs allowed"
            : storeData.value.propertyFilters.allowsCats
            ? "Cats allowed"
            : "",
        homeFeaturesIst: removeUnderScoresFromAString(
          storeData.value.propertyFilters.features[0]
        ),
        homeFeatures2nd: removeUnderScoresFromAString(
          storeData.value.propertyFilters.features[1]
        ),
        homeFeatures3rd: removeUnderScoresFromAString(
          storeData.value.propertyFilters.features[2]
        ),
        homeFeatures4th: removeUnderScoresFromAString(
          storeData.value.propertyFilters.features[3]
        ),
        // yearBuiltMin: storeData.value.filterDescriptionInfo.yearBuiltMin,
        // yearBuiltMax: storeData.value.filterDescriptionInfo.yearBuiltMax,
        hasOpenHouses: storeData.value.propertyFilters.hasOpenHouses
          ? "Open Houses"
          : "",
        has3DTours: storeData.value.propertyFilters.has3DTours ? "3DTours" : "",
        foreClosure: storeData.value.propertyFilters.isForeclosures
          ? "Foreclosures"
          : "",
        newConstruction: storeData.value.propertyFilters.isNewConstructions
          ? "New Constructions"
          : "",
        newPlans: storeData.value.propertyFilters.isNewPlans ? "New Plans" : "",
        searchRadius: storeData.value.propertyFilters.searchRadius
          ? `${storeData.value.propertyFilters.searchRadius} Mile(s)`
          : "",
        contingents: storeData.value.propertyFilters.isContingents
          ? "Contingents"
          : "",
        lotSize: storeData.value.propertyFilters.lotSize
          ? `${storeData.value.propertyFilters.lotSize}+ acre Lot Size`
          : "",
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

      let pageOffsetSize = props.page ? (props.page - 1) * pageLimit.value : 0;
      pageOffSet.value = pageOffsetSize;

      let isRoutesDefaultStateCode = isRentsNearMeOrSalesNearMe.value
        ? defaultStateCode.value
        : "";
      let isRoutesDefaultCity = isRentsNearMeOrSalesNearMe.value
        ? defaultCity.value
        : "";

      let propertySlug = isRentsNearMeOrSalesNearMe.value
        ? isRoutesDefaultStateCode
        : useIsPostalCode(props.slug)
        ? ""
        : props.slug;
      let propertyCity = isRentsNearMeOrSalesNearMe.value
        ? isRoutesDefaultCity
        : useIsPostalCode(props.slug)
        ? ""
        : props.city;

      let postalCode = useIsPostalCode(props.slug) ? props.slug : "";

      const { propertyListResults, propertyTotalMatchingRows, errorFetch } =
        await useFetch(
          queryEndpointType,
          propertySlug,
          propertyCity,
          pageLimit.value,
          pageOffsetSize,
          props.sortType,
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

      error.value = errorFetch.value;
      isLoading.value = false;
      store.commit("setFetchingIsBusy", false);
      store.commit("setIsLoading", false);

      console.log(
        "FETCH DATA AFTER NAVIGATION DATA!!!:",
        propertyListResults.value
      );
      console.log("FETCH DATA ERROR!!!:", error.value);

      allPropertyListings.value = propertyListResults.value;
      totalItemsMatchingRowsInSearch.value = propertyTotalMatchingRows.value;
      store.commit("setAllPropertyListings", propertyListResults.value);
      store.commit("setTotalItemsMatchRows", propertyTotalMatchingRows.value);

      console.log("====route=====", route);

      if (propertyListResults.value.length < 1) {
        return;
      }

      const { listingsByOthers, listingsByAgent } =
        useSortListingsByAgentAndOthers(allPropertyListings.value);
      const { listTitle } = useListingTitle(props.name, props.slug, props.city);

      listingTitle.value = listTitle.value;
      propertyListingByAgent.value = listingsByAgent.value;
      propertyListingByOthers.value = listingsByOthers.value;

      //Store Route full path to local storage to be consumed in searchresultdetailed component
      localStorage.setItem("historyRoute", route.fullPath);
      
    });
    watchEffect(() => {
      let isBuyPage =
        storeData.value.activeRoutePath == routeNames.value[0].id
          ? true
          : false;
      isSalePage.value = isBuyPage;
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
    const propertyCountIsGreaterThanOne = computed(() => {
      let countSuffix = `available in Vue Estate`;
      return totalItemsMatchingRowsInSearch.value > 1
        ? `homes ${countSuffix}`
        : `home ${countSuffix}`;
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

        //Persist current page on page refresh from user using the Route url
        setCurrentPage.value = parseInt(props.page) || 1;
        store.commit("setPropertyPagination", setCurrentPage.value);
      }
      // isLoading.value = false;
      store.commit("setIsLoading", false);
    });
    onBeforeRouteLeave((_, from) => {
      if (from.name == "RentsNearMe" || from.name == "SalesNearMe") {
        isRouteFromRentsNearOrSalesNearMe.value = true;
      }
    });
    onBeforeUnmount(() => {
      if (!isRouteFromRentsNearOrSalesNearMe.value) {
        store.dispatch("resetPropertyFilterState");
      }
    });
    return {
      setCurrentPage,
      onPageChange,
      pageLimit,
      pageOffSet,
      totalItemsMatchingRowsInSearch,
      defaultCity,
      defaultStateCode,
      agentType,
      isLoading,
      isSalePage,
      mapViewFullScreen,
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
