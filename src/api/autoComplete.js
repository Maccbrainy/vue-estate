import axios from "axios";
import { useStore } from "vuex";

const url = "https://realty-in-us.p.rapidapi.com/locations/auto-complete"
export const autoComplete = async () =>{
  const store = useStore();
  try {
    const { 
      data: { autocomplete } 
    } = await axios.get(url, {
      params: {
        input: ""
      },
      headers: {
        "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com",
        "X-RapidAPI-Key": `${process.env.VUE_APP_RAPID_API_KEY}`
      } 
    });
    // console.log("Autocomplete Module:", autocomplete);
    store.commit("setAutoCompleteData", autocomplete);
  } catch (error) {
    console.error(error);
  }
}