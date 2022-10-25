<template>
  <nav-bar-box>
    <nav-bar-item>
      <router-link 
        v-if="searchedLinksActive"
        :to="{
          name: 'BuyPage', 
          params: { 
            slug: storeData.searchedData.state_code,
            city: storeData.searchedData.city,
          },
        }">
        Buy</router-link>
      <router-link to="/" v-else>Buy</router-link>
      <nav-bar-dropdown v-show="searchedLinksActive">
        <nav-bar-dropdown-item 
          :class="{'hidden': !searchedLinksActive }"
          class="hover:no-underline cursor-auto font-medium bg-opacity-0">
          {{ searchedLinksActive }}
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item 
          :title="`Home for sale ${searchedLinksActiveTitle}`" 
          class="text-teal">
          <router-link 
            v-if="searchedLinksActive" 
            :to="{
              name: 'BuyPage', 
              params: { 
                slug: storeData.searchedData.state_code,
                city: storeData.searchedData.city,
              },
            }">
            Homes for sale</router-link>
          <span v-else>Homes for sale</span>
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item 
          class="text-teal" 
          :title="`Open Houses ${searchedLinksActiveTitle}`">
          <router-link 
            v-if="searchedLinksActive" 
            :to="`/for_sale/`">Open Houses</router-link>
          <span v-else>Open Houses</span>
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item 
          :title="`New Construction Homes ${searchedLinksActiveTitle}`" 
          class="text-teal">
          <router-link v-if="searchedLinksActive" to="/for_sale/">New Homes</router-link>
          <span v-else>New Homes</span>
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item 
          :title="`Sold recently ${searchedLinksActiveTitle}`" 
          class="text-teal">
          <router-link v-if="searchedLinksActive" to="/sold/">Sold Recently</router-link>
          <span v-else>Sold Recently</span>
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item class="border-t">
          <router-link 
            v-if="searchedLinksActive" 
            :to="`/new-for-sale-properties/${storeData.searchedData.state_code}/`"
            :title="`Newest listings in ${storeData.searchedData.state_code} State`">
            See Newest Listings
          </router-link>
          <router-link 
            v-else 
            :to="{
              name: 'SiteMaps'
            }">
            See Newest Listings
          </router-link>
        </nav-bar-dropdown-item>
      </nav-bar-dropdown>
    </nav-bar-item>
    <nav-bar-item>
      <router-link to="/rent/">Rent</router-link>
      <nav-bar-dropdown v-if="$route.params.city">
        <nav-bar-dropdown-item 
          :class="{'hidden': !searchedLinksActive }"
          :title="searchedLinksActive" 
          class="hover:no-underline cursor-auto font-medium">
          {{ searchedLinksActive }}
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item 
          :title="`All rentals ${searchedLinksActiveTitle}`" 
          class="text-teal">
          <router-link to="/#">All Rentals</router-link>
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item 
          :title="`Apartment for Rents ${searchedLinksActiveTitle}`" 
          class="text-teal">
          <router-link to="/#">Apartment for Rents</router-link>
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item 
          :title="`Houses for Rent ${searchedLinksActiveTitle}`" 
          class="text-teal">
          <router-link to="/#">Houses for Rent</router-link>
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item 
          :title="`See Newest Listings ${searchedLinksActiveTitle}`" 
          class="border-t">
          <router-link to="/#">See Newest Listings</router-link>
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item class="border-t">
          <router-link to="/#">Post A Rental Listings</router-link>
        </nav-bar-dropdown-item>
      </nav-bar-dropdown>
    </nav-bar-item>
    <nav-bar-item>
      <router-link to="/mortgage">Mortgage</router-link>
      <nav-bar-dropdown>
        <nav-bar-dropdown-item 
          :title="searchedLinksActive"
          :class="{'hidden': !searchedLinksActive }" 
          class="hover:no-underline cursor-auto font-medium">
          {{ searchedLinksActive }}
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item>
          <router-link to="/#">Mortgage Overview</router-link>
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item>
          <router-link to="/#">Get Pre-Qualified</router-link>
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item>
          <router-link to="/#">Mortgage Rates</router-link>
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item>
          <router-link to="/#">Refinance Rates</router-link>
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item class="border-t">
          <router-link to="/#">Mortgage Calculator</router-link>
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item>
          <router-link to="/#">Affordability Calculator</router-link>
        </nav-bar-dropdown-item>
        <nav-bar-dropdown-item>
          <router-link to="/#">Refinance Calculator</router-link>
        </nav-bar-dropdown-item>
      </nav-bar-dropdown>
    </nav-bar-item>
    <nav-bar-button class="flex justify-end flex-auto pr-2">
      Saved Homes
    </nav-bar-button>
    <nav-bar-button class="pr-2">Searched Homes</nav-bar-button>
    <nav-bar-button class="border border-gray-300 rounded-md mr-2">
      Sign up or Log in
    </nav-bar-button>
  </nav-bar-box> 
</template>
<script>
import { 
  NavBarBox, 
  NavBarItem, 
  NavBarButton, 
  NavBarDropdown, 
  NavBarDropdownItem, 
} from "@/components/buttonui";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRoute } from "vue-router";

export default ({
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
    const route = useRoute();
    const storeData = computed(() => store.getters.getStore);

    const searchedLinksActive = computed(() => {
      return storeData.value.searchedData["city"] && 
        storeData.value.searchedData["state_code"] 
        ? storeData.value.searchedData["city"] 
        : false
    });
    const searchedLinksActiveTitle = computed(() => {
      return storeData.value.searchedData["state_code"] && 
        storeData.value.searchedData["city"] 
        ? `in ${storeData.value.searchedData["city"]}, ${storeData.value.searchedData["state_code"]}` 
        : "";
    }); 
    return {
      route,
      storeData,
      searchedLinksActive,
      searchedLinksActiveTitle,
    }
  }
})
</script>