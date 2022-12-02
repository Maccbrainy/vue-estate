<template>
  <mobile-menu-container>
    <mobile-menu-list>
      <mobile-menu-button-item>Sign up or Login</mobile-menu-button-item>
      <mobile-menu-drop-down menuTitle="Buy">
        <div v-if="currentSearchedData">
          <mobile-menu-drop-down-item
            class="hover:no-underline cursor-text text-gray-300"
            >{{
              removeUnderScoresFromAString(storeData.searchedData.city)
            }}</mobile-menu-drop-down-item
          >
          <mobile-menu-drop-down-item>
            <router-link
              :to="{
                name: 'BuyPage',
                params: {
                  slug: storeData.searchedData.state_code,
                  city: addUnderScoresToWhiteSpacesInAString(
                    storeData.searchedData.city
                  ),
                },
              }"
            >
              Homes for sale</router-link
            ></mobile-menu-drop-down-item
          >
          <mobile-menu-drop-down-item>
            <router-link
              :to="{
                name: 'BuyPage',
                params: {
                  slug: storeData.searchedData.state_code,
                  city: addUnderScoresToWhiteSpacesInAString(
                    storeData.searchedData.city
                  ),
                },
                query: {
                  hasOpenHouses: true,
                },
              }"
              >Open Houses</router-link
            ></mobile-menu-drop-down-item
          >

          <mobile-menu-drop-down-item
            ><router-link
              :to="{
                name: 'BuyPage',
                params: {
                  slug: storeData.searchedData.state_code,
                  city: addUnderScoresToWhiteSpacesInAString(
                    storeData.searchedData.city
                  ),
                },
                query: {
                  newConstruction: true,
                },
              }"
              >New Construction Homes</router-link
            ></mobile-menu-drop-down-item
          >
          <mobile-menu-drop-down-item
            ><router-link
              :to="{
                name: 'SoldPage',
                params: {
                  slug: storeData.searchedData.state_code,
                  city: addUnderScoresToWhiteSpacesInAString(
                    storeData.searchedData.city
                  ),
                },
              }"
              >Recently Sold</router-link
            ></mobile-menu-drop-down-item
          >
        </div>
      </mobile-menu-drop-down>
      <mobile-menu-drop-down menuTitle="Rent">
        <div v-if="currentSearchedData">
          <mobile-menu-drop-down-item
            class="hover:no-underline cursor-text text-gray-300"
            >{{
              removeUnderScoresFromAString(storeData.searchedData.city)
            }}</mobile-menu-drop-down-item
          ><mobile-menu-drop-down-item
            ><router-link
              :to="{
                name: 'RentPage',
                params: {
                  slug: storeData.searchedData.state_code,
                  city: addUnderScoresToWhiteSpacesInAString(
                    storeData.searchedData.city
                  ),
                },
              }"
            >
              All Rentals</router-link
            ></mobile-menu-drop-down-item
          >
          <mobile-menu-drop-down-item>
            <router-link
              :to="{
                name: 'RentPage',
                params: {
                  slug: storeData.searchedData.state_code,
                  city: addUnderScoresToWhiteSpacesInAString(
                    storeData.searchedData.city
                  ),
                },
                query: {
                  homeType: `multi_family,condo`,
                },
              }"
              >Apartments for Rent</router-link
            ></mobile-menu-drop-down-item
          >
          <mobile-menu-drop-down-item>
            <router-link
              :to="{
                name: 'RentPage',
                params: {
                  slug: storeData.searchedData.state_code,
                  city: addUnderScoresToWhiteSpacesInAString(
                    storeData.searchedData.city
                  ),
                },
                query: {
                  homeType: `single_family`,
                },
              }"
              >Houses for Rent</router-link
            ></mobile-menu-drop-down-item
          >
        </div>
        <mobile-menu-drop-down-item>
          Post A Rental Listing</mobile-menu-drop-down-item
        >
      </mobile-menu-drop-down>
      <mobile-menu-drop-down menuTitle="Mortgage">
        <mobile-menu-drop-down-item
          class="hover:no-underline cursor-text text-gray-300"
          >{{
            removeUnderScoresFromAString(storeData.searchedData.city)
          }}</mobile-menu-drop-down-item
        >
        <mobile-menu-drop-down-item
          >Mortgage Overview</mobile-menu-drop-down-item
        >
        <mobile-menu-drop-down-item
          >Get Pre-Qualified</mobile-menu-drop-down-item
        >
        <mobile-menu-drop-down-item>Mortgage Rates</mobile-menu-drop-down-item>
      </mobile-menu-drop-down>
    </mobile-menu-list>
  </mobile-menu-container>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
import {
  addUnderScoresToWhiteSpacesInAString,
  removeUnderScoresFromAString,
} from "@/helper";
import {
  MobileMenuContainer,
  MobileMenuList,
  MobileMenuButtonItem,
  MobileMenuDropDown,
  MobileMenuDropDownItem,
} from "@/components/mobile/index.js";
export default {
  name: "MobileMenu",
  components: {
    MobileMenuContainer,
    MobileMenuList,
    MobileMenuButtonItem,
    MobileMenuDropDown,
    MobileMenuDropDownItem,
  },
  setup() {
    const store = useStore();
    const storeData = computed(() => store.getters.getStore);

    const currentSearchedData = computed(() =>
      storeData.value.searchedData ? true : false
    );
    return {
      storeData,
      currentSearchedData,
      addUnderScoresToWhiteSpacesInAString,
      removeUnderScoresFromAString,
    };
  },
};
</script>
