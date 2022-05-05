import { createStore } from "vuex";

export default createStore({
  state: {
    propertyMinRange:"",
    propertyMaxRange:"",
    listingBranchByAgent: "active",
    searchedData: {},
    successfulSearchHistory: [{}],
    allPropertyListings: {},
    propertyListingsByAgent: {},
    propertyListingsByNoneAgent: {},
    activeListing: {},
  },
  getters: {
    getListingBranchByAgent(state){
      return state.listingBranchByAgent ? state.listingBranchByAgent : null;
    },
    //Consumed in searchResultContentLayout component
    getSearchedData(state){
      return state.searchedData ? state.searchedData : null; 
    },
    //Consumed in searchResultContentLayout component
    getAllPropertyListings(state){
      return state.allPropertyListings ? state.allPropertyListings : null;
    },
    getPropertyListingsByAgent(state){
      return state.propertyListingsByAgent 
        ? state.propertyListingsByAgent : null;
    },
    getPropertyListingsByNoneAgent(state){
      return state.propertyListingsByNoneAgent 
        ? state.propertyListingsByNoneAgent : null;
    },
    getActiveListing(state){
      return state.activeListing ? state.activeListing : null;
    }

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
    //Invoked from filter button Toggle Active component
    setListingBranchByAgent(state, propertyPayLoad){
      state.listingBranchByAgent = propertyPayLoad;
    },
    //Invoked from computedAgentAndNoneAgent component
    setActiveListing(state, propertyPayLoad){
      state.activeListing = propertyPayLoad;
    },
    //Invoked from Filter button Range component
    setMinPriceRange(state, propertyPayLoad){
      state.propertyMinRange = propertyPayLoad;
    },
    //Invoked from Filter button Range component
    setMaxPriceRange(state, propertyPayLoad){
      state.propertyMaxRange = propertyPayLoad;
    },
  },

  actions: {},
  modules: {},
});
