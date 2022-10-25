import { createStore } from "vuex";
import { useRouterPush } from "@/composables";
// import router from "@/router";

export default createStore({
  state: {
    isLoading: false,
    errorCatch: false,
    activeRoutePath: "",
    activeListBranch: "",
    propertyFilters: {
      lotSize:"",
      searchRadius:"",
      homeType:[],
      numberOfBed: "",
      numberOfBath: "",
      priceMinRange: null,
      priceMaxRange: null,
      sorting:"",
      features:[],
      age_min:"",
      age_max:"",
      allowsCats: "",
      allowsDogs: "",
      isForeclosures:"",
      hasOpenHouses:"",
      has3DTours:"",
      isNewConstructions:"",
      isContingents:"",
      isNewPlans:"",
    },
    filterDescriptionInfo: {
      filterIsActive: false,
      filterMoreIsActive: false,
      homeType: "",
      priceRange: "",
      bedroom: "",
      features: "",
      bathroom:""
    },
    searchedData: {},
    allPropertyListings: {},
    propertyListingsByAgent: {},
    propertyListingsByNoneAgent: {},
    activeListing: {},
  },
  getters: {
    //Consumed in searchResultContent component
    getLotSize(state){
      return state.propertyFilters.lotSize;
    },
    getSearchRadius(state){
      return state.propertyFilters.searchRadius;
    },
    getAllowsCats(state){
      return state.propertyFilters.allowsCats;
    },
    getAllowsDogs(state){
      return state.propertyFilters.allowsDogs;
    },
    getIsForeclosure(state){
      return state.propertyFilters.isForeclosures;
    },
    getHasOpenHouses(state){
      return state.propertyFilters.hasOpenHouses;
    },
    getHas3DTours(state){
      return state.propertyFilters.has3DTours;
    },
    getIsNewConstructions(state){
      return state.propertyFilters.isNewConstructions;
    },
    getIsContingents(state){
      return state.propertyFilters.isContingents;
    },
    getIsNewPlans(state){
      return state.propertyFilters.isNewPlans;
    },
    getYearAgeMax(state){
      return state.propertyFilters.age_max;
    },
    getYearAgeMin(state){
      return state.propertyFilters.age_min;
    },
    getNumberOfBath(state){
      return state.propertyFilters.numberOfBath;
    },
    getFilterIsActive(state){
      return state.filterDescriptionInfo.filterIsActive;
    },
    getFilterMoreIsActive(state){
      return state.filterDescriptionInfo.filterMoreIsActive;
    },
    getBathInfo(state){
      return state.filterDescriptionInfo.bathroom;
    },
    getHomeTypeTitleInfo(state){
      return state.filterDescriptionInfo.homeType;
    },
    getPriceInfo(state){
      return state.filterDescriptionInfo.priceRange;
    },
    getBedroomInfo(state){
      return state.filterDescriptionInfo.bedroom;
    },
    getHomeFeaturesInfo(state){
      return state.filterDescriptionInfo.features;
    },
    getHomeFeatures(state){
      return state.propertyFilters.features;
    },
    getHomeType(state){
      return state.propertyFilters.homeType;
    },
    getPriceRangeMin(state){
      return state.propertyFilters.priceMinRange;
    },
    getPriceRangeMax(state){
      return state.propertyFilters.priceMaxRange;
    },
    getNumberOfBed(state){
      return state.propertyFilters.numberOfBed;
    },
    getPropertySorting(state){
      return state.propertyFilters.sorting;
    },
    getActiveBranch(state){
      return state.activeListBranch;
    },
    //Consumed in searchResultContentLayout component
    getSearchedData(state){
      return state.searchedData; 
    },
    //Consumed in filter button agent and other active
    getIsLoading(state){
      return state.isLoading;
    },
    getErrorCatch(state){
      return state.errorCatch;
    },
    //Consumed in searchResultContentLayout component
    getAllPropertyListings(state){
      return state.allPropertyListings;
    },
    getPropertyListingsByAgent(state){
      return state.propertyListingsByAgent;
    },
    getPropertyListingsByNoneAgent(state){
      return state.propertyListingsByNoneAgent;
    },
    getActiveListing(state){
      return state.activeListing;
    },
    //Consumed in HomeTabButtons/filter components
    getIsActiveRouteTab(state){
      return state.activeRoutePath; 
        // ? state.activeRoutePath 
        // : localStorage.getItem('IS_ACTIVE_ROUTE');
    },
  },
  mutations: {
    //Invoked from FilterButtonMore component
    setLotSize(state, payLoad){
      state.propertyFilters.lotSize = payLoad;
    },
    //Invoked from FilterButtonMore component
    setSearchRadius(state, payLoad){
      state.propertyFilters.searchRadius = payLoad;
    },
    //Invoked from FilterButtonMore component
    setIsNewPlans(state, payLoad){
      state.propertyFilters.isNewPlans = payLoad;
    },
    //Invoked from FilterButtonMore component
    setIsContingents(state, payLoad){
      state.propertyFilters.isContingents = payLoad;
    },
    //Invoked from FilterButtonMore component
    setIsNewConstructions(state, payLoad){
      state.propertyFilters.isNewConstructions = payLoad;
    },
    //Invoked from FilterButtonMore component
    setIsMatterPorts(state, payLoad){
      state.propertyFilters.has3DTours = payLoad;
    },
    //Invoked from FilterButtonMore component
    setIsHasOpenHousesOnly(state, payLoad){
      state.propertyFilters.hasOpenHouses = payLoad;
    },
    //Invoked from FilterButtonMore component
    setIsForeclosuresOnly(state, payLoad){
      state.propertyFilters.isForeclosures = payLoad;
    },
    //Invoked from FilterButtonMore component
    setIsCatsAllowed(state, payLoad){
      state.propertyFilters.allowsCats = payLoad;
    },
    //Invoked from FilterButtonMore component
    setIsDogsAllowed(state, payLoad){
      state.propertyFilters.allowsDogs = payLoad;
    },
    //Invoked from filterCoreYearBuilt component
    setYearBuiltAgeMin(state, yearPayLoad){
      state.propertyFilters.age_min = yearPayLoad;
    },
    //Invoked from filterCoreYearBuilt component
    setYearBuiltAgeMax(state, yearPayLoad){
      state.propertyFilters.age_max = yearPayLoad;
    },
    //Invoked from filterCoreBathrooms component
    setBathroomInfo(state, titlePayload){
      state.filterDescriptionInfo.bathroom = titlePayload;
    },
    //Invoked from filterCoreBathrooms component
    setNumberOfBathRoom(state, propertyPayLoad){
      state.propertyFilters.numberOfBath = propertyPayLoad;
    },
    //Invoked from filterCoreFeatures component
    setHomeFeaturesTitleInfo(state, titlePayload){
      state.filterDescriptionInfo.features = titlePayload;
    },
    //Invoked from filterCoreFeatures component
    setHomeFeatures(state, propertyPayLoad){
      state.propertyFilters.features = propertyPayLoad;
    },
    //Invoked in SearchResultContentLayout
    setFilterIsActive(state, payload){
      state.filterDescriptionInfo.filterIsActive = payload;
    },
    //Invoked in SearchResultContentLayout
    setFilterMoreIsActive(state, payload){
      state.filterDescriptionInfo.filterMoreIsActive = payload;
    },
    //Invoked from filterCoreBedroom component
    setBedroomInfo(state, titlePayload){
      state.filterDescriptionInfo.bedroom = titlePayload;
    },
    //Invoked from filterCoreHomeTypes component
    setHomeTypeTitleInfo(state, titlePayload){
      state.filterDescriptionInfo.homeType = titlePayload;
    },
    //Invoked from filtercorePriceRange component
    setPriceRangeInfo(state, priceInfoPayload){
      state.filterDescriptionInfo.priceRange = priceInfoPayload;
    },
    setSearchedData(state, searchedPayLoad){
      state.searchedData = searchedPayLoad;
    },
    //Invoked from https request in the searchResultContentLayout component
    setAllPropertyListings(state, propertyPayLoad){
      state.allPropertyListings = propertyPayLoad;
    },
    //Invoked from computedAgentAndNoneAgent
    setListingsByAgent(state, propertyPayLoad){
      state.propertyListingsByAgent = propertyPayLoad;
    },
    //Invoked from computedAgentAndNoneAgent component
    setListingsByNoneAgent(state, propertyPayLoad){
      state.propertyListingsByNoneAgent = propertyPayLoad;
    },
    //Invoked from filter button Agent and Other Listings
    setActiveListBranch(state, propertyPayLoad){
      state.activeListBranch = propertyPayLoad;
    },
    //Invoked from computedAgentAndNoneAgent component
    setActiveListing(state, propertyPayLoad){
      state.activeListing = propertyPayLoad;
    },
    //Invoked from Filter button Price Range component
    setMinPriceRange(state, propertyPayLoad){
      state.propertyFilters.priceMinRange = propertyPayLoad;
    },
    //Invoked from Filter button Price Range component
    setMaxPriceRange(state, propertyPayLoad){
      state.propertyFilters.priceMaxRange = propertyPayLoad;
    },
    //Invoked from Filter button Price Range component
    setNumberOfBedRoom(state, propertyPayLoad){
      state.propertyFilters.numberOfBed = propertyPayLoad;
    },
    //Invoked from FilterButtonHomeType component
    setHomeType(state, propertyPayLoad){
      state.propertyFilters.homeType = propertyPayLoad;
    },
    //Invoked from Filter button sorting component
    setPropertySorting(state, propertyPayLoad){
      state.propertyFilters.sorting = propertyPayLoad;
    },
    //Invoked from searchResultComponent
    setIsLoading(state, isLoadingPayload){
      state.isLoading = isLoadingPayload;
    },
    //Invoked from async request useFetchjs
    setCaughtError(state, errorPayload){
      state.errorCatch = errorPayload;
    },

    setActiveRoutePath(state, routePayload){
      state.activeRoutePath = routePayload;
      // localStorage.setItem('IS_ACTIVE_ROUTE', routePayload);
    },
    //Invoked from SearchInput
    //Invoked from FilterRouteTab
    setUseRouterPush(state, routePayload){
      state.isLoading = true;
      useRouterPush(routePayload);
    },
    setUpdateRouteParams(_, routePayload){
      // state.isLoading = true;
      let pMin = routePayload.priceMin ? `${routePayload.priceMin}p_Min` : "";
      let pMax = routePayload.priceMax ? `-${routePayload.priceMax}p_Max` : "";
      let bedQ = routePayload.bed ? `${routePayload.bed}_bd` : "";
      let homeTypeQ = 
        routePayload.homeType ? routePayload.homeType.join() : "";
      let bathQ = routePayload.bath ? `${routePayload.bath}_bath` : "";
      console.log("queryLoad content Type:", routePayload.homeType);
      console.log("queryLoad price:", `${pMin}${pMax}`);
      console.log("queryLoad bed:", bedQ);
      console.log("queryLoad homeType:", homeTypeQ);
      console.log("queryLoad bath:", bathQ);
      // router.push({
      //   params: {
      //     price: `${pMin}${pMax}`, 
      //     bed: bedQ, 
      //     homeType: homeTypeQ, 
      //     bath: bathQ, 
      //   }
      // });
    },
  },

  actions: {},
  modules: {},
});
