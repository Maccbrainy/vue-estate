import { ref } from "vue";
import { useStore } from "vuex";
import homeResourcesData from "@/api/homeResourcesData";
// import axios from "axios";

const url = 
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary"
const options = {
  params: {
    bl_latitude: "11.847676",
    tr_latitude: "12.838442",
    bl_longitude: "109.095887",
    tr_longitude: "109.149359",
  },
  headers: {
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    "X-RapidAPI-Key": "677b340b10mshb59d46acdd85017p1cef8djsne8fef785e371"
  }
};

export default function https(){
  const store = useStore();
  const propertyData = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const getListings = async () => {

    loading.value = true;
    propertyData.value = error.value = null;

    try {

      const { homeResources } = homeResourcesData();
      // propertyData.value = await axios.get(url, options);
      // const { 
      //   data: { data } 
      // } = propertyData.value;
      // console.log("From api indexjs file data:", data);
      // return data;
      // console.log("From api index:", homeResources);
      store.commit("setAllPropertyListings", homeResources);

    } catch (err) {
      console.error(err);
      error.value = true;
    } finally {
      loading.value = false;
    }
  }
  return {
    loading,
    url,
    options,
    error,
    getListings, 
  }
}
