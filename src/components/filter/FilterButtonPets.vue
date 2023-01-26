<template>
  <div>
    <dropdown-button
      v-show="isRentPage"
      v-bind:filterActivated="buttonActivated"
      v-bind:buttonTitle="petsTitle"
      menuTitle="Pets"
    >
      <button-radio @click="dogsHandler" v-model:value="isDogsAllowed"
        >Dogs Allowed</button-radio
      >
      <button-radio @click="catsHandler" v-model:value="isCatsAllowed"
        >Cats Allowed</button-radio
      >
    </dropdown-button>
  </div>
</template>
<script>
import { ref, watchEffect, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { DropdownButton, ButtonRadio } from "@/components/buttonui";
import settingsData from "@/api/settingsData.json";
export default {
  name: "FilterButtonPets",
  components: {
    DropdownButton,
    ButtonRadio,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const storeData = computed(() => store.getters.getStore);
    const isDogsAllowed = ref("");
    const isCatsAllowed = ref("");
    const isRentPage = ref(Boolean);
    const routeNames = [...settingsData.routeNames];

    const petsTitle = computed(() => {
      return !storeData.value.propertyFilters.allowsDogs &&
        !storeData.value.propertyFilters.allowsCats
        ? "Pets"
        : storeData.value.propertyFilters.allowsDogs &&
          storeData.value.propertyFilters.allowsCats
        ? "Pets (2)"
        : storeData.value.propertyFilters.allowsDogs
        ? "Dog Pets"
        : "Cat Pets";
    });
    const buttonActivated = computed(() =>
      petsTitle.value == "Pets" ? false : true
    );

    watchEffect(() => {
      isRentPage.value =
        storeData.value.activeRoutePath == routeNames[1].id ? true : false;
    });
    watchEffect(() => {
      isCatsAllowed.value = storeData.value.propertyFilters.allowsCats;
      isDogsAllowed.value = storeData.value.propertyFilters.allowsDogs;
    });
    function dogsHandler() {
      let dogsAreAllowed = isDogsAllowed.value ? "" : true;
      store.commit("setIsDogsAllowed", dogsAreAllowed);
    }
    function catsHandler() {
      let catsAreAllowed = isCatsAllowed.value ? "" : true;
      store.commit("setIsCatsAllowed", catsAreAllowed);
    }
    onBeforeMount(() => {
      if (route.query.dogsAllowed) {
        isDogsAllowed.value = route.query.dogsAllowed;
        store.commit("setIsDogsAllowed", isDogsAllowed.value);
      }
      if (route.query.catsAllowed) {
        isCatsAllowed.value = route.query.catsAllowed;
        store.commit("setIsCatsAllowed", isCatsAllowed.value);
      }
    });
    return {
      petsTitle,
      buttonActivated,
      isDogsAllowed,
      isCatsAllowed,
      isRentPage,
      dogsHandler,
      catsHandler,
    };
  },
};
</script>
