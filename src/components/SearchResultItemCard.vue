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
          <widget-image-slider v-bind:listingPhotos="propertyImages">
          </widget-image-slider>
          <div class="block w-72">
            <widget-price-detail v-bind:selling-price="propertyPrice">
            </widget-price-detail>
            <widget-utility-summary 
              v-bind:bedroom="isRentalPropertyBed" 
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
                {{ home.data_source_name }} #{{ home.mls.id }}
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
import WidgetUtilitySummary from "@/components/WidgetUtilitySummary.vue";
import WidgetImageSlider from "@/components/WidgetImageSlider.vue";
import WidgetPriceDetail from "@/components/WidgetPriceDetail.vue";
import WidgetLocationDetail from "@/components/WidgetLocationDetail.vue";
import ExternalLink from "@/assets/icons/ExternalLink.vue";
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
    ExternalLink
  },
  setup(props) {
    const store = useStore();
    const getIsActiveRouteTab = computed(() => {
      return store.getters.getIsActiveRouteTab;
    });
    const isRentalProperty = computed(() => {
      return getIsActiveRouteTab.value === "RentPage" ? true : false;
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
        : `$${props.home.community.price_min} - $${props.home.community.price_max}/mo`
    })
    const propertyPrice = computed(() => {
      return !isRentalProperty.value 
        ? `$${props.home.price}`
        : !props.home.community
        ? `$${props.home.price}/mo`
        : propertyPriceMinMAx.value
    })
    const propertyAddressLine = computed(() => {
      return !props.home.address.line ? "" : `${props.home.address.line},`
    });
    const bedPropertyNotOnRental = computed(() => {
      return props.home.beds === 0 ? "Studio" : `${props.home.beds} bd` 
    });
    const bedPropertyMin = computed(() => {
      return props.home.community.beds_min == 0 
        ? "Studio -" 
        : `${props.home.community.beds_min} -` 
    });
    const bedPropertyMax = computed(() => 
      props.home.community.beds_max == 0 
        ? "Studio"
        : `${props.home.community.beds_max} bd` );

    const bedProperty = computed(() => {
      return props.home.community.beds_min != props.home.community.beds_max
        ? `${bedPropertyMin.value} ${props.home.community.beds_max} bd`
        : !props.home.community.beds_max
        ? ""
        : bedPropertyMax.value
    })
    const isRentalPropertyBed = computed(() => {
      return !props.home.community 
        ? bedPropertyNotOnRental.value
        : bedProperty.value 
    });
    const propertyListingBy = computed(() => {
      return !props.home.branding.listing_office.list_item.name 
        ? "" 
        : `${props.home.branding.listing_office.list_item.name},`
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
        : props.home.building_size.size
    });
    return{
      isRentalProperty,
      propertyImages,
      propertyPrice,
      isRentalPropertyName,
      isRentalPropertyBed,
      isRentalPropertyBath,
      isRentalPropertySqft,
      propertyListingBy,
      isSalesAndSoldProperty: !isRentalProperty.value
    }
  }
}
</script>