<template>
  <home-page-layout>
    <template v-slot:header>
      <nav-bar-container>
        <nav-bar></nav-bar>
      </nav-bar-container>
    </template>
    <template v-slot:default>
      <div class="px-4">
        <div class="flex flex-col overflow-visible">
          <div class="relative -bottom-16">
            <div class="w-full h-100 overflow-hidden">
              <picture class="w-full h-full flex">
                <img 
                  src="../assets/images/HomePage.jpg"
                  alt="HomePage image" 
                  class="w-full h-full object-center object-cover rounded-xl" />
              </picture> 
            </div>
            <div class="text-white">
              <div 
                class="
                  absolute
                  pt-20
                  px-4
                  pb-4
                  overflow-visible 
                  flex flex-col 
                  w-full 
                  h-full 
                  items-center 
                  top-0">
                <div class="m-0">
                  <div class="text-5xl font-bold shadow">
                    <h1> 
                      Discover a place <br /> 
                      you'll love to live
                    </h1>
                  </div>
                </div>
                <div class="mt-16 mb-3">
                  <home-tab-buttons></home-tab-buttons>
                </div>
                <search-box class="w-5/12 text-xl">
                  <search-input class="h-16"></search-input>
                </search-box>
              </div>
            </div>
            <div class="w-5/6 my-8 mx-auto flex flex-col text-center">
              <div class="text-4xl text-gray-700 font-bold">
                <h1>See how Vue Estate App can help</h1></div>
              <div class="flex flex-row space-x-4 justify-center">
                <div>Rent a home {{ userLocLat }} {{ userLocLong }}</div>
                <div>Buy a home</div>
                <div>See neighborhoods</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
    </template>
  </home-page-layout>
</template>
<script>
import { useStore } from "vuex";
import { ref, computed, watch, onMounted, reactive } from "vue";
import { SearchBox, SearchInput } from "@/components/buttonui";
import NavBarContainer from "@/components/NavBarContainer.vue";
import HomeTabButtons from "@/components/HomeTabButtons.vue";
import NavBar from "@/components/NavBar.vue";
import HomePageLayout from "@/layouts/HomePageLayout.vue";
import userGeolocation from "@/helper/userGeolocation";
export default {
  name: "HomePage",
  components: {
    NavBarContainer,
    NavBar,
    SearchBox,
    SearchInput,
    HomePageLayout,
    HomeTabButtons,
    // ButtonBox,
    // SearchButton,
  },
  setup() {
    const store = useStore();
    const stateSearchedData = ref("");
    const userLocLat = ref("");
    const userLocLong = ref("");
    // const userLatLong = reactive({})
    const searchedDataFromStore = computed(() => {
      return store.getters.getSearchedData
    });
    watch(searchedDataFromStore, (val) => {
      stateSearchedData.value = val;
      console.log("This is coming from the TheHomePage component");
    });
    const { cordinates, userEnabledLocation } = userGeolocation();

    console.log("From Destructured:", cordinates);

    onMounted(() => {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          const userCordinates = reactive({
            lat: latitude,
            long: longitude,
          })
          userLocLat.value = userCordinates.lat;
          userLocLong.value = userCordinates.long;
          console.log("From HomePage onmounted", userCordinates); 
        })
    });
    return {
      userLocLat,
      userLocLong,
      searchedDataFromStore,
      stateSearchedData,
      userEnabledLocation
    }
  }
};
</script>
<style scoped>
.h-100 {
  height: 27.7rem;
}
</style>
