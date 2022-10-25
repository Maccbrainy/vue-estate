<template>
  <div
    class="w-full relative -bottom-16 bg-white overflow-x-hidden min-h-screen"
  >
    <div class="mf:hidden lm:w-9/12 mx-auto py-2 flex items-center font-normal">
      <button
        @click="$router.go(-1)"
        class="font-semibold text-teal inline-flex hover:underline mr-8"
      >
        <arrow-back-icon /> Back to Search
      </button>
      <button class="text-gray-600 inline-flex capitalize cursor-text">
        {{ propertyStatus }}
      </button>
      <router-link
        :to="`/${slug}/${city}`"
        class="text-teal inline-flex underline"
        ><chevron-right class="text-gray-600" />
        {{ `${propertyCity}, ${slug}` }}
      </router-link>
      <router-link
        :to="`/${propertyDetail[0].prop_status}/${postalCode}`"
        class="text-teal inline-flex underline"
      >
        <chevron-right class="text-gray-600" /> {{ postalCode }}
      </router-link>
      <button class="text-gray-600 inline-flex cursor-text">
        <chevron-right /> {{ propertyAddress }}
      </button>
    </div>
    <widget-image-grid
      v-bind:fetchingIsBusy="isLoading"
      v-bind:propertyImages="propertyPhotos"
      v-bind:clientDisplayFlags="propertyClientFlagsDisplay"
      v-bind:propertyStatus="propertyStatus"
      v-bind:propertyLastUpdate="lastUpdatedProperty"
    >
    </widget-image-grid>
    <div class="w-9/12 mx-auto px-4">
      <div class="flex flex-wrap">
        <div
          class="
            w-8/12
            border-solid border-t-8 border-r-4 border-l-4 border-transparent
          "
        >
          <div class="flex flex-col my-3">
            <div class="flex flex-wrap">
              <div class="w-8/12">
                <div>
                  <h1>
                    <span class="text-3xl text-gray-700 font-bold">
                      {{ propertyAddress }}
                    </span>
                    <br />
                    <span class="text-base text-gray-600">
                      {{ propertyCity }},
                      {{ slug }}
                      {{ postalCode }}
                    </span>
                  </h1>
                </div>
                <widget-utility-summary
                  v-bind:fetchingIsBusy="isLoading"
                  v-bind:bedroom="bedProperty"
                  v-bind:bedroomMin="bedPropertyMin"
                  v-bind:bedroomMax="bedPropertyMax"
                  v-bind:bathroom="bathProperty"
                  v-bind:bathroomMin="bathPropertyMin"
                  v-bind:bathroomMax="bathPropertyMax"
                  v-bind:squarefoot="propertySqft"
                  class="my-3"
                >
                </widget-utility-summary>
              </div>
              <div class="w-4/12">
                <div
                  v-bind:class="{
                    'animate-pulse bg-gray-200 w-full h-8': isLoading,
                  }"
                >
                  <div v-show="propertyPrice && !isLoading">
                    <h3 class="text-3xl text-gray-700 font-bold inline-flex">
                      ${{ propertyPrice }}
                    </h3>
                    <div>
                      <div class="text-gray-700">
                        Est. Mortgage
                        {{
                          propertyDetail[0].mortgage.estimate.monthly_payment
                        }}/mo*
                      </div>
                      <div class="flex underline text-teal text-base font-bold">
                        <span><dollar-icon /></span>
                        <a
                          class="px-2"
                          v-bind:href="propertyDetail[0].mortgage.rates_url"
                          target="__blank"
                          >Get Pre-Qualified</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="block w-full">
                <div id="#localInformationModule" class="relative my-6">
                  <div class="text-gray-700 font-bold text-xl">
                    Local Information
                  </div>
                  <div>
                    <ul
                      class="
                        flex
                        justify-start
                        space-x-2
                        mt-4
                        text-base
                        font-medium
                        text-gray-700
                      "
                    >
                      <li>
                        <button
                          type="button"
                          class="
                            rounded-md
                            text-base
                            font-medium
                            px-5
                            py-2
                            border
                            shadow-lg
                            text-teal
                          "
                        >
                          Map
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          class="
                            rounded-md
                            text-base
                            font-medium
                            text-gray-700
                            hover:bg-gray-200
                            px-5
                            py-2
                          "
                        >
                          Schools
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          class="
                            rounded-md
                            text-base
                            font-medium
                            text-gray-700
                            hover:bg-gray-200
                            px-5
                            py-2
                          "
                        >
                          Shop & Eat
                        </button>
                      </li>
                    </ul>
                    <div class="block w-full h-56 rounded-lg bg-gray-200 mt-4">
                      <span class="p-4">Content Coming Soon</span>
                    </div>
                  </div>
                </div>

                <div id="#descriptionModule" class="relative my-6">
                  <div class="text-gray-700 font-bold text-xl my-4">
                    Description
                  </div>
                  <p class="text-gray-700 text-base pb-4">
                    {{
                      toggleDescription
                        ? descript
                        : descriptionContentToShowAtDefault
                    }}
                  </p>
                  <span
                    v-show="!toggleDescription"
                    class="
                      absolute
                      bg-gradient-to-t
                      from-white
                      h-6
                      w-full
                      -mt-10
                    "
                  >
                  </span>
                  <button
                    v-if="descript.length > descriptionCountMaximum"
                    v-on:click="toggleDescription = !toggleDescription"
                    class="
                      px-4
                      py-2
                      text-gray-600
                      font-bold
                      text-base
                      border border-gray-800
                      rounded-lg
                      bg-white
                    "
                  >
                    {{ toggleDescription ? "See Less" : "See More" }}
                  </button>
                </div>
                <div id="#OpenHousesModule" class="relative my-6">
                  <div class="text-gray-700 font-bold text-xl my-4">
                    Open House
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="#contactModule" class="w-4/12 mt-8 max-h-96">
          <div
            class="
              block
              w-11/12
              border
              rounded-lg
              m-auto
              text-center text-gray-600 text-base
              p-4
            "
          >
            <h2>Request for tour as early as</h2>
            <p class="font-bold">Today at 2:30pm</p>
            <button
              type="button"
              class="
                w-full
                border border-red-500
                bg-red-500
                px-4
                py-2
                my-2
                rounded-lg
                font-bold
                text-base text-white
                hover:bg-transparent hover:text-red-500
              "
            >
              Shedule a tour
            </button>
            <button
              type="button"
              class="
                w-full
                border border-teal
                font-bold
                px-4
                py-2
                my-2
                rounded-lg
                text-base text-teal
                hover:bg-teal-lighter
              "
            >
              Request for info
            </button>
          </div>
        </div>
      </div>
      <div id="#HighlightModule" class="w-full border rounded-lg max-h-96">
        <div class="text-gray-700 font-bold text-xl px-5 pt-5 pb-2">
          Home Highlights
        </div>
        <div class="block lm:flex mt-1 pb-5">
          <div class="lm:w-1/2 px-5 text-gray-600 text-base">
            <div class="w-9/12">
              <div class="flex justify-between py-1">
                <span class="inline-flex">
                  <parking-icon /><span class="px-3">Parking</span></span>
                <span class="font-bold">No Info</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="inline-flex">
                  <outdoor-icon /><span class="px-3">Outdoor</span></span>
                <span class="font-bold">No Info</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="inline-flex">
                  <temperature-icon /><span class="px-3">A/C</span></span>
                <span class="font-bold">No Info</span>
              </div>
            </div>
          </div>
          <div class="lm:w-1/2 px-5 text-gray-600 text-base">
            <div class="w-9/12">
              <div class="flex justify-between py-1">
                <span class="inline-flex">
                  <parking-icon /><span class="px-3">HOA</span></span>
                <span class="font-bold">No Info</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="inline-flex">
                  <parking-icon /><span class="px-3">Price/Sqft</span></span>
                <span class="font-bold">No Info</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="inline-flex">
                  <parking-icon /><span class="px-3">Listed</span></span>
                <span class="font-bold">No Info</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="#homeDetailModule" class="relative my-6">
        <div class="text-gray-700 font-bold text-xl my-4">
          Home Detail for {{ propertyAddress }}
        </div>
      </div>
      <div id="#homePriceHistory" class="relative my-6">
        <div class="text-gray-700 font-bold text-xl my-4">
          Price History for {{ propertyAddress }}
        </div>
        <div class="w-full max-h-96 border rounded-lg">
          <div class="grid grid-col-4 grid-rows-4">
            <div class="col-span-1">Date</div>
            <div class="col-span-1">Price</div>
            <div class="col-span-1">Event</div>
            <div class="col-span-1">Source</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useFetchDetail } from "@/api/useFetchDetail.js";
import { useRouter } from "vue-router";
import { ref, watchEffect, computed } from "vue";
import { getValueIfPropertyExist } from "@/composables";
import { addCommaToNumberFormat, removeUnderScoresFromAString } from "@/helper";
import WidgetImageGrid from "@/components/WidgetImageGrid.vue";
import WidgetUtilitySummary from "@/components/WidgetUtilitySummary.vue";
import {
  ArrowBackIcon,
  ChevronRight,
  DollarIcon,
  ParkingIcon,
  OutdoorIcon,
  TemperatureIcon
} from "@/assets/icons";

export default {
  name: "SearchResultDetailedContentLayout",
  props: {
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    propertyId: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
    },
  },
  components: {
    WidgetImageGrid,
    WidgetUtilitySummary,
    ArrowBackIcon,
    ChevronRight,
    DollarIcon,
    ParkingIcon,
    OutdoorIcon,
    TemperatureIcon
  },
  setup(props) {
    const router = useRouter();
    const propertyDetail = ref({});
    const isLoading = ref(true);
    const errorMessage = ref("");
    const propertyStatus = ref("");
    const propertyPhotos = ref([]);
    const propertyClientFlagsDisplay = ref({});
    const lastUpdatedProperty = ref("");
    const propertyPrice = ref("");
    const bedProperty = ref("");
    const bedPropertyMin = ref("");
    const bedPropertyMax = ref("");
    const bathProperty = ref("");
    const bathPropertyMin = ref("");
    const bathPropertyMax = ref("");
    const propertySqft = ref("");
    const toggleDescription = ref(false);
    const descript = ref(
      `This spacious approximately 1500 SF, two-bedroom, two and a half bathroom residence features 10' ceilings and 7" wide-plank white oak floors throughout. The gracious open concept living, dining and kitchen space is enhanced by custom automated window shades and due to south and west exposures benefits from gorgeous sunsets and open views. The kitchen offers warm grey walnut cabinetry with a polished Calacatta marble countertop, backsplash, and kitchen island. Gaggenau appliances include a stainless steel 36" five-burner gas cooktop, 30" electric oven, 30" speed oven, refrigerator, freezer and this spacious approximately 1500 SF, two-bedroom, two and a half bathroom residence features 10' ceilings and 7" wide-plank white oak floors throughout. The gracious open concept living, dining and kitchen space is enhanced by custom automated window shades and due to south and west exposures benefits from gorgeous sunsets and open views. The kitchen offers warm grey walnut cabinetry with a polished Calacatta marble countertop, backsplash, and kitchen island. Gaggenau appliances include a stainless steel 36" five-burner gas cooktop, 30" electric oven, 30" speed oven, refrigerator, freezer`
    );
    const descriptionCountMaximum = ref(844);

    watchEffect(async () => {
      isLoading.value = true;
      const { propertyFullContents, error } = await useFetchDetail(
        props.propertyId
      );
      propertyDetail.value = propertyFullContents.value;
      errorMessage.value = error.value;

      isLoading.value = false;

      console.log("DETAILED INFO:", propertyDetail.value);
      console.log("DETAILED error:", errorMessage.value);
      console.log("DETAILED ROUTER:", router);

      propertyStatus.value = removeUnderScoresFromAString(
        propertyDetail.value[0].prop_status
      );
      propertyPhotos.value = propertyDetail.value[0].photos;
      propertyClientFlagsDisplay.value =
        propertyDetail.value[0].client_display_flags;
      lastUpdatedProperty.value = propertyDetail.value[0].last_update;
      propertyPrice.value = addCommaToNumberFormat(
        propertyDetail.value[0].price
      );
      bedProperty.value = getValueIfPropertyExist(
        propertyDetail.value[0],
        "beds"
      );
      bedPropertyMin.value = getValueIfPropertyExist(
        propertyDetail.value[0],
        "community",
        "beds_min"
      );
      bedPropertyMax.value = getValueIfPropertyExist(
        propertyDetail.value[0],
        "community",
        "beds_max"
      );
      bathProperty.value = getValueIfPropertyExist(
        propertyDetail.value[0],
        "baths"
      );
      bathPropertyMin.value = getValueIfPropertyExist(
        propertyDetail.value[0],
        "community",
        "baths_min"
      );
      bathPropertyMax.value = getValueIfPropertyExist(
        propertyDetail.value[0],
        "community",
        "baths_max"
      );
      let propertySquareFeet = getValueIfPropertyExist(
        propertyDetail.value[0],
        "building_size",
        "size"
      );
      propertySqft.value = propertySquareFeet
        ? addCommaToNumberFormat(propertySquareFeet)
        : "";
    });

    const propertyAddress = removeUnderScoresFromAString(props.address);
    const propertyCity = removeUnderScoresFromAString(props.city);

    const descriptionContentToShowAtDefault = computed(() => {
      let description;
      if (descript.value.length > descriptionCountMaximum.value) {
        description = descript.value
          .slice(0, descriptionCountMaximum.value)
          .concat(`...`);
      }
      if (descript.value.length <= descriptionCountMaximum.value) {
        description = descript.value;
      }
      return description;
    });

    return {
      descript,
      isLoading,
      toggleDescription,
      propertyDetail,
      descriptionContentToShowAtDefault,
      descriptionCountMaximum,
      errorMessage,
      propertyAddress,
      propertyCity,
      propertyStatus,
      propertyPhotos,
      propertyClientFlagsDisplay,
      lastUpdatedProperty,
      propertyPrice,
      bedProperty,
      bedPropertyMin,
      bedPropertyMax,
      bathProperty,
      bathPropertyMin,
      bathPropertyMax,
      propertySqft,
    };
  },
};
</script>
