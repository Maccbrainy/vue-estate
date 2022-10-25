import { ref } from "vue";
import settingsData from "@/api/settingsData.json";
// import store from "@/store";
// import axios from "axios";
export async function useFetch(
  routeName,
  latitude,
  longitude, 
  slugName,
  city, 
  priceMin, 
  priceMax,
  bedsMin,
  propertyType, 
  bathNumber,
  homeFeatures,
  sortType, 
  catsAllowed,
  dogsAllowed,
  searchRadius,
  lotSize,
  foreclosure,
  openHouses,
  threeDtours,
  newConstruction,
  contingents,
  newPlans,
  ageMax,
  ageMin,
){
  const propertyDetail = ref(null);
  const err = ref(null);

  let cityName = city ? city.replace(/_/g," ") : "";
  let sortingType = sortType ? sortType : "newest";
  let propType = !propertyType
    ? ""
    : propertyType.length > 0 
    ? propertyType.join() 
    : "";
  let priceMinParam = priceMin ? priceMin : "";
  let priceMaxParam = priceMax ? priceMax : "";
  let bedParam = bedsMin ? bedsMin : "";
  let bathParam = bathNumber ? bathNumber : "";
  let propFeatures = !homeFeatures 
    ? "" 
    : homeFeatures.length > 0 
    ? homeFeatures.join() 
    : "";
  //is_pending

  
  console.log("From useFetch routeName:", routeName );
  console.log("From useFetch slugName:", slugName);
  console.log("From useFetch cityName:", cityName);
  console.log("From useFetch sortingType:", sortingType);
  console.log("From useFetch propType:", propType);
  console.log("From useFetch bedsMin:", bedParam);
  console.log("From useFetch priceMinValue:", priceMinParam);
  console.log("From useFetch priceMaxValue:", priceMaxParam);

  console.log("From useFetch catsAllowed:", catsAllowed );
  console.log("From useFetch dogsAllowed:", dogsAllowed);
  console.log("From useFetch homeFeatures:", propFeatures);
  console.log("From useFetch bathNumber:", bathParam);
  console.log("From useFetch searchRadius:", searchRadius);
  console.log("From useFetch lotSize:", lotSize);
  console.log("From useFetch foreclosure:", foreclosure);
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
  //   err.value = false;
  //   store.commit("setCaughtError", err.value);
  //   const response = await axios.get(
  //     `https://realty-in-us.p.rapidapi.com/properties/v2/${routeName}`, 
  //     { 
  //       params: {
  //         city: cityName ? cityName : slugName,
  //         state_code: slugName,
  //         offset: "0",
  //         limit: "40",
  //         sort: sortingType,
  //         prop_type: propType,
  //         beds_min: bedsMin,
  //         price_min: priceMin,
  //         price_max: priceMax,

  //         allows_cats: catsAllowed,
  //         allows_dogs: dogsAllowed,
  //         features: propFeatures,
  //         baths_min: bathNumber,
  //         radius: searchRadius,
  //         lot_sqft_min: lotSize,
  //         is_foreclosure: foreclosure,
  //         has_open_house: openHouses,
  //         is_matterports: threeDtours,
  //         is_new_construction: newConstruction,
  //         is_contingent: contingents,
  //         is_new_plan: newPlans,
  //         age_min: ageMin,
  //         age_max: ageMax,
            //  lat_min: latitude,
            //  lng_min: longitude,
  //       },
  //       headers: {
  //         "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com",
  //         "X-RapidAPI-Key": `${process.env.VUE_APP_RAPID_API_KEY}`
  //       }
  //     });
  //   propertyDetail.value = response;
  // } catch (err){
  //   err.value = true;
  //   store.commit("setCaughtError", err.value.toString);
  //   console.log("Error in fetching from rapid api:", err) 
  // } 

  return {
    propertyDetail,
    err,
  }
}