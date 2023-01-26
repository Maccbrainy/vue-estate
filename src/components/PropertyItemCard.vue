<template>
  <li
    :class="{
      'xs:w-full sm:w-6/12 md:w-6/12 lg:w-4/12 xl:w-3/12 2xl:w-3/12 3xl:w-2/12':
        activeMapViewVariant == 'ListViewNoMapLayout',
      'xs:w-full sm:w-6/12 md:w-6/12 lg:w-4/12 xl:w-6/12 2xl:w-4/12 3xl:w-3/12':
        activeMapViewVariant == 'MapViewLayout',
    }"
    class="
      relative
      border-solid border-transparent border-r-8 border-l-8 border-t-8
      pb-4
    "
  >
    <div>
      <div class="relative" v-bind:id="home.property_id">
        <widget-client-flags
          v-show="!storeData.isLoading && !storeData.fetchingIsBusy"
        >
          <template v-slot:iconSlot>
            <save-search />
          </template>
        </widget-client-flags>
        <widget-image-slider
          :routeName="getPageDetailRouteName"
          :stateCode="home.address.state_code"
          :cityName="addUnderScoresToWhiteSpacesInAString(home.address.city)"
          :addressLocation="
            addUnderScoresToWhiteSpacesInAString(home.address.line)
          "
          :propertyIdCode="home.property_id"
          :postalAddressCode="home.address.postal_code"
          :listingPhotos="propertyImages"
        >
        </widget-image-slider>
        <router-link
          :to="{
            name: getPageDetailRouteName,
            params: {
              slug: home.address.state_code,
              city: addUnderScoresToWhiteSpacesInAString(home.address.city),
              address: addUnderScoresToWhiteSpacesInAString(home.address.line),
              propertyId: home.property_id,
              zipCode: home.address.postal_code,
            },
          }"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="block w-72">
            <widget-price-detail v-bind:selling-price="propertyPrice">
            </widget-price-detail>
            <widget-utility-summary
              v-bind:fetchingIsBusy="storeData.fetchingIsBusy"
              v-bind:bedroom="bedProperty"
              v-bind:bedroomMin="bedPropertyMin"
              v-bind:bedroomMax="bedPropertyMax"
              v-bind:bathroom="bathProperty"
              v-bind:bathroomMin="bathPropertyMin"
              v-bind:bathroomMax="bathPropertyMax"
              v-bind:squarefoot="propertySqft"
            >
            </widget-utility-summary>
            <widget-location-detail
              v-bind:streetOrName="propertyAddress"
              v-bind:city="home.address.city"
              v-bind:state="home.address.state_code"
              v-bind:postal-code="home.address.postal_code"
            >
            </widget-location-detail>
          </div>
        </router-link>
        <div
          v-if="isSalesAndSoldProperty"
          :class="{ 'border-t': !storeData.fetchingIsBusy }"
          class="my-1 pt-2"
        >
          <div
            v-bind:class="{
              'animate-pulse bg-gray-200 w-full my-1 h-4 ':
                storeData.fetchingIsBusy,
            }"
            class="uppercase pb-2 text-xs text-gray-600"
          >
            <a
              v-if="!storeData.fetchingIsBusy"
              v-bind:href="home.rdc_web_url"
              target="__blank"
              rel="noopener noreferrer"
              class="flex justify-between"
            >
              <span>
                {{ propertyListingBy }}
                {{ home.data_source_name }} {{ propertyMLSId }}
              </span>
              <span><external-link /> </span>
            </a>
          </div>
        </div>
        <button
          v-if="isRentalProperty"
          v-on:click="
            teleportModalCallback('Contact This Property', true, {
              address: `${home.address.line}`,
              city: `${home.address.city}`,
              price: propertyPrice,
              photo: home.photos[0].href,
            })
          "
          v-bind:class="{
            'animate-pulse bg-gray-200 h-4 ': storeData.fetchingIsBusy,
            'bg-white border p-1 border-teal-light text-teal text-sm font-semibold rounded-lg hover:bg-teal-lighter hover:border-teal focus:bg-teal focus:text-white focus:border-teal':
              !storeData.fetchingIsBusy,
          }"
          class="w-full my-2"
        >
          {{ !storeData.fetchingIsBusy ? "Check Availability" : "" }}
        </button>
      </div>
    </div>
  </li>
</template>
<script>
import { useStore } from "vuex";
import { computed, provide, inject } from "vue";
import {
  addCommaToNumberFormat,
  addUnderScoresToWhiteSpacesInAString,
} from "@/helper";
import {
  WidgetClientFlags,
  WidgetUtilitySummary,
  WidgetImageSlider,
  WidgetPriceDetail,
  WidgetLocationDetail,
} from "@/components/widgets";
import ExternalLink from "@/assets/icons/ExternalLink.vue";
import { SaveSearch } from "../assets/icons";
export default {
  name: "PropertyItemCard",
  props: {
    home: {
      type: Object,
    },
    routeName: {
      type: String,
    },
  },
  components: {
    WidgetClientFlags,
    WidgetUtilitySummary,
    WidgetImageSlider,
    WidgetPriceDetail,
    WidgetLocationDetail,
    ExternalLink,
    SaveSearch,
  },
  setup(props) {
    const store = useStore();
    const storeData = computed(() => store.getters.getStore);
    const { teleportModalCallback, activeMapViewVariant } = inject("provider");

    provide("displayClientFlags", {
      lastUpdates: props.home.last_update,
      status: storeData.value.activeRoutePath,
      clientFlags: props.home.client_display_flags,
      hasOpenHouses: props.home.open_houses,
    });

    const getPageDetailRouteName = computed(() =>
      props.routeName == "RentPage" || props.routeName == "RentsNearMe"
        ? "RentPageDetail"
        : "SalesPageDetail"
    );

    const isRentalProperty = computed(() =>
      storeData.value.activeRoutePath === "RentPage" ? true : false
    );
    const propertyImages = computed(() => {
      return props.home.thumbnail
        ? props.home.thumbnail
        : props.home.photos
        ? props.home.photos
        : [];
    });
    const propertyPriceMinMAx = computed(() => {
      return props.home.community.price_hint == "CALL"
        ? "Contact For Price"
        : `$${addCommaToNumberFormat(
            props.home.community.price_min
          )} - $${addCommaToNumberFormat(props.home.community.price_max)}/mo`;
    });

    const propertyPrice = computed(() => {
      let salesOrSoldPrices = props.home.price
        ? `$${addCommaToNumberFormat(props.home.price)}`
        : "Contact For Price";
      return !isRentalProperty.value
        ? salesOrSoldPrices
        : !props.home.community
        ? `$${addCommaToNumberFormat(props.home.price)}/mo`
        : propertyPriceMinMAx.value;
    });

    const bathPropertyMin = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(props.home, "community")
        ? props.home.community.baths_min
        : "";
      return getValueIfPropertyExist;
    });
    const bathPropertyMax = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(props.home, "community")
        ? props.home.community.baths_max
        : "";
      return getValueIfPropertyExist;
    });
    const bathProperty = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(props.home, "baths")
        ? props.home.baths
        : "";
      return getValueIfPropertyExist;
    });
    const propertySqft = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(props.home, "building_size")
        ? addCommaToNumberFormat(props.home.building_size.size)
        : "";
      return getValueIfPropertyExist;
    });

    const propertyListingBy = computed(() => {
      let hasPropertyBranding = Object.hasOwn(props.home, "branding");
      let hasPropertylistingOffice = hasPropertyBranding
        ? Object.hasOwn(props.home.branding, "listing_office")
        : false;
      // let hasPropertylistingOfficeList_item = Object.hasOwn(props.home.branding.listing_office, "list_item");

      let branding = hasPropertylistingOffice
        ? `${props.home.branding.listing_office.list_item.name},`
        : "";
      return branding;
    });

    const bedProperty = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(props.home, "beds")
        ? props.home.beds
        : "";
      return getValueIfPropertyExist;
    });
    const bedPropertyMin = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(props.home, "community")
        ? props.home.community.beds_min
        : "";
      return getValueIfPropertyExist;
    });
    const bedPropertyMax = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(props.home, "community")
        ? props.home.community.beds_max
        : "";
      return getValueIfPropertyExist;
    });
    const propertyAddress = computed(() =>
      !isRentalProperty.value
        ? props.home.address.line
        : Object.hasOwn(props.home, "community")
        ? props.home.community.name
        : props.home.address.line
    );
    const propertyMLSId = computed(() => {
      return !props.home.mls ? "" : `#${props.home.mls.id}`;
    });
    return {
      teleportModalCallback,
      activeMapViewVariant,
      storeData,
      getPageDetailRouteName,
      isRentalProperty,
      propertyAddress,
      propertyImages,
      propertyPrice,
      bedProperty,
      bedPropertyMin,
      bedPropertyMax,
      bathProperty,
      bathPropertyMin,
      bathPropertyMax,
      propertySqft,
      propertyListingBy,
      propertyMLSId,
      isSalesAndSoldProperty: !isRentalProperty.value,
      addUnderScoresToWhiteSpacesInAString,
    };
  },
};
</script>
