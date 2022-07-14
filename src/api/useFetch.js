import { ref } from "vue";
import store from "@/store";
import axios from "axios";
export async function useFetch(route, slug, city){
  const propertyDetail = ref(null);
  const errorCatch = ref(null);
  // const isLoading = ref(null);

  let routeName = route;
  let slugName = slug;
  let cityName = city.replace(/_/g," ");

  try {
    errorCatch.value = false;
    store.commit("setCaughtError", errorCatch.value);
    const response = await axios.get(
      `https://realty-in-us.p.rapidapi.com/properties/v2/${routeName}`, 
      { 
        params: {
          city: cityName ? cityName : slugName,
          state_code: slugName,
          offset: "0",
          limit: "200",
          sort: "relevance"
        },
        headers: {
          "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com",
          "X-RapidAPI-Key": `${process.env.VUE_APP_RAPID_API_KEY}`
        }
      });
    propertyDetail.value = response;
  } catch (e){
    errorCatch.value = true;
    store.commit("setCaughtError", true);
    console.log("Error in fetching from rapid api:", e) 
  } 
  return {
    errorCatch,
    propertyDetail
  }
}