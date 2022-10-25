<template>
  <div class="flex">
    <button-input v-model:searchText="searchTextMin" placeholder="Min Year">
    </button-input>
    <button-separator></button-separator>
    <button-input v-model:searchText="searchTextMax" placeholder="Max Year">
    </button-input>
  </div>
</template>
<script>
import { ref, watchEffect, onBeforeMount } from "vue";
import { ButtonSeparator, ButtonInput } from "@/components/buttonui";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  name: "FilterCoreYearBuilt",
  components: {
    ButtonInput,
    ButtonSeparator
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const searchTextMin = ref("");
    const searchTextMax = ref("");

    watchEffect(() => {
      let searchTextMinIsFourWords = searchTextMin.value.length == 4 ? true : false;
      if (searchTextMinIsFourWords | !searchTextMin.value){
        store.commit("setYearBuiltAgeMin", searchTextMin.value);
        console.log("SearchMin:", searchTextMin.value);
      };
    });
    watchEffect(() => {
      let searchTextMaxIsFourWords = searchTextMax.value.length == 4 ? true : false;
      if (searchTextMaxIsFourWords | !searchTextMax.value){
        store.commit("setYearBuiltAgeMax", searchTextMax.value);
        console.log("SearchMax:", searchTextMax.value);
      }
    });
    onBeforeMount(() => {
      if (route.query.yearBuiltMin) {
        store.commit("setIsyearBuiltMin", route.query.yearBuiltMin);
      }
      if (route.query.yearBuiltMax) {
        store.commit("setIsyearBuiltMax", route.query.yearBuiltMax);
      }
      console.log(">> onBeforeMount Yearbuilt");
    });
    return{
      searchTextMin,
      searchTextMax 
    }
  }
}
</script>