<template>
  <home-page-layout>
    <template v-slot:header>
      <nav-bar-container>
        <nav-bar></nav-bar>
      </nav-bar-container>
    </template>
    <template v-slot:default>
      <section class="px-4">
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
                  top-4">
                <div class="m-0">
                  <div class="text-5xl sf:text-3xl font-bold shadow">
                    <h1> 
                      Discover a place <br /> 
                      you'll love to live
                    </h1>
                  </div>
                </div>
                <div class="mt-16 mb-3">
                  <home-tab-buttons></home-tab-buttons>
                </div>
                <search-box class="w-6/12 xs:w-11/12 sf:w-10/12 text-xl">
                  <search-input class="h-16"></search-input>
                </search-box>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="w-5/6 m-auto flex flex-col text-center relative top-32">
        <div class="text-4xl sf:text-3xl sf:w-10/12 m-auto text-gray-700 font-bold">
          <h1>See how Vue Estate App can help</h1>
        </div>
        <div class="flex sf:block space-x-4 justify-center mt-10 w-9/12 m-auto">
          <div 
            v-for="priority in userSearchPriorities"
            :key="priority.id" 
            class="flex flex-col items-center max-w-xs p-2 cursor-pointer">
            <component v-bind:is="priority.icon"></component>
            <h1 class="text-gray-700 text-2xl font-semibold">
              {{ priority.title }}</h1>
            <p class="font-normal text-base text-gray-600 mt-3 mb-5">
              {{ priority.description }}</p>
            <router-link :to="priority.url">
              <button 
                type="button" 
                class="
                bg-teal 
                  px-4 
                  py-2 
                  shadow-xl 
                  text-white text-base 
                  font-bold 
                  rounded-lg 
                  border border-teal 
                  hover:bg-transparent hover:text-teal 
                  focus:bg-teal-lighter focus:text-teal">
                {{ priority.callToAction }}
              </button>
            </router-link>
          </div>
        </div>
      </section>
      <section class="w-full my-8 mx-auto flex flex-col justify-center items-center relative top-40">
        <div class="mb-6">
          <h1 class="text-gray-700 text-xl font-semibold">Check out a neighborhood</h1>
        </div>
        <search-box class="w-6/12 xs:w-11/12 sf:w-10/12 text-xl">
          <search-input class="h-14 bg-gray-100"></search-input>
        </search-box>
      </section>
    </template>
    <template v-slot:footer>
    </template>
  </home-page-layout>
</template>
<script>
import { useStore } from "vuex";
import { ref, computed, watch, onMounted, reactive, watchEffect
} from "vue";
import BuyAHomeIcon from "@/assets/icons/BuyAHome.vue";
import RentAHomeIcon from "@/assets/icons/RentAHome.vue";
import NeighborHoodsIcon from "@/assets/icons/Neighborhoods.vue";
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
    BuyAHomeIcon,
    RentAHomeIcon,
    NeighborHoodsIcon
  },
  setup() {
    const store = useStore();
    // const router = useRouter();
    const stateSearchedData = ref("");
    const userFindSwitch = ref("");
    const userSearchPriorities = ref([]);
    const userLocLat = ref("");
    const userLocLong = ref("");
    const { cordinates, userEnabledLocation } = userGeolocation();
    const findHomeAndRental = [
      {
        id: "BuyHome",
        title: "Buy a Home",
        description: "With over 1 million+ homes for sale available on the website, Vue Estate App can match you with a house you will want to call home.",
        icon: "BuyAHomeIcon",
        url: "/houses-for-sale-near-me/",
        callToAction: "Find a Home"
      },
      {
        id: "RentalHome",
        title: "Rent a Home",
        description: "With 35+ filters and custom keyword search, Vue Estate App can help you easily find a home or apartment for rent that you'll love.",
        icon: "RentAHomeIcon",
        url: "/apartments-for-rent-near-me/",
        callToAction: "Find a Rental"
      }
    ];
    const neighborhoods = [
      {
        id: "Neighborhoods",
        title: "See Neighborhoods",
        description: "With more neighborhood insights than any other real estate website, we've captured the color and diversity of communities",
        icon: "NeighborHoodsIcon",
        url: "/neighborhoods/",
        callToAction: "Learn more"
      }];

    const searchedDataFromStore = computed(() => {
      return store.getters.getSearchedData
    });

    watch(searchedDataFromStore, (val) => {
      stateSearchedData.value = val;
    });

    const getIsActiveRoutePath = computed(() => {
      return store.getters.getIsActiveRouteTab;
    });

    watchEffect(() => {
      switch (getIsActiveRoutePath.value) {
        case "list-for-rent":
          userFindSwitch.value = findHomeAndRental.reverse()
          break;
        default:
          userFindSwitch.value = findHomeAndRental;
          break;
      }
      userSearchPriorities.value = [...userFindSwitch.value, ...neighborhoods];
    });
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
      userSearchPriorities,
      userLocLat,
      userLocLong,
      cordinates,
      searchedDataFromStore,
      stateSearchedData,
      userEnabledLocation,
    }
  }
};
</script>
<style scoped>
.h-100 {
  height: 27.7rem;
}
</style>
