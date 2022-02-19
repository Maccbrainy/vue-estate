import { ref } from "vue";
import axios from "axios";
export function https() {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const getData = async (url) => {
    loading.value = true;
    data.value = error.value = null;
    try {
      data.value = await axios.get(url);
    } catch (err) {
      error.value = true;
    }
    loading.value = false;
  };
  return {
    data, 
    loading, 
    error, 
    getData,
  };
}