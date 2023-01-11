<template>
  <mobile-menu-container>
    <mobile-menu-list>
      <mobile-menu-button-item v-on:click="saveHomePropertyCallback"
        >Sign up or Login</mobile-menu-button-item
      >
      <mobile-menu-drop-down menuTitle="Buy">
        <div v-if="currentSearchedData">
          <div
            v-show="storeData.searchedData.zip_code"
            class="border-b border-gray-500"
          >
            <mobile-menu-drop-down-item
              class="hover:no-underline cursor-text text-gray-300"
            >
              {{ storeData.searchedData.zip_code }} zip
            </mobile-menu-drop-down-item>
            <mobile-menu-drop-down-item>
              <router-link
                :to="{
                  name: 'BuyPage',
                  params: {
                    slug: storeData.searchedData.state_code,
                    city: addUnderScoresToWhiteSpacesInAString(
                      storeData.searchedData.city
                    ),
                    zipCode: storeData.searchedData.zip_code,
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
                    zipCode: storeData.searchedData.zip_code,
                  },
                  query: {
                    hasOpenHouses: true,
                  },
                }"
                >Open Houses</router-link
              ></mobile-menu-drop-down-item
            >

            <mobile-menu-drop-down-item class="pb-3"
              ><router-link
                :to="{
                  name: 'BuyPage',
                  params: {
                    slug: storeData.searchedData.state_code,
                    city: addUnderScoresToWhiteSpacesInAString(
                      storeData.searchedData.city
                    ),
                    zipCode: storeData.searchedData.zip_code,
                  },
                  query: {
                    newConstruction: true,
                  },
                }"
                >New Construction</router-link
              ></mobile-menu-drop-down-item
            >
          </div>
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
              >New Construction</router-link
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
        <div v-else>
          <mobile-menu-drop-down-item
            class="cursor-text text-gray-300 -mt-1 no-underline"
            >No search history found</mobile-menu-drop-down-item
          >
        </div>
      </mobile-menu-drop-down>
      <mobile-menu-drop-down menuTitle="Rent">
        <div v-if="currentSearchedData">
          <div
            v-show="storeData.searchedData.zip_code"
            class="border-b border-gray-500"
          >
            <mobile-menu-drop-down-item
              class="hover:no-underline cursor-text text-gray-300"
            >
              {{ storeData.searchedData.zip_code }} zip
            </mobile-menu-drop-down-item>
            <mobile-menu-drop-down-item>
              <router-link
                :to="{
                  name: 'RentPage',
                  params: {
                    slug: storeData.searchedData.state_code,
                    city: addUnderScoresToWhiteSpacesInAString(
                      storeData.searchedData.city
                    ),
                    zipCode: storeData.searchedData.zip_code,
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
                    zipCode: storeData.searchedData.zip_code,
                  },
                  query: {
                    homeType: `multi_family,condo`,
                  },
                }"
                >Apartments for Rent</router-link
              ></mobile-menu-drop-down-item
            >

            <mobile-menu-drop-down-item class="pb-3"
              ><router-link
                :to="{
                  name: 'RentPage',
                  params: {
                    slug: storeData.searchedData.state_code,
                    city: addUnderScoresToWhiteSpacesInAString(
                      storeData.searchedData.city
                    ),
                    zipCode: storeData.searchedData.zip_code,
                  },
                  query: {
                    homeType: `single_family`,
                  },
                }"
                >Houses for Rent</router-link
              ></mobile-menu-drop-down-item
            >
          </div>
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
        <mobile-menu-drop-down-item v-on:click="saveHomePropertyCallback">
          Post A Rental Listing</mobile-menu-drop-down-item
        >
      </mobile-menu-drop-down>
      <!-- <mobile-menu-drop-down menuTitle="Mortgage">
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
      </mobile-menu-drop-down> -->
    </mobile-menu-list>
  </mobile-menu-container>
</template>
<script>
import { useStore } from "vuex";
import { computed, inject } from "vue";
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
    const { saveHomePropertyCallback } = inject("provider");
    const storeData = computed(() => store.getters.getStore);

    const currentSearchedData = computed(() =>
      Object.keys(storeData.value.searchedData).length > 0 ? true : false
    );
    return {
      storeData,
      currentSearchedData,
      addUnderScoresToWhiteSpacesInAString,
      removeUnderScoresFromAString,
      saveHomePropertyCallback,
    };
  },
};
</script>
