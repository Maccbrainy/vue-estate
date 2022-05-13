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
      <div v-bind:id="home.name">
        <router-link 
          :to="{
            name: 'HomeDetail', 
            params: { 
              slug: home.state,
              city: homeCity,
              address: homeStreet,
            },
          }" 
          target="_blank">
          <widget-image-slider></widget-image-slider>
          <div class="block">
            <widget-price-detail v-bind:selling-price="home.id">
            </widget-price-detail>
            <widget-utility-summary 
              v-bind:bedroom="home.no_bedroom" 
              v-bind:bathroom="home.no_bathroom" 
              v-bind:squarefoot="home.no_sqft">
            </widget-utility-summary>
            <widget-location-detail 
              v-bind:street="home.street"
              v-bind:city="home.city"
              v-bind:state="home.state"
              v-bind:postal-code="home.postal_code">
            </widget-location-detail>
          </div>
        </router-link>
        <div v-if="home.name" class="my-1 pt-2 border-t">
          <div class="uppercase pb-2 text-xs text-gray-600">
            LISTING BY: {{ home.name }} | Long: {{ home.longitude }} | Lat: 
            {{ home.latitude }}
          </div>
        </div>
      </div>
    </div>
  </li>
</template>
<script>
import { computed } from "vue";
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
  setup(props) {
    const homeCity = computed(() => props.home.city.replaceAll(" ", "-"));
    const homeStreet = computed(() => props.home.street.replaceAll(" ", "-"));
    return{
      homeCity,
      homeStreet,
    }
  }
}
</script>