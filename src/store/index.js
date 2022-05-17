import { createStore } from "vuex";
import axios from "axios";
import { buildRouterParamsUrl } from "@/composables";

export default createStore({
  state: {
    autoCompleteData:[],
    isLoading: false,
    homeType: [],
    numberOfBedRoom: "",
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
      return state.listingBranchByAgent;
    },
    //Consumed in searchResultContentLayout component
    getSearchedData(state){
      return state.searchedData; 
    },
    //Consumed in filter button agent and other active
    getIsLoading(state){
      return state.isLoading;
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
    //Invoked from filter button Agent and Other Listings
    setListingBranchByAgent(state, propertyPayLoad){
      state.listingBranchByAgent = propertyPayLoad;
    },
    //Invoked from computedAgentAndNoneAgent component
    setActiveListing(state, propertyPayLoad){
      state.activeListing = propertyPayLoad;
    },
    //Invoked from Filter button Price Range component
    setMinPriceRange(state, propertyPayLoad){
      state.propertyMinRange = propertyPayLoad;
    },
    //Invoked from Filter button Price Range component
    setMaxPriceRange(state, propertyPayLoad){
      state.propertyMaxRange = propertyPayLoad;
    },
    //Invoked from Filter button Price Range component
    setNumberOfBedRoom(state, propertyPayLoad){
      state.numberOfBedRoom = propertyPayLoad;
    },
    //Invoked from FilterButtonHomeType component
    setHomeType(state, propertyPayLoad){
      state.homeType = propertyPayLoad;
    },
    setAutoCompleteData(state, autoCompletePayLoad){
      state.autoCompleteData = autoCompletePayLoad;
    },
    //Invoked from store action
    setIsLoading(state, isLoadingPayload){
      state.isLoading = isLoadingPayload;
    }
  },

  actions: {
    //Invoked from watch function in the searchResultContentLayout component
    setPropertiesFromRemoteApi: async ({ commit }, payload) => {
      commit("setIsLoading", true);
      const url = "https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale"
      try {
        const {
          data: { properties }
        } = await axios.get(url, {
          params: {
            city: `${payload}`,
            state_code: "NY",
            offset: "0",
            limit: "200",
            sort: "relevance"
          },
          headers: {
            "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com",
            "X-RapidAPI-Key": `${process.env.VUE_APP_RAPID_API_KEY}`
          }
        })
        commit("setAllPropertyListings", properties);
        buildRouterParamsUrl(payload);
        commit("setIsLoading", false);
      } catch (error) {
        console.error(error);
        commit("setIsLoading", false);
      }
    }
  },
  modules: {},
});
