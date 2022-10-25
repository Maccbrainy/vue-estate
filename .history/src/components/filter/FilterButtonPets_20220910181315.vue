<template>
  <div>
    <dropdown-button 
      v-show="isRentPage"
      v-bind:filterActivated="buttonActivated" 
      v-bind:buttonTitle="petsTitle" 
      menuTitle="Pets">
      <button-radio @click="dogsHandler" v-model:value="isDogsAllowed">Dogs Allowed</button-radio>
      <button-radio @click="catsHandler" v-model:value="isCatsAllowed">Cats Allowed</button-radio>
    </dropdown-button> 
  </div>
</template>
<script>
import { ref, watchEffect, computed } from "vue";
import { useStore } from "vuex";
import { DropdownButton, ButtonRadio } from "@/components/buttonui";
import settingsData from "@/api/settingsData.json";
export default {
  name: "FilterButtonPets",
  components: {
    DropdownButton,
    ButtonRadio
  },
  setup() {
    const store = useStore();
    const getAllowsCats = computed(() => store.getters.getAllowsCats);
    const getAllowsDogs = computed(() => store.getters.getAllowsDogs);
    const isDogsAllowed = ref("");
    const isCatsAllowed = ref("");
    const isRentPage = ref(Boolean);
    const routeNames = [...settingsData.routeNames];

    const getActiveRoutePath = computed(
      () => store.getters.getIsActiveRouteTab);

    const petsTitle = computed(() => {
      return !getAllowsDogs.value && !getAllowsCats.value 
        ? "Pets"
        : getAllowsDogs.value && getAllowsCats.value
        ? "Pets (2)"
        : getAllowsDogs.value
        ? "Dog Pets"
        : "Cat Pets" 
    });
    const buttonActivated = computed(() => 
      petsTitle.value == "Pets" ? false : true);

    watchEffect(() => {
      isRentPage.value = 
        getActiveRoutePath.value == routeNames[1].id ? true : false;
    });
    watchEffect(() => {
      isCatsAllowed.value = getAllowsCats.value;
      isDogsAllowed.value = getAllowsDogs.value;
    });
    function dogsHandler(){
      let dogsAreAllowed = isDogsAllowed.value ? "" : true;
      store.commit("setIsDogsAllowed", dogsAreAllowed);
    }
    function catsHandler(){
      let catsAreAllowed = isCatsAllowed.value ? "" : true;
      store.commit("setIsCatsAllowed", catsAreAllowed);
    }
    return {
      petsTitle,
      buttonActivated,
      isDogsAllowed,
      isCatsAllowed,
      isRentPage,
      dogsHandler,
      catsHandler
    }
  }
}
</script>