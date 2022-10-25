<template>
  <div
    class="w-full relative -bottom-16 bg-white overflow-x-hidden min-h-screen"
  >
    <div
      v-show="showHideNavBar"
      v-bind:class="{ 'fixed': showHideNavBar }"
      class="w-full h-28 bg-white z-20 border-b-2 shadow-sm"
    >
      <div class="w-9/12 mx-auto px-4">
        <div class="flex justify-between mt-2">
          <!-- <div> -->
          <div class="text-xl font-semibold text-gray-700">
            {{ propertyAddress }}
          </div>
          <!-- </div> -->
          <div class="text-2xl font-semibold text-gray-700">
            {{ `$${propertyPrice}` }}
          </div>
          <div
            class="
              flex
              justify-around
              space-x-4
              items-align
              text-gray-600 text-lg
              transform translate-x-20
            "
          >
            <button
              class="
                bg-white
                px-3
                py-1
                rounded-lg
                flex
                items-center
                border
                hover:bg-gray-200 hover:border-transparent
              "
            >
              <save-search class="text-teal" />
              <span class="px-1 font-semibold">Save</span>
            </button>
            <button
              class="
                bg-white
                px-3
                rounded-lg
                flex
                py-1
                items-center
                border
                hover:bg-gray-200 hover:border-transparent
              "
            >
              <share-icon class="text-teal" />
              <span class="px-1 font-semibold">Share</span>
            </button>
          </div>
          <button
            type="button"
            v-on:mouseover="showContactForm = true"
            class="
              flex
              justify-center
              items-center
              border border-red-600
              bg-red-600
              px-4
              py-2
              rounded-lg
              font-bold
              text-base text-white
              hover:bg-transparent hover:text-red-600
            ">
            <span>Request for info </span>
            <chevron-down />
          </button>
        </div>
        <div class="relative float-left text-gray-500 -mt-3">
            {{ `${propertyCity}, ${slug}  ${postalCode}` }}
        </div>
        <div
          ref="contactFormRef"
          v-show="showContactForm"
          class="
            relative
            float-right
            mt-2
            w-4/12
            h-96
            overflow-y-auto
            bg-white
            px-4
            py-1
            border
            rounded-lg
          "
        >
          <widget-contact-form>
          </widget-contact-form>
        </div>
      </div>
    </div>
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
        v-if="propertyStatusData"
        :to="`/${propertyStatusData}/${postalCode}`"
        class="text-teal inline-flex underline"
      >
        <chevron-right class="text-gray-600" /> {{ postalCode }}
      </router-link>
      <button class="text-gray-600 inline-flex cursor-text">
        <chevron-right /> {{ propertyAddress }}
      </button>
    </div>
    <widget-image-grid
      v-on:openMediaTable="isMediaTable = !isMediaTable"
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
                  <h1 class="flex flex-col">
                    <span class="text-3xl text-gray-700 font-bold">
                      {{ propertyAddress }}
                    </span>
                    <span class="text-base text-gray-600">
                      {{ propertyCity }},
                      {{ slug }}
                      {{ postalCode }}
                      <span 
                        v-if="!isLoading"
                        class="underline text-teal cursor-pointer"
                        >{{ propertyDetail[0].address.neighborhood_name }}</span
                      >
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
                    'animate-pulse bg-gray-200 w-full h-8':
                      isLoading && !propertyPrice,
                  }"
                >
                  <div v-show="propertyPrice">
                    <h3 class="text-3xl text-gray-700 font-bold inline-flex">
                      ${{ propertyPrice }}
                    </h3>
                    <div v-show="propertyMortgageMonthlyPayment">
                      <div class="text-gray-700">
                        Est. Mortgage
                        {{ propertyMortgageMonthlyPayment }}/mo*
                      </div>
                      <div class="flex underline text-teal text-base font-bold">
                        <span><dollar-icon /></span>
                        <a
                          class="px-2"
                          v-bind:href="propertyMortgageRateUrl"
                          target="__blank"
                          >Get Pre-Qualified</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="block w-full">
                <div id="localInformationModule" class="relative my-6">
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
                      <li
                        v-for="title in ['Map', 'Schools', 'Shop & Eat']"
                        :key="title"
                      >
                        <button
                          v-on:click="getMappingIdForContent"
                          :id="title"
                          v-bind:class="{
                            'text-teal shadow-lg border hover:bg-white':
                              activeMappingTable == title,
                            'hover:bg-gray-200': activeMappingTable != title,
                          }"
                          type="button"
                          class="
                            rounded-md
                            text-base
                            font-medium
                            text-gray-700
                            px-5
                            py-2
                          "
                        >
                          {{ title }}
                        </button>
                      </li>
                    </ul>
                    <div class="block w-full h-56 rounded-lg bg-gray-200 mt-4">
                      <span class="p-4">{{ renderMappingContent }}</span>
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
                    v-show="
                      descript.length > descriptionCountMaximum &&
                      !toggleDescription
                    "
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
                    v-show="descript.length > descriptionCountMaximum"
                    v-on:click="toggleDescription = !toggleDescription"
                    class="
                      px-4
                      py-2
                      text-gray-600
                      font-bold
                      text-base
                      border border-gray-400
                      rounded-lg
                      bg-white
                      active:border-gray-800
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
        <div id="#contactModule" class="w-4/12 mt-8 max-h-96 relative">
          <div
            class="
              block
              w-11/12
              border
              rounded-lg
              m-auto
              text-gray-600 text-base
              p-4
              shadow-2xl
            ">
            <div v-if="!isLoading && propertyDetail[0].lead_forms.form.show" class=" text-gray-700">
              <div>
                <h2 class="text-base font-semibold capitalize">Contact This Property</h2>
                <h3 class="flex flex-col my-2 text-sm">
                  <span class="font-semibold">{{propertyDetail[0].office.name}}</span>
                  <span>{{propertyDetail[0].office.phones[0].number}}</span>
                </h3>
              </div>
              <widget-contact-form></widget-contact-form>
            </div>
            <div id="#RequestForTourModule" v-else>
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
                  <parking-icon /><span class="px-3">Parking</span></span
                >
                <span class="font-bold">No Info</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="inline-flex">
                  <outdoor-icon /><span class="px-3">Outdoor</span></span
                >
                <span class="font-bold">No Info</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="inline-flex">
                  <temperature-icon /><span class="px-3">A/C</span></span
                >
                <span class="font-bold">No Info</span>
              </div>
            </div>
          </div>
          <div class="lm:w-1/2 px-5 text-gray-600 text-base">
            <div class="w-9/12">
              <div class="flex justify-between py-1">
                <span class="inline-flex">
                  <parking-icon /><span class="px-3">HOA</span></span
                >
                <span class="font-bold">No Info</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="inline-flex">
                  <parking-icon /><span class="px-3">Price/Sqft</span></span
                >
                <span class="font-bold">No Info</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="inline-flex">
                  <parking-icon /><span class="px-3">Listed</span></span
                >
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
      <widget-history-table
        propertyTitle="Property History"
        v-bind:propertyAddressName="propertyAddress"
        v-bind:propertyTableHeaderTitle="[
          'Date',
          'Price',
          'Event',
          'Sqft',
          'Source/Name',
        ]"
        v-bind:propertyContentData="propertyPriceHistory"
      >
      </widget-history-table>
      <widget-history-table
        propertyTitle="Tax History"
        v-bind:propertyAddressName="propertyAddress"
        v-bind:propertyTableHeaderTitle="['Year', 'Assessment Total', 'Tax']"
        v-bind:propertyContentData="propertyTaxHistory"
      >
      </widget-history-table>
    </div>
  </div>
  <teleport v-if="isMediaTable" to="body">
    <section
      class="fixed w-full h-screen transparent-black top-0 right-0 left-0 z-30"
    >
      <div
        ref="mediaTableRef"
        class="
          w-11/12
          h-5/6
          bg-white
          m-auto
          relative
          -bottom-14
          rounded-lg
          overflow-hidden
        "
      >
        <div class="fixed w-11/12 z-10 bg-white">
          <div
            class="flex justify-between items-center border-b px-4 pt-2 pb-3"
          >
            <ul
              class="
                flex
                justify-start
                space-x-2
                text-base
                font-medium
                text-gray-700
              "
            >
              <li
                v-for="(title, index) in [
                  'Media',
                  'Map',
                  'Schools',
                  'Shop & Eat',
                ]"
                :key="index"
              >
                <button
                  v-on:click="getMappingIdForContent"
                  :id="title"
                  v-bind:class="{
                    'text-teal shadow-lg border hover:bg-white':
                      activeMappingTable == title,
                    'hover:bg-gray-200': activeMappingTable != title,
                  }"
                  type="button"
                  class="
                    rounded-md
                    text-base
                    font-medium
                    text-gray-700
                    px-5
                    py-2
                  "
                >
                  {{ title }}
                </button>
              </li>
            </ul>
            <div
              class="
                flex
                justify-around
                space-x-4
                items-align
                text-gray-600 text-lg
                font-semibold
                mr-8
              "
            >
              <button
                class="
                  bg-white
                  px-2
                  py-1
                  rounded-lg
                  cursor-pointer
                  flex
                  items-center
                  border
                  hover:bg-gray-200 hover:border-transparent
                "
              >
                <save-search class="text-gray-800" />
                <span class="p-1 font-semibold">Save</span>
              </button>
              <button
                class="
                  bg-white
                  px-2
                  rounded-lg
                  cursor-pointer
                  flex
                  py-1
                  items-center
                  border
                  hover:bg-gray-200 hover:border-transparent
                "
              >
                <share-icon class="text-gray-800" />
                <span class="px-1 font-semibold">Share</span>
              </button>
            </div>
          </div>
          <close-mobile-menu
            class="absolute right-3 top-5 hover:text-teal text-gray-600"
            v-on:click="isMediaTable = false"
          />
          <div class="text-gray-700 text-base font-semibold px-4 py-1">
            <div>
              {{
                `${propertyAddress} | $${propertyPrice} | ${
                  bedProperty == 0
                    ? "Studio"
                    : bedProperty > 0
                    ? bedProperty
                    : ""
                } ${bathProperty > 0 ? bathProperty : ""}`
              }}
            </div>
          </div>
        </div>
        <div
          class="relative w-8/12 h-96 top-24 -bottom-8 overflow-y-auto ml-1"
        >
          <div class="absolute w-full">
            <div class="text-gray-700 text-lg font-semibold py-3 px-3">
              {{ `Listing Photos (${propertyPhotos.length})` }}
            </div>
            <div class="flex flex-wrap">
              <div
                v-for="(photo, index) in propertyPhotos"
                :key="index"
                class="flex-auto border-4 border-solid border-transparent"
              >
                <picture>
                  <img
                    class="w-full h-full object-center object-cover"
                    v-bind:src="photo.href"
                    :alt="photo.description"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
        <div class="            
            relative
            float-right
            w-4/12
            h-96
            overflow-y-auto
            bg-white
            py-1
            border border-l-0 border-b-0
            rounded-tl-lg transform -translate-y-96 top-24">
          <div class="w-11/12 m-auto">
            <h2 class="font-bold text-lg text-gray-700">Contact This Property</h2>
            <widget-contact-form></widget-contact-form>
          </div>
        </div>
      </div>
    </section>
  </teleport>
</template>
<script>
import { useFetchDetail } from "@/api/useFetchDetail.js";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref, watchEffect, computed, onMounted, onUnmounted } from "vue";
import { addCommaToNumberFormat, removeUnderScoresFromAString } from "@/helper";
import WidgetImageGrid from "@/components/WidgetImageGrid.vue";
import WidgetUtilitySummary from "@/components/WidgetUtilitySummary.vue";
import WidgetHistoryTable from "@/components/WidgetHistoryTable.vue";
import WidgetContactForm from "@/components/WidgetContactForm.vue";

import {
  SaveSearch,
  ShareIcon,
  ArrowBackIcon,
  ChevronRight,
  DollarIcon,
  ParkingIcon,
  OutdoorIcon,
  TemperatureIcon,
  CloseMobileMenu,
  // InformationIcon,
  ChevronDown,
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
    mediaTable: {
      type: Boolean,
    },
  },
  components: {
    WidgetContactForm,
    WidgetHistoryTable,
    WidgetImageGrid,
    WidgetUtilitySummary,
    ArrowBackIcon,
    ChevronRight,
    DollarIcon,
    ParkingIcon,
    OutdoorIcon,
    TemperatureIcon,
    CloseMobileMenu,
    SaveSearch,
    ShareIcon,
    // InformationIcon
    ChevronDown,
  },
  setup(props) {
    const route = useRoute();
    const store = useStore();
    const isMediaTable = ref(false);
    const showContactForm = ref(false);
    const showHideNavBar = ref(false);
    const mediaTableRef = ref(null);
    const contactFormRef = ref(null);

    const propertyDetail = ref({});
    const isLoading = ref(true);
    const openRecord = ref(false);
    const errorMessage = ref("");
    const propertyStatus = ref("");
    const propertyStatusData = ref("");
    const propertyMortgageMonthlyPayment = ref("");
    const propertyMortgageRateUrl = ref("");
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
    const activeMappingTable = ref("Map");
    const propertyPriceHistory = ref([]);
    const propertyTaxHistory = ref([]);

    const propertyAddress = removeUnderScoresFromAString(props.address);
    const propertyCity = removeUnderScoresFromAString(props.city);

    watchEffect(async () => {
      isLoading.value = true;
      store.commit("setFetchingIsBusy", true);
      const { propertyFullContents, error } = await useFetchDetail(
        props.propertyId
      );
      propertyDetail.value = propertyFullContents.value;
      errorMessage.value = error.value;

      isLoading.value = false;
      store.commit("setFetchingIsBusy", false);

      console.log("DETAILED INFO:", propertyDetail.value);
      console.log("DETAILED error:", errorMessage.value);
      console.log("DETAILED ROUTER:", route);

      propertyStatusData.value = propertyDetail.value[0].prop_status;

      propertyStatus.value = removeUnderScoresFromAString(
        propertyStatusData.value
      );

      propertyPhotos.value = propertyDetail.value[0].photos;
      propertyClientFlagsDisplay.value =
        propertyDetail.value[0].client_display_flags;
      lastUpdatedProperty.value = propertyDetail.value[0].last_update;
      propertyPrice.value = addCommaToNumberFormat(
        propertyDetail.value[0].price
      );
      bedProperty.value = Object.hasOwn(propertyDetail.value[0], "beds")
        ? propertyDetail.value[0].beds
        : "";

      let isCommunityARentalProperty = Object.hasOwn(
        propertyDetail.value[0],
        "community"
      );

      bedPropertyMin.value = isCommunityARentalProperty
        ? propertyDetail.value[0].community.beds_min
        : "";
      bedPropertyMax.value = isCommunityARentalProperty
        ? propertyDetail.value[0].community.beds_max
        : "";

      bathProperty.value = Object.hasOwn(propertyDetail.value[0], "baths")
        ? propertyDetail.value[0].baths
        : "";
      bathPropertyMin.value = isCommunityARentalProperty
        ? propertyDetail.value[0].community.baths_min
        : "";

      bathPropertyMax.value = isCommunityARentalProperty
        ? propertyDetail.value[0].community.baths_max
        : "";

      propertySqft.value = Object.hasOwn(
        propertyDetail.value[0],
        "building_size"
      )
        ? addCommaToNumberFormat(propertyDetail.value[0].building_size.size)
        : "";

      let isPropertyMortgaged = Object.hasOwn(
        propertyDetail.value[0],
        "mortgage"
      );

      propertyMortgageMonthlyPayment.value = isPropertyMortgaged
        ? propertyDetail.value[0].mortgage.estimate.monthly_payment
        : "";
      propertyMortgageRateUrl.value = isPropertyMortgaged
        ? propertyDetail.value[0].mortgage.rates_url
        : "";

      propertyPriceHistory.value = propertyDetail.value[0].property_history;
      propertyTaxHistory.value = propertyDetail.value[0].tax_history;
    });

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

    function getMappingIdForContent(e) {
      let mappingId = e.target.id;
      if (activeMappingTable.value == mappingId) return;
      activeMappingTable.value = mappingId;
    }
    const renderMappingContent = computed(() => {
      let mapContent =
        activeMappingTable.value == "Map"
          ? "Map Content Coming soon"
          : activeMappingTable.value == "Schools"
          ? "School Map content coming soon"
          : "Shops/Resturants Map coming soon";
      return mapContent;
    });

    function closeOnOutsideClick(event) {
      if (!mediaTableRef.value || mediaTableRef.value.contains(event.target)) {
        return;
      }
      isMediaTable.value = false;
    }
    function showHideStickyNavBar() {
      if (window.pageYOffset > 700) {
        showHideNavBar.value = true;
        return;
      }
      showHideNavBar.value = false;
    }
    function closeContactForm(event){
      if (!contactFormRef.value || contactFormRef.value.contains(event.target)) {
        return;
      }
      showContactForm.value = false;
    }
    // watchEffect(() => {
    //   if (focused.value){
    //     focusedCount.value++;
    //   }
    // });
    onMounted(() => {
      document.addEventListener("mousedown", closeOnOutsideClick);
      document.addEventListener("touchstart", closeOnOutsideClick);
      document.addEventListener("scroll", showHideStickyNavBar);
      document.addEventListener("click", closeContactForm);
    });

    onUnmounted(() => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("touchstart", closeOnOutsideClick);
      document.removeEventListener("scroll", showHideStickyNavBar);
      document.removeEventListener("click", closeContactForm);
    });

    return {
      mediaTableRef,
      isMediaTable,
      showContactForm,
      contactFormRef,
      showHideNavBar,
      descript,
      isLoading,
      openRecord,
      toggleDescription,
      propertyDetail,
      descriptionContentToShowAtDefault,
      descriptionCountMaximum,
      errorMessage,
      propertyAddress,
      propertyCity,
      propertyStatus,
      propertyStatusData,
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
      propertyMortgageMonthlyPayment,
      propertyMortgageRateUrl,
      getMappingIdForContent,
      propertyPriceHistory,
      propertyTaxHistory,
      activeMappingTable,
      renderMappingContent,
    };
  },
};
</script>
<style scoped>
.transparent-black {
  background: #000000de;
}
.image-height {
  max-height: 70vh;
  min-height: 30vh;
}
</style>
