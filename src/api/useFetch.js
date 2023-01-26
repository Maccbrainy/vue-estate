import { ref } from "vue";
import axios from "axios";
export async function useFetch(
  queryEndpointType,
  slug,
  city,
  pageLimit,
  pageOffSet,
  sorting,
  bedroom,
  bathroom,
  priceMin,
  priceMax,
  homeType,
  dogsAllowed,
  catsAllowed,
  homeFeatures,
  yearBuiltMin,
  yearBuiltMax,
  lotSize,
  hasOpenHouses,
  has3DTours,
  foreClosure,
  newConstruction,
  newPlans,
  radius,
  contingents,
  latitude,
  longitude,
  postalCode
) {
  const propertyListResults = ref([]);
  const propertyTotalMatchingRows = ref(0);
  const errorFetch = ref({});

  let slugName = slug;
  let cityName = city ? city.replace(/_/g, " ") : "";
  let sortingType = sorting || "relevance";
  let bedParam = bedroom || "";
  let bathParam = bathroom || "";
  let priceMinValue = priceMin || "";
  let priceMaxValue = priceMax || "";
  let propType = !homeType ? "" : homeType.length > 0 ? homeType : "";
  let allowsDogs = dogsAllowed || "";
  let allowsCats = catsAllowed || "";
  let propFeatures = !homeFeatures
    ? ""
    : homeFeatures.length > 0
    ? homeFeatures
    : "";
  let ageMax = yearBuiltMin || "";
  let ageMin = yearBuiltMax || "";
  let openHouses = hasOpenHouses || "";
  let threeDtours = has3DTours || "";
  let isForeclosure = foreClosure || "";
  let searchRadius = radius || "";
  //is_pending
  try {
    errorFetch.value = {};
    const response = await axios.get(
      `https://realty-in-us.p.rapidapi.com/properties/v2/${queryEndpointType}`,
      {
        params: {
          city: cityName,
          state_code: slugName,
          offset: pageOffSet,
          limit: pageLimit,
          postal_code: postalCode,
          sort: sortingType,
          prop_type: propType,
          beds_min: bedParam,
          price_min: priceMinValue,
          price_max: priceMaxValue,

          allows_cats: allowsCats,
          allows_dogs: allowsDogs,
          features: propFeatures,
          baths_min: bathParam,
          radius: searchRadius,
          lot_sqft_min: lotSize,
          is_foreclosure: isForeclosure,
          has_open_house: openHouses,
          is_matterports: threeDtours,
          is_new_construction: newConstruction,
          is_contingent: contingents,
          is_new_plan: newPlans,
          age_min: ageMin,
          age_max: ageMax,
          lat_min: latitude,
          lng_min: longitude,
        },
        headers: {
          "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com",
          "X-RapidAPI-Key": `${process.env.VUE_APP_RAPID_API_KEY}`,
        },
      }
    );
    propertyTotalMatchingRows.value = response.data.meta.matching_rows;
    propertyListResults.value = response.data.properties;
  } catch (err) {
    errorFetch.value.isError = true;
    errorFetch.value.errorDescription = err;
  }

  return {
    propertyListResults,
    propertyTotalMatchingRows,
    errorFetch,
  };
}
