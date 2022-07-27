import { createStore } from "vuex";
import { useRouterPush } from "@/composables";

export default createStore({
  state: {
    isLoading: false,
    errorCatch: false,
    activeRoutePath: "",
    activeListBranch: "",
    propertyFilters: {
      homeType:[],
      numberOfBed: "",
      numberOfBath: "",
      priceMinRange: null,
      priceMaxRange: null,
    },
    searchedData: {},
    successfulSearchHistory: [{}],
    allPropertyListings: {},
    propertyListingsByAgent: {},
    propertyListingsByNoneAgent: {},
    activeListing: {},
  },
  getters: {
    getPriceRangeMin(state){
      return state.propertyFilters.priceMinRange;
    },
    getPriceRangeMax(state){
      return state.propertyFilters.priceMaxRange;
    },
    getNumberOfBed(state){
      return state.propertyFilters.numberOfBed;
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
    //Consumed in HomeTabButtons
    getIsActiveRouteTab(state){
      return state.activeRoutePath;
    },
    // getActivatedOtherRoutePath(state){
    //   return state.activatedOtherRoutePath;
    // }

  },
  mutations: {
    setSearchedData(state, searchedPayLoad){
      state.searchedData = searchedPayLoad;
    },
    setSuccessfulSearchHistory(state, searchedPayLoad){
      state.successfulSearchHistory.unshift(searchedPayLoad);
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
    //Invoked from store action
    setIsLoading(state, isLoadingPayload){
      state.isLoading = isLoadingPayload;
    },
    //Invoked from async request useFetchjs
    setCaughtError(state, errorPayload){
      state.errorCatch = errorPayload;
    },
    //Invoked from HomeTabButtons
    setActiveRoutePath(state, routePayload){
      state.activeRoutePath = routePayload;
    },
    //Invoked from SearchInput
    //Invoked from FilterRouteTab
    setUseRouterPush(state, routePayload){
      state.isLoading = true;
      useRouterPush(routePayload);
    },
  },

  actions: {},
  modules: {},
});
