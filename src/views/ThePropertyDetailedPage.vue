<template>
  <div
    class="w-full relative top-16 pb-20 bg-white overflow-x-hidden min-h-screen"
  >
    <div
      v-show="showHideSecondaryNavBar"
      v-bind:class="{ fixed: showHideSecondaryNavBar }"
      class="w-full h-28 bg-white z-20 border-b-2 shadow-sm mf:hidden"
    >
      <div
        v-if="Object.keys(propertyDetail).length > 0"
        class="w-full lm:max-w-5xl mx-auto px-4 mt-4"
      >
        <div class="flex justify-between mt-2">
          <div class="text-xl font-semibold text-gray-700">
            {{ propertyAddress }}
          </div>
          <div class="text-2xl font-semibold text-gray-700">
            {{ propertyPrice }}
          </div>
          <div class="flex space-x-4 -mr-8">
            <save-search></save-search>
            <share-icon></share-icon>
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
              font-medium
              text-base text-white
              hover:bg-transparent hover:text-red-600
              active:bg-red-100
            "
          >
            <span>{{
              propertyDetail.lead_forms[0].form.show
                ? "Check Availability"
                : "Schedule A Tour"
            }}</span>
            <chevron-down />
          </button>
        </div>
        <div class="relative float-left text-gray-500 -mt-3">
          {{ `${propertyCity}, ${slug}  ${zipCode}` }}
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
          <widget-contact-form
            v-if="false"
            v-bind:propertyName="fullPropertyAddressIdentity"
          >
          </widget-contact-form>
          <!-- <widget-request-info-form 
              v-bind:propertyName="fullPropertyAddressIdentity">
            </widget-request-info-form> -->
          <widget-schedule-tour
            v-bind:propertyName="fullPropertyAddressIdentity"
            v-else
          >
          </widget-schedule-tour>
        </div>
      </div>
    </div>
    <div
      class="
        sf:hidden
        md:px-4
        w-full
        lm:max-w-5xl
        mx-auto
        py-2
        flex
        items-center
        font-normal
      "
    >
      <router-link
        :to="historyRoutePath"
        class="font-semibold text-teal inline-flex hover:underline mr-8"
      >
        <arrow-back-icon /> Back to Search
      </router-link>
      <button class="text-gray-600 inline-flex cursor-text">
        {{ name == "SalesPageDetail" ? "For Sale" : "For Rent" }}
      </button>
      <router-link
        :to="`/${
          name == 'SalesPageDetail' ? 'for_sale' : 'for_rent'
        }/${slug}/${city}`"
        class="text-teal inline-flex underline"
        ><chevron-right class="text-gray-600 w-4 h-4 p-1" />
        {{ `${propertyCity}, ${slug}` }}
      </router-link>
      <router-link
        :to="`/${
          name == 'SalesPageDetail' ? 'for_sale' : 'for_rent'
        }/${slug}/${city}/${zipCode}`"
        class="text-teal inline-flex underline"
      >
        <chevron-right class="text-gray-600 w-4 h-4 p-1" /> {{ zipCode }}
      </router-link>
      <button class="text-gray-600 inline-flex cursor-text">
        <chevron-right class="w-4 h-4 p-1" /> {{ propertyAddress }}
      </button>
    </div>
    <widget-image-grid
      v-on:click="teleportModalCallback('isMediaTable', true)"
      v-bind:fetchingIsBusy="isLoading"
      v-bind:propertyImages="propertyPhotos"
    >
    </widget-image-grid>
    <div class="w-full lm:max-w-5xl mx-auto px-4">
      <div class="flex justify-between flex-wrap">
        <div
          class="
            w-full
            lm:max-w-xl
            border-solid border-t-8 border-r-4 border-l-4 border-transparent
          "
        >
          <div class="flex flex-col my-3">
            <div class="flex justify-between flex-wrap sf:flex-col">
              <div class="max-w-md sf:pb-5">
                <div>
                  <h1 class="flex flex-col">
                    <span
                      v-if="
                        name == 'RentPageDetail' &&
                        !isLoading &&
                        Object.hasOwn(propertyDetail, 'community')
                      "
                      class="flex flex-col"
                    >
                      <span
                        class="text-3xl text-gray-700 font-semibold sf:text-xl"
                      >
                        {{ propertyDetail.community.name || propertyAddress }}
                      </span>
                      <span class="text-base text-gray-600">
                        {{
                          propertyDetail.community.name ? propertyAddress : ""
                        }}
                      </span>
                    </span>
                    <span
                      v-if="
                        name == 'SalesPageDetail' ||
                        !Object.hasOwn(propertyDetail, 'community')
                      "
                      class="text-3xl text-gray-700 font-semibold sf:text-xl"
                    >
                      {{ propertyAddress }}
                    </span>
                    <span class="text-base text-gray-600">
                      {{ propertyCity }},
                      {{ slug }}
                      {{ zipCode }}
                      <span
                        v-if="!isLoading"
                        class="underline text-teal cursor-pointer"
                        >{{
                          propertyDetail.address.neighborhood_name ||
                          propertyDetail.neighborhood
                        }}</span
                      >
                    </span>
                  </h1>
                </div>
                <widget-utility-summary
                  v-bind:fetchingIsBusy="isLoading"
                  v-bind:bedroom="contextProvider.bed"
                  v-bind:bedroomMin="contextProvider.bedMin"
                  v-bind:bedroomMax="contextProvider.bedMax"
                  v-bind:bathroom="contextProvider.bath"
                  v-bind:bathroomMin="contextProvider.bathMin"
                  v-bind:bathroomMax="contextProvider.bathMax"
                  v-bind:squarefoot="contextProvider.sqft"
                  class="my-3 lm:pb-5"
                >
                </widget-utility-summary>
              </div>
              <div class="max-w-xs">
                <div
                  v-bind:class="{
                    'animate-pulse bg-gray-200 w-10/12 h-8': isLoading,
                  }"
                >
                  <div v-if="!isLoading">
                    <h3
                      class="
                        text-3xl text-gray-700
                        font-semibold
                        inline-flex
                        sf:text-xl
                      "
                    >
                      {{ propertyPrice }}
                    </h3>
                    <div>
                      <div
                        v-show="contextProvider.mortgageMonthlyPayment"
                        class="text-gray-700"
                      >
                        Est. Mortgage
                        {{ contextProvider.mortgageMonthlyPayment }}/mo*
                      </div>
                      <div
                        v-show="contextProvider.mortgageRateUrl"
                        class="flex underline text-teal text-base font-bold"
                      >
                        <span><dollar-icon /></span>
                        <a
                          class="px-2"
                          v-bind:href="contextProvider.mortgageRateUrl"
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

                <div
                  v-if="Object.keys(propertyDetail).length > 0"
                  class="relative my-6"
                >
                  <div class="text-gray-700 font-bold text-xl my-4">
                    Description
                  </div>
                  <p class="text-gray-700 text-base pb-4">
                    {{
                      toggleAndShowMoreDescription && propertyDetail.description
                        ? propertyDetail.description
                        : descriptionContentToShowAtDefault
                    }}
                  </p>
                  <span
                    v-if="
                      propertyDetail.description &&
                      propertyDetail.description.length >
                        descriptionCountMaximum &&
                      !toggleAndShowMoreDescription
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
                    v-if="
                      propertyDetail.description &&
                      propertyDetail.description.length >
                        descriptionCountMaximum
                    "
                    v-on:click="
                      toggleAndShowMoreDescription =
                        !toggleAndShowMoreDescription
                    "
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
                    {{ toggleAndShowMoreDescription ? "See Less" : "See More" }}
                  </button>
                </div>
                <div
                  v-if="
                    $route.name == 'RentPageDetail' &&
                    !isLoading &&
                    Object.hasOwn(propertyDetail, 'office') &&
                    Object.hasOwn(propertyDetail.office, 'hours')
                  "
                  class="relative my-6"
                >
                  <div class="text-gray-700 font-bold text-xl my-4">
                    Office Hours
                  </div>
                  <div class="w-full flex flex-col gap-2">
                    <div
                      v-for="hour in propertyDetail.office.hours"
                      :key="hour"
                      class="w-full flex flex-row justify-start items-center"
                    >
                      <span
                        class="
                          w-4/12
                          text-base
                          font-semibold
                          text-gray-700
                          capitalize
                        "
                        >{{ hour.day[0] }}</span
                      >
                      <div class="w-8/12 flex gap-1 text-base text-gray-500">
                        <span>{{ hour.start_time }} to</span>
                        <span>{{ hour.end_time }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="
                    Object.keys(propertyDetail).length > 0 &&
                    propertyDetail.client_display_flags.has_open_house
                  "
                  id="#OpenHousesModule"
                  class="relative my-6"
                >
                  <div class="text-gray-700 font-bold text-xl my-4">
                    Open House
                  </div>
                  <div class="flex flex-col">
                    <ul
                      v-for="openHouse in propertyDetail.open_houses"
                      :key="openHouse"
                      class="
                        flex flex-row
                        justify-between
                        text-gray-600 text-base
                      "
                    >
                      <li class="font-semibold">
                        {{
                          format(new Date(openHouse.start_date), "EEEE, MMMM d")
                        }}
                      </li>
                      <li>
                        {{ format(new Date(openHouse.start_date), "hh:mm a") }}
                        to {{ format(new Date(openHouse.end_date), "hh:mm a") }}
                      </li>
                      <li>Date Icon</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="#contactModule"
          class="max-w-xs mt-8 max-h-96 relative mf:hidden"
        >
          <div
            class="
              block
              w-full
              border
              rounded-lg
              m-auto
              text-gray-600 text-base
              p-4
              shadow-2xl
            "
          >
            <div
              v-if="!isLoading && propertyDetail.lead_forms[0].form.show"
              class="text-gray-700"
            >
              <div>
                <h2 class="text-base font-semibold capitalize">
                  {{ `Contact This Property` }}
                </h2>
                <h3
                  v-if="
                    Object.keys(propertyDetail).length > 0 &&
                    propertyDetail.lead_forms[0].show_text_leads
                  "
                  class="flex flex-col my-2 text-sm"
                >
                  <span class="font-semibold">{{
                    propertyDetail.office.name
                  }}</span>
                  <!-- <span>{{ propertyDetail.office.phones[0].number }}</span> -->
                </h3>
              </div>
              <widget-contact-form
                v-bind:propertyName="fullPropertyAddressIdentity"
              >
              </widget-contact-form>
            </div>
            <div class="text-center" v-else>
              <h2>Request for tour as early as</h2>
              <p class="font-bold">Today at 2:30pm</p>
              <button
                v-for="(requestType, index) in [
                  'Schedule A Tour',
                  'Request For Info',
                ]"
                :key="requestType"
                v-on:click="
                  teleportModalCallback(
                    requestType,
                    true,
                    fullPropertyAddressIdentity
                  )
                "
                type="button"
                class="
                  w-full
                  border
                  px-4
                  py-2
                  my-2
                  rounded-lg
                  font-bold
                  text-base
                "
                v-bind:class="{
                  'border-red-600 bg-red-600 text-white hover:bg-transparent hover:text-red-600':
                    index == 0,
                  'border-teal text-teal hover:bg-teal-lighter': index == 1,
                }"
              >
                {{ requestType }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="Object.keys(propertyDetail).length > 0"
        class="w-full border rounded-lg max-h-96"
      >
        <div class="text-gray-700 font-bold text-xl px-5 pt-5 pb-2">
          {{ `Home Highlights` }}
        </div>
        <div class="block lm:flex mt-1 pb-5">
          <div class="lm:w-1/2 px-5 text-gray-600 text-base">
            <div class="w-9/12">
              <div
                v-if="propertyDetail.garage"
                class="flex justify-between py-1"
              >
                <span class="inline-flex">
                  <parking-icon /><span class="px-3">Parking/Garage</span></span
                >
                <span class="font-semibold">{{
                  `${propertyDetail.garage}`
                }}</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="inline-flex">
                  <outdoor-icon /><span class="px-3">Year built</span></span
                >
                <span class="font-semibold">{{
                  propertyDetail.year_built
                }}</span>
              </div>
              <div
                v-if="propertyDetail.heating"
                class="flex justify-between py-1"
              >
                <span class="inline-flex">
                  <temperature-icon /><span class="px-3">A/C</span></span
                >
                <span class="font-semibold">{{
                  `${propertyDetail.heating}`
                }}</span>
              </div>
              <div
                v-if="propertyDetail.hoa_fee"
                class="flex justify-between py-1"
              >
                <span class="inline-flex">
                  <parking-icon /><span class="px-3">HOA</span></span
                >
                <span class="font-semibold">{{
                  `$${propertyDetail.hoa_fee}`
                }}</span>
              </div>
            </div>
          </div>
          <div class="lm:w-1/2 px-5 text-gray-600 text-base">
            <div class="w-9/12">
              <div class="flex justify-between py-1">
                <span class="inline-flex">
                  <parking-icon /><span class="px-3">Price/Sqft</span></span
                >
                <span class="font-semibold">No Info</span>
              </div>
              <div
                v-if="propertyDetail.pending"
                class="flex justify-between py-1"
              >
                <span class="inline-flex">
                  <parking-icon /><span class="px-3">Pending</span></span
                >
                <span class="font-semibold">{{ propertyDetail.pending }}</span>
              </div>
              <div
                v-if="Object.hasOwn(propertyDetail, 'list_date')"
                class="flex justify-between py-1"
              >
                <span class="inline-flex">
                  <parking-icon /><span class="px-3">Listed</span></span
                >
                <span class="font-semibold">{{
                  `${format(new Date(propertyDetail.list_date), "d/M/yyy")}`
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <widget-property-detailed-table
        v-if="!isLoading"
        v-bind:addressOfProperty="propertyAddress"
        v-bind:propertyFeatureDetails="propertyDetail.features"
      >
      </widget-property-detailed-table>
      <widget-history-table
        v-if="contextProvider.priceHistory"
        propertyTitle="Property History"
        v-bind:propertyAddressName="propertyAddress"
        v-bind:propertyTableHeaderTitle="[
          'Date',
          'Price',
          'Event',
          'Price/Sqft',
          'Source/Name',
        ]"
        v-bind:propertyContentData="contextProvider.priceHistory"
      >
      </widget-history-table>
      <widget-history-table
        v-if="contextProvider.taxHistory"
        propertyTitle="Tax History"
        v-bind:propertyAddressName="propertyAddress"
        v-bind:propertyTableHeaderTitle="['Year', 'Assessment Total', 'Tax']"
        v-bind:propertyContentData="contextProvider.taxHistory"
      >
      </widget-history-table>
      <div class="relative my-6">
        <div class="relative text-gray-700 font-bold text-xl my-4">
          {{ `Contact an Agent` }}
        </div>
        <div class="relative">
          <ul class="absolute inline-flex text-base font-normal text-gray-700">
            <li
              v-for="title in ['Schedule A Tour', 'Request Info']"
              :key="title"
            >
              <button
                v-on:click="getFormTypeToAgent(title)"
                :id="title"
                v-bind:class="{
                  'border border-b-0 rounded-t-lg': isActiveFormType == title,
                  'border-0': isActiveFormType != title,
                }"
                type="button"
                class="text-lg font-normal text-teal px-5 py-2 outline-none"
              >
                {{ title }}
              </button>
            </li>
          </ul>
          <div
            :class="{ 'rounded-tl-lg': !renderIsScheduleFormType }"
            class="
              block
              w-full
              h-auto
              overflow-hidden
              border
              rounded-bl-lg rounded-r-lg
              transform
              translate-y-11
              xs:border-r-0 xs:border-l-0
              sm:px-8
              py-4
            "
          >
            <div v-if="renderIsScheduleFormType" class="sf:w-11/12 m-auto">
              <div class="md:flex md:flex-initial md:gap-16 items-center">
                <schedule-tour-icon class="min-w-max h-auto mf:hidden" />
                <div>
                  <widget-schedule-tour
                    v-bind:propertyName="fullPropertyAddressIdentity"
                  >
                  </widget-schedule-tour>
                </div>
              </div>
            </div>
            <div class="sf:w-11/12 m-auto">
              <widget-request-info-form
                v-show="!renderIsScheduleFormType"
                v-bind:propertyName="fullPropertyAddressIdentity"
              ></widget-request-info-form>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="
          Object.keys(propertyDetail).length > 0 &&
          propertyDetail.lead_forms[0].show_text_leads
        "
        id="#ListingProviderModule"
        class="relative my-6 top-12"
      >
        <h2 class="relative text-gray-700 font-bold text-xl my-2">
          {{ `Listing provided by` }}
        </h2>
        <p class="text-base text-gray-500">
          {{ `${propertyDetail.office.name}` }}
        </p>
      </div>
      <div id="#propertyDescriptionModule" class="relative my-4 top-12">
        <p
          v-if="
            Object.keys(propertyDetail).length > 0 && name == 'SalesPageDetail'
          "
          class="text-xs text-gray-500 font-normal text-justify"
        >
          {{
            `${propertyAddress}, ${propertyCity}, ${slug} ${zipCode} is a ${
              contextProvider.bed == 0
                ? "Studio,"
                : !contextProvider.bed
                ? `(no info on bedroom),`
                : `${contextProvider.bed} bedroom,`
            } ${
              contextProvider.bath > 0
                ? `${contextProvider.bath} bathroom,`
                : ""
            } ${
              contextProvider.sqft ? `${contextProvider.sqft} sqft,` : ""
            } ${removeUnderScoresFromAString(
              propertyDetail.prop_type
            )} built in ${
              propertyDetail.year_built
            }. ${propertyAddress} is located in ${
              propertyDetail.address.neighborhood_name
            }, ${propertyCity}. This property is currently available ${removeUnderScoresFromAString(
              propertyDetail.prop_status
            )} and was listed by Realtor on ${format(
              new Date(propertyDetail.list_date),
              "d/M/yyy"
            )}.`
          }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import {
  ref,
  watchEffect,
  computed,
  onMounted,
  onUnmounted,
  provide,
  inject,
} from "vue";
// import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useFetchDetail } from "@/api/useFetchDetail.js";
import { format } from "date-fns";
import { addCommaToNumberFormat, removeUnderScoresFromAString } from "@/helper";
import {
  ArrowBackIcon,
  ChevronRight,
  DollarIcon,
  ParkingIcon,
  OutdoorIcon,
  TemperatureIcon,
  ChevronDown,
  ScheduleTourIcon,
  SaveSearch,
  ShareIcon,
} from "@/assets/icons";
import {
  WidgetImageGrid,
  WidgetUtilitySummary,
  WidgetHistoryTable,
  WidgetContactForm,
  WidgetScheduleTour,
  WidgetRequestInfoForm,
  WidgetPropertyDetailedTable,
} from "@/components/widgets";

export default {
  name: "ThePropertyDetailedPage",
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
    zipCode: {
      type: String,
    },
    mediaTable: {
      type: Boolean,
    },
  },
  components: {
    WidgetRequestInfoForm,
    WidgetScheduleTour,
    WidgetContactForm,
    WidgetHistoryTable,
    WidgetImageGrid,
    WidgetUtilitySummary,
    ArrowBackIcon,
    DollarIcon,
    ParkingIcon,
    OutdoorIcon,
    TemperatureIcon,
    ChevronRight,
    ChevronDown,
    ScheduleTourIcon,
    WidgetPropertyDetailedTable,
    SaveSearch,
    ShareIcon,
  },
  setup(props) {
    const store = useStore();

    const { teleportModalCallback } = inject("provider");

    const toggleTable = ref(false);

    const showContactForm = ref(false);
    const contactFormRef = ref(null);

    const showHideSecondaryNavBar = ref(false);

    const propertyDetail = ref({});
    const isLoading = ref(false);
    const errorMessage = ref("");

    const contextProvider = ref({});

    const propertyPhotos = ref([]);
    const storeData = computed(() => store.getters.getStore);

    const toggleAndShowMoreDescription = ref(false);
    const descriptionCountMaximum = ref(844);
    const activeMappingTable = ref("Map");

    const isActiveFormType = ref("Schedule A Tour");

    const propertyAddress = removeUnderScoresFromAString(props.address);
    const propertyCity = removeUnderScoresFromAString(props.city);
    const fullPropertyAddressIdentity = `${propertyAddress}, ${propertyCity}, ${props.slug} ${props.zipCode} `;

    const historyRoutePath = localStorage.getItem("historyRoute");

    watchEffect(async () => {
      isLoading.value = true;
      store.commit("setFetchingIsBusy", true);
      const { propertyFullContents, errorFetch } = await useFetchDetail(
        props.propertyId
      );
      propertyDetail.value = propertyFullContents.value;
      errorMessage.value = errorFetch.value;

      isLoading.value = false;
      store.commit("setFetchingIsBusy", false);
      store.commit("setPropertyDetail", propertyFullContents.value);

      contextProvider.value.status = propertyDetail.value.prop_status;
      contextProvider.value.clientFlags =
        propertyDetail.value.client_display_flags;
      contextProvider.value.lastUpdates = propertyDetail.value.last_update;

      propertyPhotos.value = propertyDetail.value.photos;

      let isCommunityARentalProperty = Object.hasOwn(
        propertyDetail.value,
        "community"
      );

      contextProvider.value.price = addCommaToNumberFormat(
        propertyDetail.value.price
      );
      contextProvider.value.bed = Object.hasOwn(propertyDetail.value, "beds")
        ? propertyDetail.value.beds
        : "";

      contextProvider.value.bedMin = isCommunityARentalProperty
        ? propertyDetail.value.community.beds_min
        : "";
      contextProvider.value.bedMax = isCommunityARentalProperty
        ? propertyDetail.value.community.beds_max
        : "";

      contextProvider.value.bath = Object.hasOwn(propertyDetail.value, "baths")
        ? propertyDetail.value.baths
        : "";
      contextProvider.value.bathMin = isCommunityARentalProperty
        ? propertyDetail.value.community.baths_min
        : "";

      contextProvider.value.bathMax = isCommunityARentalProperty
        ? propertyDetail.value.community.baths_max
        : "";

      contextProvider.value.sqft = Object.hasOwn(propertyDetail.value, "sqft")
        ? addCommaToNumberFormat(propertyDetail.value.sqft)
        : "";

      let isPropertyMortgaged = Object.hasOwn(propertyDetail.value, "mortgage");

      contextProvider.value.mortgageMonthlyPayment =
        isPropertyMortgaged && props.name == "SalesPageDetail"
          ? propertyDetail.value.mortgage.estimate.monthly_payment
          : "";
      contextProvider.value.mortgageRateUrl = isPropertyMortgaged
        ? propertyDetail.value.mortgage.rates_url
        : "";
      contextProvider.value.priceHistory =
        propertyDetail.value.property_history;
      contextProvider.value.taxHistory = propertyDetail.value.tax_history;
      contextProvider.value.openHouses = propertyDetail.value.open_houses;
    });

    const propertyPriceMinMAx = computed(() => {
      return propertyDetail.value.community.price_hint == "CALL"
        ? "Contact For Price"
        : `$${addCommaToNumberFormat(
            propertyDetail.value.community.price_min
          )} - $${addCommaToNumberFormat(
            propertyDetail.value.community.price_max
          )}/mo`;
    });
    const propertyPrice = computed(() => {
      let priceOnSalesPageDetail = propertyDetail.value.price
        ? `$${addCommaToNumberFormat(propertyDetail.value.price)}`
        : "Contact For Price";
      return props.name == "SalesPageDetail"
        ? priceOnSalesPageDetail
        : !propertyDetail.value.community
        ? `$${addCommaToNumberFormat(propertyDetail.value.price)}/mo`
        : propertyPriceMinMAx.value;
    });

    provide("displayClientFlags", contextProvider.value);

    const descriptionContentToShowAtDefault = computed(() => {
      if (!propertyDetail.value.description) return "No description found";
      let propertyDescription = "";
      if (
        propertyDetail.value.description.length > descriptionCountMaximum.value
      ) {
        propertyDescription = propertyDetail.value.description
          .slice(0, descriptionCountMaximum.value)
          .concat(`...`);
      }
      if (
        propertyDetail.value.description.length <= descriptionCountMaximum.value
      ) {
        propertyDescription = propertyDetail.value.description;
      }
      return propertyDescription;
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

    const getFormTypeToAgent = (title) => {
      let formTypeId = title;
      if (isActiveFormType.value == formTypeId) return;
      isActiveFormType.value = formTypeId;
    };

    const renderIsScheduleFormType = computed(() => {
      let formType = isActiveFormType.value == "Schedule A Tour" ? true : false;
      return formType;
    });

    function showHideStickyNavBar() {
      if (window.pageYOffset > 700) {
        showHideSecondaryNavBar.value = true;
        return;
      }
      showHideSecondaryNavBar.value = false;
    }
    function closeContactForm(event) {
      if (
        !contactFormRef.value ||
        contactFormRef.value.contains(event.target)
      ) {
        return;
      }
      showContactForm.value = false;
    }
    onMounted(() => {
      let searchPayload = {
        city: props.city,
        state_code: props.slug,
        activeRouteTab: props.name,
        zip_code: props.zipCode,
      };
      store.commit("setSearchedData", searchPayload);

      document.addEventListener("scroll", showHideStickyNavBar);
      document.addEventListener("click", closeContactForm);
    });

    onUnmounted(() => {
      document.removeEventListener("scroll", showHideStickyNavBar);
      document.removeEventListener("click", closeContactForm);
    });

    return {
      storeData,
      toggleTable,
      historyRoutePath,
      contextProvider,
      fullPropertyAddressIdentity,
      propertyPrice,
      format,
      showContactForm,
      contactFormRef,
      showHideSecondaryNavBar,
      isLoading,
      toggleAndShowMoreDescription,
      propertyDetail,
      descriptionContentToShowAtDefault,
      descriptionCountMaximum,
      errorMessage,
      propertyAddress,
      propertyCity,
      propertyPhotos,
      getMappingIdForContent,
      activeMappingTable,
      renderMappingContent,
      isActiveFormType,
      getFormTypeToAgent,
      renderIsScheduleFormType,
      removeUnderScoresFromAString,
      teleportModalCallback,
    };
  },
};
</script>
