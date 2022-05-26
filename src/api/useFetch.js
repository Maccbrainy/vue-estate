import { ref } from "vue";
// import { useStore } from "vuex";
// import axios from "axios";
export async function useFetch (routName, slug, city){
  const propertyDetail = ref(null);
  const error = ref(null);
  propertyDetail.value = {
    routeName: routName,
    slug: slug,
    cityName: city.replace(/_/g, " ")  
  }
  return {
    error,
    propertyDetail
  }
}