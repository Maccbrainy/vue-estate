import { ref } from "vue";
// import store from "@/store";
// import axios from "axios";
export async function useFetch(
  routeName, 
  slugName,
  city, 
  propertyType, 
  sortType, 
  bedsMin, 
  priceMin, 
  priceMax,
  catsAllowed,
  dogsAllowed,
  homeFeatures,
  bathNumber,
  searchRadius,
  lotSize,
  foreclosure,
  openHouses,
  threeDtours,
  newConstruction,
  contingents,
  newPlans,
  ageMax,
  ageMin
){
  const propertyDetail = ref(null);
  const err = ref(null);
  // const isLoading = ref(null);

  // let routeName = route;
  // let slugName = slug;
  let cityName = city ? city.replace(/_/g," ") : "";
  let sortingType = sortType ? sortType : "newest";
  // let propType = propertyType.length > 0 ? propertyType.join() : "";
  let propType = 
    propertyType || propertyType.length > 0 ? propertyType.join() : "";
  let propFeatures = !propFeatures 
    ? "" 
    : homeFeatures.length > 0 
    ? homeFeatures.join() 
    : "";
  // let propFeatures = homeFeatures ? homeFeatures.join() : "";
  // let bedsMin = bedNumber ? bedNumber : "";
  // let priceMinValue = priceMin ? priceMin : "";
  // let priceMaxValue = priceMax ? priceMax : "";
  //is_pending

  
  console.log("From useFetch routeName:", routeName );
  console.log("From useFetch slugName:", slugName);
  console.log("From useFetch cityName:", cityName);
  console.log("From useFetch sortingType:", sortingType);
  console.log("From useFetch propType:", propType);
  console.log("From useFetch bedsMin:", bedsMin);
  console.log("From useFetch priceMinValue:", priceMin);
  console.log("From useFetch priceMaxValue:", priceMax);

  console.log("From useFetch catsAllowed:", catsAllowed );
  console.log("From useFetch dogsAllowed:", dogsAllowed);
  console.log("From useFetch homeFeatures:", propFeatures);
  console.log("From useFetch bathNumber:", bathNumber);
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



  propertyDetail.value = "I AM THE DATA AND THE DATA";

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
  //         age_max: ageMax
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