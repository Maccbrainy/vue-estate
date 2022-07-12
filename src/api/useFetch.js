import { ref } from "vue";
// import { useStore } from "vuex";
import axios from "axios";
export async function useFetch(routeName, slug, city){
  const propertyDetail = ref(null);
  const error = ref(null);
  // propertyDetail.value = {
  //   routeName: routeName,
  //   slug: slug,
  //   cityName: city  
  // };
  try {
    const response = await axios.get(
      `https://realty-in-us.p.rapidapi.com/properties/v2/${routeName}`, 
      { 
        params: {
          city: city ? city : slug,
          state_code: slug,
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
    error.value = true;
    console.log("Error in fetching from rapid api:", e) 
  }
  return {
    error,
    propertyDetail
  }
}