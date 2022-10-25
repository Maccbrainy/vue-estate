import { ref } from "vue";
export default function clientLocalStorage(searchTerm, hyphenFreeProp) {
  const savedSearchedData = ref("");
  const cityData = ref("");
  savedSearchedData.value = searchTerm;
  cityData.value = hyphenFreeProp ? `${hyphenFreeProp}, ` : "";
  localStorage.savedSearchedData = cityData.value + savedSearchedData.value;
  return {
    savedSearchedData,
  };
}
