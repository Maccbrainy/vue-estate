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
              postalCode: home.address.postal_code,
            },
          }" 
          target="_blank">
          <widget-image-slider></widget-image-slider>
          <div class="block">
            <widget-price-detail v-bind:selling-price="home.price">
            </widget-price-detail>
            <widget-utility-summary 
              v-bind:bedroom="home.beds" 
              v-bind:bathroom="home.baths" 
              v-bind:squarefoot="home.baths">
            </widget-utility-summary>
            <widget-location-detail 
              v-bind:street="home.address.line"
              v-bind:city="home.address.city"
              v-bind:state="home.address.state_code"
              v-bind:postal-code="home.address.postal_code">
            </widget-location-detail>
          </div>
        </router-link>
        <div 
          v-if="home.branding.listing_office.list_item.name" 
          class="my-1 pt-2 border-t">
          <div class="uppercase pb-2 text-xs text-gray-600">
            LISTING BY: {{ home.branding.listing_office.list_item.name }} | Long: {{ home.address.lon }} | Lat: 
            {{ home.address.lat }}
          </div>
        </div>
      </div>
    </div>
  </li>
</template>
<script>
// import { computed } from "vue";
import WidgetUtilitySummary from "@/components/WidgetUtilitySummary.vue";
import WidgetImageSlider from "@/components/WidgetImageSlider.vue";
import WidgetPriceDetail from "@/components/WidgetPriceDetail.vue";
import WidgetLocationDetail from "@/components/WidgetLocationDetail.vue";
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
  },
  setup() {
    // const homeCity = computed(() => props.home.city.replaceAll(" ", "-"));
    // const homeStreet = computed(() => props.home.street.replaceAll(" ", "-"));
    return{
      // homeCity: computed(() => props.home.address.city.replaceAll(" ", "-")),
      // homeStreet: computed(() => props.home.address.line.replaceAll(" ", "-")),
    }
  }
}
</script>