import { ref } from "vue";
import axios from "axios";

const url = "https://realty-in-us.p.rapidapi.com/properties/detail";

export async function useFetchDetail(propertyId) {
  const propertyFullContents = ref([]);
  const errorFetch = ref({});

  try {
    errorFetch.value = {};
    const response = await axios.get(url, {
      params: {
        property_id: `${propertyId}`,
      },
      headers: {
        "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com",
        "X-RapidAPI-Key": `${process.env.VUE_APP_RAPID_API_KEY}`,
      },
    });
    const {
      data: { listing },
    } = response;
    propertyFullContents.value = listing;
  } catch (err) {
    errorFetch.value.isError = true;
    errorFetch.value.description = err;
  }
  return {
    propertyFullContents,
    errorFetch,
  };
}
