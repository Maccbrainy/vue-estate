<template>
  <li
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
    <div>
      <div v-bind:id="home.property_id">
        <router-link
          :to="{
            name: getPageDetailRouteName,
            params: {
              slug: home.address.state_code,
              city: propertyCity,
              address: propertyAddress,
              propertyId: home.property_id,
              postalCode: home.address.postal_code,
            },
          }"
          target="_blank" 
          rel="noopener referrer"
        >
          <widget-client-flags
            v-show="!storeData.isLoading && !storeData.fetchingIsBusy"
            v-bind:propertyClientDisplayFlags="home.client_display_flags"
            v-bind:presentationStatus="storeData.activeRoutePath"
            v-bind:lastUpdateTime="home.last_update"
          >
            <template v-slot:iconSlot>
              <save-search />
            </template>
          </widget-client-flags>
          <widget-image-slider v-bind:listingPhotos="propertyImages">
          </widget-image-slider>
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
              v-bind:fetchingIsBusy="storeData.fetchingIsBusy"
              v-bind:streetOrName="isRentalPropertyName"
              v-bind:city="home.address.city"
              v-bind:state="home.address.state_code"
              v-bind:postal-code="home.address.postal_code"
            >
            </widget-location-detail>
          </div>
        </router-link>
        <div v-if="isSalesAndSoldProperty" class="my-1 pt-2 border-t">
          <div class="uppercase pb-2 text-xs text-gray-600">
            <a
              v-bind:href="home.rdc_web_url"
              target="__blank"
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
          class="
            w-full
            my-2
            bg-white
            border
            p-1
            border-teal-light
            text-teal text-sm
            font-semibold
            rounded-lg
            hover:bg-teal-lighter hover:border-teal
            focus:bg-teal focus:text-white focus:border-teal
          "
        >
          Check Availability
        </button>
      </div>
    </div>
  </li>
</template>
<script>
import { useStore } from "vuex";
import { computed, provide } from "vue";
import {
  addCommaToNumberFormat,
  addUnderScoresToWhiteSpacesInAString,
} from "@/helper";
import WidgetClientFlags from "@/components/WidgetClientFlags.vue";
import WidgetUtilitySummary from "@/components/WidgetUtilitySummary.vue";
import WidgetImageSlider from "@/components/WidgetImageSlider.vue";
import WidgetPriceDetail from "@/components/WidgetPriceDetail.vue";
import WidgetLocationDetail from "@/components/WidgetLocationDetail.vue";
import ExternalLink from "@/assets/icons/ExternalLink.vue";
import { SaveSearch } from "../assets/icons";
export default {
  name: "SearchResultItemCard",
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
    // const contextProvider = ref({});
    const storeData = computed(() => store.getters.getStore);


    provide("displayClientFlags", {
      lastUpdates: props.home.last_update,
      status: storeData.value.activeRoutePath,
      clientFlags: props.home.client_display_flags,
    });

    const getPageDetailRouteName = computed(() =>
      props.routeName == "RentPage" || props.routeName == "RentsNearMe"
        ? "RentPageDetail"
        : "SalesPageDetail"
    );
    const propertyAddress = addUnderScoresToWhiteSpacesInAString(
      props.home.address.line
    );
    const propertyCity = addUnderScoresToWhiteSpacesInAString(
      props.home.address.city
    );
    const isRentalProperty = computed(() =>
      storeData.value.activeRoutePath === "RentPage" ? true : false
    );
    const propertyImages = computed(() => {
      return props.home.thumbnail
        ? props.home.thumbnail
        : !props.home.photos
        ? "defaultImage"
        : props.home.photos[0].href;
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
    const propertyAddressLine = computed(() => {
      return !props.home.address.line ? "" : `${props.home.address.line},`;
    });

    const isRentalPropertyName = computed(() => {
      return !isRentalProperty.value
        ? propertyAddressLine.value
        : !props.home.community
        ? propertyAddressLine.value
        : !props.home.community.name
        ? propertyAddressLine.value
        : `${props.home.community.name},`;
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
      return !props.home.branding
        ? ""
        : `${props.home.branding.listing_office.list_item.name},`;
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

    const propertyMLSId = computed(() => {
      return !props.home.mls ? "" : `#${props.home.mls.id}`;
    });
    return {
      storeData,
      getPageDetailRouteName,
      isRentalProperty,
      propertyAddress,
      propertyCity,
      propertyImages,
      propertyPrice,
      isRentalPropertyName,
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
    };
  },
};
</script>
