<template>
  <home-page-layout>
    <template v-slot:header>
      <section class="px-4">
        <div class="flex flex-col overflow-visible">
          <div class="relative -bottom-16">
            <div class="w-full h-100 overflow-hidden">
              <picture class="w-full h-full flex">
                <img
                  src="../assets/images/HomePage.jpg"
                  alt="HomePage image"
                  class="w-full h-full object-center object-cover rounded-xl"
                />
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
                  top-4
                "
              >
                <div
                  class="
                    text-center text-5xl
                    sf:text-3xl
                    font-bold
                    shadow-md
                    transform
                    translate-y-4
                  "
                >
                  <h1>Real Estate Market Place</h1>
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
    </template>
    <template v-slot:default>
      <section class="relative top-32">
        <div class="hidden w-full relative box-border overflow-hidden">
          <button
            v-if="moveIndex < 0"
            v-on:click="moveSlides(-1)"
            class="absolute z-10 left-0 top-1/2"
          >
            <chevron-left
              class="
                text-gray-800
                w-8
                h-8
                p-2
                ml-3
                bg-white
                rounded-full
                shadow-md
                transform
                hover:scale-105
                active:bg-gray-300
              "
            />
          </button>
          <button
            v-if="moveIndex != -1000"
            class="absolute z-10 right-0 top-1/2"
          >
            <chevron-right
              v-on:click="moveSlides(1)"
              class="
                text-gray-800
                w-8
                h-8
                p-2
                mr-3
                bg-white
                rounded-full
                shadow-md
                transform
                hover:scale-105
                active:bg-gray-300
              "
            />
          </button>
          <ul class="flex flex-nowrap">
            <!-- <search-result-item-card 
            v-for="(home, i) in reference"
            v-bind:key="home.property_id || home.id"
            v-bind:ref="el => itemRefs[i] = el"
            v-bind:home="home"
            class="duration-700">
          </search-result-item-card> -->
            <li
              v-if="moveIndex == -1000"
              class="
                block
                flex-initial
                border-solid border-transparent border-r-8 border-l-8 border-t-8
                pb-4
                xs:w-full
                sm:w-full
                md:w-full
                lg:w-6/12
                xl:w-6/12
                2xl:w-4/12
                3xl:w-3/12
              "
            >
              <div
                class="
                  relative
                  w-full
                  h-44
                  bg-gray-200
                  rounded-xl
                  overflow-hidden
                "
              >
                See more homes for sale
              </div>
            </li>
          </ul>
        </div>
        <div
          class="
            max-w-6xl
            mf:w-full
            m-auto
            flex flex-col
            text-center
            relative
            pb-10
          "
        >
          <div
            class="
              text-4xl
              sf:text-3xl sf:w-10/12
              m-auto
              text-gray-700
              font-bold
            "
          >
            <h1>See how Vue Estate App can help</h1>
          </div>
          <div
            class="flex sf:grid justify-center mt-10 w-9/12 lf:w-11/12 m-auto"
          >
            <call-to-action-card v-bind:callToActionsData="searchNearMeModel">
            </call-to-action-card>
          </div>
        </div>
        <div
          class="
            absolute
            w-full
            my-8
            mx-auto
            flex flex-col
            justify-center
            items-center
          "
        >
          <div class="mb-6">
            <h1 class="text-gray-700 text-xl font-semibold">
              Check out a neighborhood
            </h1>
          </div>
          <search-box class="w-6/12 xs:w-11/12 sf:w-10/12 text-xl">
            <search-input class="h-14 bg-gray-100"></search-input>
          </search-box>
        </div>
      </section>
    </template>
    <template v-slot:footer>
      <section class="listColumns w-full md:flex relative top-80">
        <div class="max-w-7xl md:flex md:m-auto">
          <show-hide-list-columns
            listColumnTitle="Real Estate Markets"
            suffix="Real Estate"
            v-bind:listColumnData="marketPlaces"
          >
          </show-hide-list-columns>
          <show-hide-list-columns
            listColumnTitle="Popular Searches"
            suffix="For Sale"
            v-bind:listColumnData="marketPlaces"
          >
          </show-hide-list-columns>
          <show-hide-list-columns
            listColumnTitle="Explore Vue Estate"
            v-bind:listColumnData="exploreContact"
          >
          </show-hide-list-columns>
          <show-hide-list-columns
            listColumnTitle="For Professionals"
            v-bind:listColumnData="forProfessionals"
          >
          </show-hide-list-columns>
        </div>
      </section>
    </template>
  </home-page-layout>
</template>
<script>
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";
import { SearchBox, SearchInput } from "@/components/buttonui";
import HomeTabButtons from "@/components/HomeTabButtons.vue";
import ShowHideListColumns from "@/components/ShowHideListColumns.vue";
import CallToActionCard from "@/components/CallToActionCard.vue";
import { HomePageLayout } from "@/layouts";
import jsonProperties from "@/api/autoComplete.json";
import { ChevronRight, ChevronLeft } from "@/assets/icons";
export default {
  name: "TheHomePage",
  components: {
    SearchBox,
    SearchInput,
    HomePageLayout,
    HomeTabButtons,
    ShowHideListColumns,
    CallToActionCard,
    // SearchResultItemCard,
    ChevronRight,
    ChevronLeft,
  },
  setup() {
    const store = useStore();
    const storeData = computed(() => store.getters.getStore);
    const userLocLat = ref("");
    const userLocLong = ref("");
    const findHomeAndRental = [
      {
        id: "BuyHome",
        title: "Buy a Home",
        description:
          "With over 1 million+ homes for sale available on the website, Vue Estate App can match you with a house you will want to call home.",
        icon: "BuyAHomeIcon",
        urlId: "SalesNearMe",
        callToAction: "Find a Home",
      },
      {
        id: "RentalHome",
        title: "Rent a Home",
        description:
          "With 35+ filters and custom keyword search, Vue Estate App can help you easily find a home or apartment for rent that you'll love.",
        icon: "RentAHomeIcon",
        urlId: "RentsNearMe",
        callToAction: "Find a Rental",
      },
    ];
    const neighborhoods = [
      {
        id: "Neighborhoods",
        title: "See Neighborhoods",
        description:
          "With more neighborhood insights than any other real estate website, we've captured the color and diversity of communities",
        icon: "NeighborHoodsIcon",
        urlId: "neighborhoods",
        callToAction: "Learn more",
      },
    ];

    const searchNearMeModel = computed(() => {
      let compositionData =
        storeData.value.activeRoutePath == "list-for-rent"
          ? [...findHomeAndRental].reverse()
          : findHomeAndRental;
      return [...compositionData, ...neighborhoods];
    });

    const autoComplete = ref(jsonProperties.property);
    const removeDuplicateHomeData = autoComplete.value.reduce(
      (accumulator, currentValue) => {
        let duplicateScreening = !accumulator.some(
          (property) => property.state === currentValue.state
        );
        if (duplicateScreening) {
          accumulator.push({
            state: currentValue.state,
            state_code: currentValue.state_code,
          });
        }
        return accumulator;
      },
      []
    );
    const arrangeAscendingOrder = removeDuplicateHomeData.sort((a, b) => {
      const stateA = a.state.toUpperCase();
      const stateB = b.state.toUpperCase();
      if (stateA < stateB) {
        return -1;
      }
      if (stateA > stateB) {
        return 1;
      }
      //State must be equal
      return 0;
    });
    const forProfessionals = [
      {
        name: "Popular County",
        url: "",
      },
      {
        name: "Rental Communities County",
        url: "",
      },
      {
        name: "Real Estate leads",
        url: "",
      },
    ];

    const exploreContact = [
      {
        name: "Facebook",
        url: "",
      },
      {
        name: "Twitter",
        url: "",
      },
      {
        name: "Community Sitemap",
        url: "",
      },
      {
        name: "Vue App Sitemap",
        url: "",
      },
      {
        name: "All Real Estate Markets",
        url: "",
      },
      {
        name: "All Rental Markets",
        url: "",
      },
    ];
    const itemRefs = ref([]);
    const moveIndex = ref(0);
    const itemsUl = ref([]);

    const moveSlides = () => {
      console.log("moveSlide");
    };

    onMounted(() => {
      groupItems();
    });
    function groupItems() {
      console.log("Working on slide");
    }

    return {
      itemRefs,
      itemsUl,
      searchNearMeModel,
      userLocLat,
      userLocLong,
      marketPlaces: arrangeAscendingOrder,
      forProfessionals,
      exploreContact,
      moveSlides,
      moveIndex,
    };
  },
};
</script>
<style scoped>
.h-100 {
  height: 27.7rem;
}
</style>
