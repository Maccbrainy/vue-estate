import { ref, reactive } from "vue";
import axios from "axios";
export default class Http {
  async getData(url){
    const dataResult = ref(null);
    const loadState = reactive({
      loading: false,
      error: null,
    });
    try {
      loadState.loading = true;
      dataResult.value = loadState.error = null;
      const response = await axios.get(url);
      dataResult.value = response;
    } catch (e){
      loadState.error = true; 
    } finally {
      loadState.loading = false;
    }
    return {
      dataResult, 
      ...loadState,
    };
  }
} 