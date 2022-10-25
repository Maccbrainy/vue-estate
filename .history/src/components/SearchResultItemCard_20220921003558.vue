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
      3xl:w-3/12">
    <div>
      <div v-bind:id="home.property_id">
        <router-link 
          :to="{
            name: 'HomeDetail', 
            params: { 
              slug: home.address.state_code,
              city: home.address.city,
              address: home.address.line,
              propertyId: home.property_id,
              postalCode:home.address.postal_code,
            },
          }" 
          target="_blank">
          <div 
            v-show="!storeData.isLoading && !storeData.fetchingIsBusy" 
            class="relative">
            <div class="absolute left-0 p-2 z-10">
              <div class="flex justify-start space-x-1">
                <span 
                  v-if="isNewListing" 
                  class="
                    flex
                    items-center
                    cursor-default
                    text-xs text-blue-900 
                    bg-white 
                    rounded-md 
                    p-1 
                    uppercase 
                    font-semibold">
                  {{ has3Dtour || hasOpenHouses ? `NEW`: `NEW - ${propertyLastUpdated}` }}
                </span>
                <span 
                  v-if="has3Dtour" 
                  class="
                    flex
                    justify-center
                    items-center
                    cursor-default
                    text-xs text-blue-900 
                  bg-white 
                    rounded-md 
                    p-1 
                    uppercase 
                    font-semibold"
                  ><three-d-tour-icon/>
                  3D VIEW
                </span>
                <span 
                  v-if="hasOpenHouses" 
                  class="
                    flex
                    items-center
                    cursor-default
                    text-xs text-gray-600 
                    bg-white 
                    rounded-md 
                    p-1 
                    uppercase 
                    font-semibold">
                  {{ hasOpenHouses }}
                </span>
                <span 
                  v-if="isRentalProperty && petsFriendly" 
                  class="
                    flex
                    items-center
                    cursor-default
                    text-xs text-gray-600 
                    bg-white 
                    rounded-md 
                    p-1 
                    uppercase 
                    font-semibold">
                  PET FRIENDLY</span>
                <span 
                  v-if="isNewPlan" 
                  class="
                    flex
                    items-center
                    cursor-default
                    text-xs text-gray-600 
                    bg-white 
                    rounded-md 
                    p-1 
                    uppercase 
                    font-semibold"
                  >BUILDABLE PLAN</span>
              </div>
            </div>
            <div class="absolute right-0 p-1 z-20 cursor-pointer"><save-search/></div>
          </div>
          <widget-image-slider v-bind:listingPhotos="propertyImages">
          </widget-image-slider>
          <div class="block w-72">
            <widget-price-detail v-bind:selling-price="propertyPrice">
            </widget-price-detail>
            <widget-utility-summary 
              v-bind:bedroom="bedProperty"
              v-bind:bedroomMin="bedPropertyMin"  
              v-bind:bedroomMax="bedPropertyMax"
              v-bind:bathroom="isRentalPropertyBath" 
              v-bind:squarefoot="isRentalPropertySqft">
            </widget-utility-summary>
            <widget-location-detail 
              v-bind:streetOrName="isRentalPropertyName"
              v-bind:city="home.address.city"
              v-bind:state="home.address.state_code"
              v-bind:postal-code="home.address.postal_code">
            </widget-location-detail>
          </div>
        </router-link>
        <div v-if="isSalesAndSoldProperty" class="my-1 pt-2 border-t">
          <div class="uppercase pb-2 text-xs text-gray-600">
            <a 
              v-bind:href="home.rdc_web_url" 
              target="__blank" 
              class="flex justify-between">
              <span> 
                {{ propertyListingBy }} 
                {{ home.data_source_name }} {{ propertyMLSId }}
              </span> 
              <span><external-link/>
              </span>
            </a>
          </div>
        </div>
        <button 
          v-if="isRentalProperty" 
          class="w-full my-2 bg-white border p-1 border-teal-light text-teal text-sm font-semibold rounded-lg hover:bg-teal-lighter hover:border-teal focus:bg-teal focus:text-white focus:border-teal">
           Check Availability
        </button>
      </div>
    </div>
  </li>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { format, formatDistanceStrict } from "date-fns";
import { addCommaToNumberFormat } from "@/helper";
import WidgetUtilitySummary from "@/components/WidgetUtilitySummary.vue";
import WidgetImageSlider from "@/components/WidgetImageSlider.vue";
import WidgetPriceDetail from "@/components/WidgetPriceDetail.vue";
import WidgetLocationDetail from "@/components/WidgetLocationDetail.vue";
import ExternalLink from "@/assets/icons/ExternalLink.vue";
import ThreeDTourIcon from "@/assets/icons/3DViewIcon.vue";
import SaveSearch from "@/assets/icons/SaveSearch.vue";
export default {
  name: "SearchResultItemCard",
  props: {
    home: {
      type: Object,
    }
  },
  components: {
    WidgetUtilitySummary,
    WidgetImageSlider,
    WidgetPriceDetail,
    WidgetLocationDetail,
    ExternalLink,
    ThreeDTourIcon,
    SaveSearch
  },
  setup(props) {
    const store = useStore();
    const storeData = computed(() => store.getters.getStore);
    const isRentalProperty = computed(() => {
      return storeData.value.activeRoutePath === "RentPage" ? true : false;
    });
    const propertyImages = computed(() => {
      return props.home.thumbnail 
        ? props.home.thumbnail 
        : !props.home.photos
        ? "defaultImage"
        : props.home.photos[0].href
    });
    const propertyPriceMinMAx = computed(() => {
      return props.home.community.price_hint == "CALL" 
        ? "Contact For Price"
        : `$${addCommaToNumberFormat(props.home.community.price_min)} - $${addCommaToNumberFormat(props.home.community.price_max)}/mo`
    })

    const propertyPrice = computed(() => {
      let salesOrSoldPrices = props.home.price
        ? `$${addCommaToNumberFormat(props.home.price)}` 
        : "Contact For Price";
      return !isRentalProperty.value 
        ? salesOrSoldPrices
        : !props.home.community
        ? `$${addCommaToNumberFormat(props.home.price)}/mo`
        : propertyPriceMinMAx.value
    })
    const propertyAddressLine = computed(() => {
      return !props.home.address.line ? "" : `${props.home.address.line},`
    });
    // const bedPropertyNotOnRental = computed(() => {
    //   return props.home.beds === 0 
    //     ? "Studio" 
    //     : props.home.beds
    //     ? `${props.home.beds} bd`
    //     : ""  
    // });
    // const bedPropertyMin = computed(() => {
    //   return props.home.community.beds_min == 0 
    //     ? "Studio -" 
    //     : `${props.home.community.beds_min} -` 
    // });
    // const bedPropertyMax = computed(() => 
    //   props.home.community.beds_max == 0 
    //     ? "Studio"
    //     : `${props.home.community.beds_max} bd` );

    // const bedProperty = computed(() => {
    //   return props.home.community.beds_min != props.home.community.beds_max
    //     ? `${bedPropertyMin.value} ${props.home.community.beds_max} bd`
    //     : !props.home.community.beds_max
    //     ? ""
    //     : bedPropertyMax.value
    // })
    // const isRentalPropertyBed = computed(() => {
    //   return !props.home.community 
    //     ? bedPropertyNotOnRental.value
    //     : bedProperty.value 
    // });

    const isRentalPropertyName = computed(() => {
      return !isRentalProperty.value 
        ? propertyAddressLine.value
        : !props.home.community 
        ? propertyAddressLine.value
        : !props.home.community.name
        ? propertyAddressLine.value
        : `${props.home.community.name},`; 
    });

    const bathPropertyMin = computed(() => 
      props.home.community.baths_min == 0 
        ? "" 
        : `${props.home.community.baths_min} -`);
    const bathProperty = computed(() => {
      return props.home.community.baths_min == props.home.community.baths_max
        ? props.home.community.baths_max
        : `${bathPropertyMin.value} ${props.home.community.baths_max}`
    })
    const isRentalPropertyBath = computed(() => {
      return !props.home.community 
        ? props.home.baths  
        : bathProperty.value
    });

    const isRentalPropertySqft = computed(() => {
      return isRentalProperty.value  
        ? "Unknown" 
        : !props.home.building_size 
        ? "Unknown"
        : addCommaToNumberFormat(props.home.building_size.size)
    });
    const propertyListingBy = computed(() => {
      return !props.home.branding 
        ? "" 
        : `${props.home.branding.listing_office.list_item.name},`
    });


    const propertyLastUpdated = computed(() => {
      let todayDate = new Date();
      let lastUpdated = new Date(props.home.last_update);
      let lastUpdatedDistance = formatDistanceStrict(lastUpdated, todayDate, {addSuffix: true});
      return lastUpdatedDistance;
    });


    const bedProperty = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(
        props.home, 
        "beds") 
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



    const isNewListing = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(
        props.home.client_display_flags,
        "is_new_listing") 
        ? props.home.client_display_flags.is_new_listing 
        : false;
      return getValueIfPropertyExist; 
    });
    const hasOpenHouses = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(
        props.home.client_display_flags,
        "has_open_house") 
        ? props.home.client_display_flags.has_open_house 
        : false;
      if (getValueIfPropertyExist){
        let startDate = format( new Date(props.home.open_houses[0].start_date), "E,h"); 
        let endDate = format( new Date(props.home.open_houses[0].end_date), "ha");
        let openDateDuration = `OPEN ${startDate}-${endDate}`;
        return openDateDuration;
       }
      return false;
    });
    const has3Dtour = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(
        props.home.client_display_flags,
        "has_matterport") 
        ? props.home.client_display_flags.has_matterport 
        : false;
      return getValueIfPropertyExist;
    });
    const isNewPlan = computed(() => {
      let getValueIfPropertyExist = Object.hasOwn(
        props.home.client_display_flags,
        "is_new_plan") 
        ? props.home.client_display_flags.is_new_plan 
        : false;
      return getValueIfPropertyExist;
    });
    const petsFriendly = computed(() => {
      let getCatValueIfPropertyExist = Object.hasOwn(
        props.home.client_display_flags,
        "allows_cats") 
        ? props.home.client_display_flags.allows_cats
        : false;
      let getDogValueIfPropertyExist = Object.hasOwn(
        props.home.client_display_flags,
        "allows_dogs")
        ? props.home.client_display_flags.allows_dogs 
        : false;
      return getCatValueIfPropertyExist || getDogValueIfPropertyExist;
    });
    const propertyMLSId = computed(() => {
      return !props.home.mls ? "" : `#${props.home.mls.id}`
    });
    return{
      storeData,
      isRentalProperty,
      propertyImages,
      propertyPrice,
      isRentalPropertyName,
      bedProperty,
      bedPropertyMin,
      bedPropertyMax,
      isRentalPropertyBath,
      isRentalPropertySqft,
      propertyListingBy,
      propertyLastUpdated,
      propertyMLSId,
      isSalesAndSoldProperty: !isRentalProperty.value,
      isNewListing,
      hasOpenHouses,
      has3Dtour,
      isNewPlan,
      petsFriendly
    }
  }
}
</script>