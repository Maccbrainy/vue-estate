import { ref } from "vue";
import settingsData from "@/api/settingsData.json";
// import store from "@/store";
// import axios from "axios";
export async function useFetch(
  queryEndpointType,
  slug,
  city,
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
){
  const propertyDetail = ref([]);
  const err = ref(null);

  let cityName = city ? city.replace(/_/g," ") : "";
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

  
  console.log("From useFetch queryEndpointType:", queryEndpointType );
  console.log("From useFetch slug:", slug);
  console.log("From useFetch cityName:", cityName);
  console.log("From useFetch sortingType:", sortingType);
  console.log("From useFetch propType:", propType);
  console.log("From useFetch bedsMin:", bedParam);
  console.log("From useFetch priceMinValue:", priceMinValue);
  console.log("From useFetch priceMaxValue:", priceMaxValue);

  console.log("From useFetch catsAllowed:", allowsCats );
  console.log("From useFetch allowsDogs:", allowsDogs);
  console.log("From useFetch homeFeatures:", propFeatures);

  console.log("From useFetch bathNumber:", bathParam);

  console.log("From useFetch searchRadius:", searchRadius);
  console.log("From useFetch lotSize:", lotSize);
  console.log("From useFetch foreclosure:", isForeclosure);
  console.log("From useFetch openHouses:", openHouses);

  console.log("From useFetch threeDtours:", threeDtours);

  console.log("From useFetch newConstruction:", newConstruction);
  console.log("From useFetch contingents:", contingents);
  console.log("From useFetch newPlans:", newPlans);
  console.log("From useFetch ageMax:", ageMax);
  console.log("From useFetch ageMin:", ageMin);
  console.log("From useFetch latitude:", latitude);
  console.log("From useFetch longtitude:", longitude);



  propertyDetail.value = [...settingsData.properties];

  // try {
  //   err.value = null;
  //   // store.commit("setCaughtError", err.value);
  //   const response = await axios.get(
  //     `https://realty-in-us.p.rapidapi.com/properties/v2/${queryEndpointType}`, 
  //     { 
  //       params: {
  //         city: cityName ? cityName : slug,
  //         state_code: slug,
  //         offset: "0",
  //         limit: "40",
  //         sort: sortingType,
  //         prop_type: propType,
  //         beds_min: bedParam,
  //         price_min: priceMinValue,
  //         price_max: priceMaxValue,

  //         allows_cats: allowsCats,
  //         allows_dogs: allowsDogs,
  //         features: propFeatures,
  //         baths_min: bathParam,
  //         radius: searchRadius,
  //         lot_sqft_min: lotSize,
  //         is_foreclosure: isForeclosure,
  //         has_open_house: openHouses,
  //         is_matterports: threeDtours,
  //         is_new_construction: newConstruction,
  //         is_contingent: contingents,
  //         is_new_plan: newPlans,
  //         age_min: ageMin,
  //         age_max: ageMax,
  //         lat_min: latitude,
  //         lng_min: longitude,
  //       },
  //       headers: {
  //         "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com",
  //         "X-RapidAPI-Key": `${process.env.VUE_APP_RAPID_API_KEY}`
  //       }
  //     });
  //   propertyDetail.value = response.data.properties;
  //   console.log("DATA FETCHED:", propertyDetail.value)
  // } catch (err){
  //   err.value = err;
  //   console.log("Error in fetching from rapid api 1:", err); 
  //   console.log("Error in fetching from rapid api 2:", err.value); 
  // } 

  return {
    propertyDetail,
    err,
  }
}