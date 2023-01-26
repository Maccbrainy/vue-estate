import { createStore } from "vuex";
import { useRouterPush } from "@/composables";
function getDefaultPropertyFilterState() {
  return {
    pagination: null,
    lotSize: "",
    searchRadius: "",
    homeType: [],
    numberOfBed: "",
    numberOfBath: "",
    priceMinRange: null,
    priceMaxRange: null,
    sorting: "",
    features: [],
    age_min: "",
    age_max: "",
    allowsCats: "",
    allowsDogs: "",
    isForeclosures: "",
    hasOpenHouses: "",
    has3DTours: "",
    isNewConstructions: "",
    isContingents: "",
    isNewPlans: "",
  };
}
export default createStore({
  state: {
    isLoading: false,
    fetchingIsBusy: false,
    errorCatch: false,
    activeRoutePath: "",
    activeListBranch: "",
    propertyFilters: {
      pagination: null,
      lotSize: "",
      searchRadius: "",
      homeType: [],
      numberOfBed: "",
      numberOfBath: "",
      priceMinRange: null,
      priceMaxRange: null,
      sorting: "",
      features: [],
      age_min: "",
      age_max: "",
      allowsCats: "",
      allowsDogs: "",
      isForeclosures: "",
      hasOpenHouses: "",
      has3DTours: "",
      isNewConstructions: "",
      isContingents: "",
      isNewPlans: "",
    },
    filterDescriptionInfo: {
      filterIsActive: false,
      filterMoreIsActive: false,
      homeType: "",
      priceRange: "",
      bedroom: "",
      features: "",
      bathroom: "",
    },
    searchedData: {},
    allPropertyListings: [],
    propertyListingsByAgent: [],
    propertyListingsByNoneAgent: [],
    activeListing: [],
    totalItemsMatchRows: 0,
    propertyDetailed: {},
  },
  getters: {
    getStore(state) {
      return state;
    },
  },
  mutations: {
    //Invoked from FilterButtonMore component
    setLotSize(state, payLoad) {
      state.propertyFilters.lotSize = payLoad;
    },
    //Invoked from FilterButtonMore component
    setSearchRadius(state, payLoad) {
      state.propertyFilters.searchRadius = payLoad;
    },
    //Invoked from FilterButtonMore component
    setIsNewPlans(state, payLoad) {
      state.propertyFilters.isNewPlans = payLoad;
    },
    //Invoked from FilterButtonMore component
    setIsContingents(state, payLoad) {
      state.propertyFilters.isContingents = payLoad;
    },
    //Invoked from FilterButtonMore component
    setIsNewConstructions(state, payLoad) {
      state.propertyFilters.isNewConstructions = payLoad;
    },
    //Invoked from FilterButtonMore component
    setIsMatterPorts(state, payLoad) {
      state.propertyFilters.has3DTours = payLoad;
    },
    //Invoked from FilterButtonMore component
    setIsHasOpenHousesOnly(state, payLoad) {
      state.propertyFilters.hasOpenHouses = payLoad;
    },
    //Invoked from FilterButtonMore component
    setIsForeclosuresOnly(state, payLoad) {
      state.propertyFilters.isForeclosures = payLoad;
    },
    //Invoked from FilterButtonMore component
    setIsCatsAllowed(state, payLoad) {
      state.propertyFilters.allowsCats = payLoad;
    },
    //Invoked from FilterButtonMore component
    setIsDogsAllowed(state, payLoad) {
      state.propertyFilters.allowsDogs = payLoad;
    },
    //Invoked from filterCoreYearBuilt component
    setYearBuiltAgeMin(state, yearPayLoad) {
      state.propertyFilters.age_min = yearPayLoad;
    },
    //Invoked from filterCoreYearBuilt component
    setYearBuiltAgeMax(state, yearPayLoad) {
      state.propertyFilters.age_max = yearPayLoad;
    },
    //Invoked from filterCoreBathrooms component
    setBathroomInfo(state, titlePayload) {
      state.filterDescriptionInfo.bathroom = titlePayload;
    },
    //Invoked from filterCoreBathrooms component
    setNumberOfBathRoom(state, propertyPayLoad) {
      state.propertyFilters.numberOfBath = propertyPayLoad;
    },
    //Invoked from filterCoreFeatures component
    setHomeFeaturesTitleInfo(state, titlePayload) {
      state.filterDescriptionInfo.features = titlePayload;
    },
    //Invoked from filterCoreFeatures component
    setHomeFeatures(state, propertyPayLoad) {
      state.propertyFilters.features = propertyPayLoad;
    },
    //Invoked in PropertyListPage
    setFilterIsActive(state, payload) {
      state.filterDescriptionInfo.filterIsActive = payload;
    },
    //Invoked in PropertyListPage
    setFilterMoreIsActive(state, payload) {
      state.filterDescriptionInfo.filterMoreIsActive = payload;
    },
    //Invoked from filterCoreBedroom component
    setBedroomInfo(state, titlePayload) {
      state.filterDescriptionInfo.bedroom = titlePayload;
    },
    //Invoked from filterCoreHomeTypes component
    setHomeTypeTitleInfo(state, titlePayload) {
      state.filterDescriptionInfo.homeType = titlePayload;
    },
    //Invoked from filtercorePriceRange component
    setPriceRangeInfo(state, priceInfoPayload) {
      state.filterDescriptionInfo.priceRange = priceInfoPayload;
    },
    //Invoked in the PropertyListPage in onMounted life cycle;
    //FilterRouteTab
    //SearchInput
    setSearchedData(state, searchedPayLoad) {
      state.searchedData = searchedPayLoad;
    },
    //Invoked from https request in the PropertyListPage component
    setAllPropertyListings(state, propertyPayLoad) {
      state.allPropertyListings = propertyPayLoad;
    },
    //Invoked from computedAgentAndNoneAgent
    setListingsByAgent(state, propertyPayLoad) {
      state.propertyListingsByAgent = propertyPayLoad;
    },
    //Invoked from computedAgentAndNoneAgent component
    setListingsByNoneAgent(state, propertyPayLoad) {
      state.propertyListingsByNoneAgent = propertyPayLoad;
    },
    //Invoked from filter button Agent and Other Listings
    setActiveListBranch(state, propertyPayLoad) {
      state.activeListBranch = propertyPayLoad;
    },
    //Invoked from computedAgentAndNoneAgent component
    setActiveListing(state, propertyPayLoad) {
      state.activeListing = propertyPayLoad;
    },
    //Invoked from Filter button Price Range component
    setMinPriceRange(state, propertyPayLoad) {
      state.propertyFilters.priceMinRange = propertyPayLoad;
    },
    //Invoked from Filter button Price Range component
    setMaxPriceRange(state, propertyPayLoad) {
      state.propertyFilters.priceMaxRange = propertyPayLoad;
    },
    //Invoked from Filter button Price Range component
    setNumberOfBedRoom(state, propertyPayLoad) {
      state.propertyFilters.numberOfBed = propertyPayLoad;
    },
    //Invoked from FilterButtonHomeType component
    setHomeType(state, propertyPayLoad) {
      state.propertyFilters.homeType = propertyPayLoad;
    },
    //Invoked from Filter button sorting component
    setPropertySorting(state, propertyPayLoad) {
      state.propertyFilters.sorting = propertyPayLoad;
    },
    //Invoked from SearchInput
    setIsLoading(state, isLoadingPayload) {
      state.isLoading = isLoadingPayload;
    },
    //Invoked from PropertyListPage
    setFetchingIsBusy(state, isLoadingPayload) {
      state.fetchingIsBusy = isLoadingPayload;
    },
    //Invoked from async request useFetchjs
    setCaughtError(state, errorPayload) {
      state.errorCatch = errorPayload;
    },
    //Invoked from HomeButtonTab; PropertyListPage
    setActiveRoutePath(state, routePayload) {
      state.activeRoutePath = routePayload;
    },
    //Invoked from SearchInput
    //Invoked from FilterRouteTab
    setUseRouterPush(_, routePayload) {
      useRouterPush(routePayload);
    },
    //Invoked in PropertyListPage
    setPropertyPagination(state, pagePayLoad) {
      let pagination = pagePayLoad == 1 ? null : pagePayLoad;
      state.propertyFilters.pagination = pagination;
    },
    setTotalItemsMatchRows(state, payLoad) {
      state.totalItemsMatchRows = parseInt(payLoad);
    },
    //Invoked in PropertyListPage Components
    setResetPropertyFilterState(state) {
      const defaultPropertyFilterState = getDefaultPropertyFilterState();
      Object.keys(defaultPropertyFilterState).forEach((key) => {
        state.propertyFilters[key] = defaultPropertyFilterState[key];
      });
    },
    //Invoked form the propertyDetailed component
    setPropertyDetail(state, payload) {
      state.propertyDetailed = payload;
    },
  },

  actions: {
    resetPropertyFilterState({ commit }) {
      commit("setResetPropertyFilterState");
    },
  },
  modules: {},
});
