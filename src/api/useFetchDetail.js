import { ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";

const url = "https://realty-in-us.p.rapidapi.com/properties/detail"

export function useFetchDetail(){
  const store = useStore();
  const propertyDetail = ref(null);
  const error = ref(null);
  const getPropertyDetails = async (propertyId) => {
    store.commit("setIsLoading", true);
    try {
      propertyDetail.value = await axios.get(url, {
        params: {
          property_id: `${propertyId}`
        },
        headers: {
          "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com",
          "X-RapidAPI-Key": `${process.env.VUE_APP_RAPID_API_KEY}`
        }
      });
      const { 
        data: { listing }
      } = propertyDetail.value;
      console.log("Detailed Properties fetched:", listing);
      return listing;
    } catch (err) {
      console.error(err);
      error.value = true;
    } finally {
      store.commit("setIsLoading", false);
      console.log("Fetching is completed")
    }
  }
  return {
    getPropertyDetails, 
  }
}
