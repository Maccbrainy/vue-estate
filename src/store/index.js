import { createStore } from "vuex";
export default createStore({
  state: {
    searchedData: {},
    successfulSearchHistory: [{}],
  },
  getters: {
    getSearchedData(state){
      if (!state.searchedData){
        return;
      } else{
        return state.searchedData;
      }
    }
  },
  mutations: {
    setSearchedData(state, searchedPayLoad){
      state.searchedData = searchedPayLoad;
    },
    setSuccessfulSearchHistory(state, searchedPayLoad){
      state.successfulSearchHistory.unshift(searchedPayLoad);
    }
  },

  actions: {},
  modules: {},
});
