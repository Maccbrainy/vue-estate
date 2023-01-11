<template>
  <nav-bar-box>
    <nav-bar-item>
      <router-link
        v-if="currentSearchedData"
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
        Buy</router-link
      >
      <router-link to="/" v-else>Buy</router-link>
      <nav-bar-dropdown v-if="currentSearchedData">
        <div v-show="storeData.searchedData.zip_code" class="border-b">
          <nav-bar-dropdown-item
            class="cursor-text font-medium hover:no-underline"
          >
            {{ storeData.searchedData.zip_code }} zip
          </nav-bar-dropdown-item>
          <nav-bar-dropdown-item
            :title="`Homes for sale in ${storeData.searchedData.zip_code} zip code`"
            class="text-teal hover:bg-gray-200"
          >
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
            >
          </nav-bar-dropdown-item>
          <nav-bar-dropdown-item
            class="text-teal hover:bg-gray-200"
            :title="`Open Houses in ${storeData.searchedData.zip_code} zip code`"
          >
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
            >
          </nav-bar-dropdown-item>
          <nav-bar-dropdown-item
            class="text-teal hover:bg-gray-200"
            :title="`New Constructions in ${storeData.searchedData.zip_code} zip code`"
          >
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
                  newConstruction: true,
                },
              }"
              >New Constructions</router-link
            >
          </nav-bar-dropdown-item>
        </div>
        <nav-bar-dropdown-item
          class="cursor-text font-medium hover:no-underline"
        >
          {{ removeUnderScoresFromAString(storeData.searchedData.city) }}
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item
          :title="`Homes for sale ${removeUnderScoresFromAString(isTitle)}`"
          class="text-teal hover:bg-gray-200"
        >
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
          >
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item
          class="text-teal hover:bg-gray-200"
          :title="`Open Houses ${removeUnderScoresFromAString(isTitle)}`"
        >
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
          >
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item
          :title="`New Construction Homes ${removeUnderScoresFromAString(
            isTitle
          )}`"
          class="text-teal hover:bg-gray-200"
        >
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
                newConstruction: true,
              },
            }"
            >New Constructions</router-link
          >
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item
          :title="`Sold recently ${removeUnderScoresFromAString(isTitle)}`"
          class="text-teal hover:bg-gray-200 border-t"
        >
          <router-link
            :to="{
              name: 'SoldPage',
              params: {
                slug: storeData.searchedData.state_code,
                city: addUnderScoresToWhiteSpacesInAString(
                  storeData.searchedData.city
                ),
              },
            }"
            >Sold Recently</router-link
          >
        </nav-bar-dropdown-item>
      </nav-bar-dropdown>
    </nav-bar-item>
    <nav-bar-item>
      <router-link
        v-if="currentSearchedData"
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
        Rent</router-link
      >
      <router-link to="/rent" v-else>Rent</router-link>
      <nav-bar-dropdown v-if="currentSearchedData">
        <div v-show="storeData.searchedData.zip_code" class="border-b">
          <nav-bar-dropdown-item
            class="cursor-text font-medium hover:no-underline"
          >
            {{ storeData.searchedData.zip_code }} zip
          </nav-bar-dropdown-item>
          <nav-bar-dropdown-item
            :title="`All rentals in ${storeData.searchedData.zip_code} zip code`"
            class="text-teal hover:bg-gray-200"
          >
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
            >
          </nav-bar-dropdown-item>
          <nav-bar-dropdown-item
            class="text-teal hover:bg-gray-200"
            :title="`Apartments for rent in ${storeData.searchedData.zip_code} zip code`"
          >
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
            >
          </nav-bar-dropdown-item>
          <nav-bar-dropdown-item
            class="text-teal hover:bg-gray-200"
            :title="`Houses for Rent in ${storeData.searchedData.zip_code} zip code`"
          >
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
                  homeType: `single_family`,
                },
              }"
              >Houses for Rent</router-link
            >
          </nav-bar-dropdown-item>
        </div>
        <nav-bar-dropdown-item
          class="cursor-text font-medium hover:no-underline"
        >
          {{ removeUnderScoresFromAString(storeData.searchedData.city) }}
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item
          :title="`All rentals ${removeUnderScoresFromAString(isTitle)}`"
          class="text-teal"
        >
          <router-link
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
          >
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item
          :title="`Apartments for Rents ${removeUnderScoresFromAString(
            isTitle
          )}`"
          class="text-teal hover:bg-gray-200"
        >
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
          >
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item
          :title="`Houses for Rent ${removeUnderScoresFromAString(isTitle)}`"
          class="text-teal hover:bg-gray-200"
        >
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
          >
        </nav-bar-dropdown-item>
        <!-- <nav-bar-dropdown-item
          :title="`See Newest Listings in the state`"
          class="border-t hover:bg-gray-200"
        >
          <router-link :to="`/new-for-rent-properties/#/`">
            See Newest Listings</router-link
          >
        </nav-bar-dropdown-item> -->
        <!-- <nav-bar-dropdown-item v-on:click="saveHomePropertyCallback" class="border-t hover:bg-gray-200">
          <router-link to="/#">Post A Rental Listings</router-link>
        </nav-bar-dropdown-item> -->
      </nav-bar-dropdown>
    </nav-bar-item>
    <!-- <nav-bar-item>
      <router-link to="/mortgages">Mortgage</router-link>
      <nav-bar-dropdown v-if="currentSearchedData">
        <nav-bar-dropdown-item
          class="hover:no-underline cursor-auto font-medium"
        >
          {{ removeUnderScoresFromAString(storeData.searchedData.city) }}
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item class="hover:bg-gray-200">
          <router-link to="/mortgages">Mortgage Overview</router-link>
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item class="hover:bg-gray-200">
          <router-link to="/mortgages/pre-qualified"
            >Get Pre-Qualified</router-link
          >
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item class="hover:bg-gray-200">
          <router-link
            :to="`/mortgage-rates/${addUnderScoresToWhiteSpacesInAString(
              storeData.searchedData.city
            )},${storeData.searchedData.state_code}/`"
            >Mortgage Rates</router-link
          >
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item class="hover:bg-gray-200">
          <router-link
            :to="`/refinance-rates/${addUnderScoresToWhiteSpacesInAString(
              storeData.searchedData.city
            )},${storeData.searchedData.state_code}/`"
            >Refinance Rates</router-link
          >
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item class="border-t hover:bg-gray-200">
          <router-link to="/#">Mortgage Calculator</router-link>
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item class="hover:bg-gray-200">
          <router-link to="/#">Affordability Calculator</router-link>
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item class="hover:bg-gray-200">
          <router-link to="/#">Refinance Calculator</router-link>
        </nav-bar-dropdown-item>
      </nav-bar-dropdown>
    </nav-bar-item> -->
    <nav-bar-button
      v-on:click="saveHomePropertyCallback"
      class="flex justify-end flex-auto pr-2"
    >
      Saved Homes
    </nav-bar-button>
    <nav-bar-button v-on:click="saveHomePropertyCallback" class="pr-2"
      >Saved Searches</nav-bar-button
    >
    <nav-bar-button
      v-on:click="saveHomePropertyCallback"
      class="border border-gray-300 rounded-md mr-2"
    >
      Sign up or Log in
    </nav-bar-button>
  </nav-bar-box>
</template>
<script>
import { useStore } from "vuex";
import { computed, inject } from "vue";
import {
  addUnderScoresToWhiteSpacesInAString,
  removeUnderScoresFromAString,
} from "@/helper";

import {
  NavBarBox,
  NavBarItem,
  NavBarButton,
  NavBarDropdown,
  NavBarDropdownItem,
} from "@/components/buttonui";

export default {
  name: "NavBar",
  components: {
    NavBarBox,
    NavBarButton,
    NavBarItem,
    NavBarDropdown,
    NavBarDropdownItem,
  },
  setup() {
    const store = useStore();
    const { saveHomePropertyCallback } = inject("provider");
    const storeData = computed(() => store.getters.getStore);

    const currentSearchedData = computed(() =>
      Object.keys(storeData.value.searchedData).length > 0 ? true : false
    );
    const isTitle = computed(() => {
      return currentSearchedData.value
        ? `in ${storeData.value.searchedData["city"]}, ${storeData.value.searchedData["state_code"]}`
        : "";
    });
    return {
      storeData,
      currentSearchedData,
      isTitle,
      addUnderScoresToWhiteSpacesInAString,
      removeUnderScoresFromAString,
      saveHomePropertyCallback,
    };
  },
};
</script>
