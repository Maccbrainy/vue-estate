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
        v-if="propertyDetail.length > 0"
        class="w-full lm:max-w-5xl mx-auto px-4 mt-4"
      >
        <div class="flex justify-between mt-2">
          <div class="text-xl font-semibold text-gray-700">
            {{ propertyAddress }}
          </div>
          <div class="text-2xl font-semibold text-gray-700">
            {{ `$${contextProvider.price}` }}
          </div>
          <widget-save-share class="space-x-4 transform translate-x-16">
          </widget-save-share>
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
              propertyDetail[0].lead_forms.form.show
                ? "Check Availability"
                : "Schedule A Tour"
            }}</span>
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
      v-if="propertyDetail.length > 0"
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
        }/${postalCode}`"
        class="text-teal inline-flex underline"
      >
        <chevron-right class="text-gray-600 w-4 h-4 p-1" /> {{ postalCode }}
      </router-link>
      <button class="text-gray-600 inline-flex cursor-text">
        <chevron-right class="w-4 h-4 p-1" /> {{ propertyAddress }}
      </button>
    </div>
    <widget-image-grid
      v-on:openMediaTable="isMediaTableModalOpen = !isMediaTableModalOpen"
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
                    <span class="text-3xl text-gray-700 font-semibold sf:text-xl">
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
                  v-bind:bedroom="contextProvider.bed"
                  v-bind:bedroomMin="contextProvider.bedMin"
                  v-bind:bedroomMax="contextProvider.bedMax"
                  v-bind:bathroom="contextProvider.bath"
                  v-bind:bathroomMin="contextProvider.bathMin"
                  v-bind:bathroomMax="contextProvider.bathMax"
                  v-bind:squarefoot="contextProvider.sqft"
                  class="my-3"
                >
                </widget-utility-summary>
              </div>
              <div class="max-w-xs">
                <div
                  v-bind:class="{
                    'animate-pulse bg-gray-200 w-full h-8':
                      isLoading && !contextProvider.price,
                  }"
                >
                  <div v-show="contextProvider.price">
                    <h3
                      class="
                        text-3xl text-gray-700
                        font-semibold
                        inline-flex
                        sf:text-xl
                      "
                    >
                      ${{ contextProvider.price }}
                    </h3>
                    <div v-show="contextProvider.mortgageMonthlyPayment">
                      <div class="text-gray-700">
                        Est. Mortgage
                        {{ contextProvider.mortgageMonthlyPayment }}/mo*
                      </div>
                      <div class="flex underline text-teal text-base font-bold">
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
                  v-if="propertyDetail.length > 0"
                  id="#descriptionModule"
                  class="relative my-6"
                >
                  <div class="text-gray-700 font-bold text-xl my-4">
                    Description
                  </div>
                  <p class="text-gray-700 text-base pb-4">
                    {{
                      toggleAndShowMoreDescription
                        ? propertyDetail[0].description
                        : descriptionContentToShowAtDefault
                    }}
                  </p>
                  <span
                    v-show="
                      propertyDetail[0].description.length >
                        descriptionCountMaximum && !toggleAndShowMoreDescription
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
                    v-show="
                      propertyDetail[0].description.length >
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
                    propertyDetail.length > 0 && propertyDetail[0].open_houses
                  "
                  id="#OpenHousesModule"
                  class="relative my-6"
                >
                  <div class="text-gray-700 font-bold text-xl my-4">
                    Open House
                  </div>
                  <div class="flex flex-col">
                    <ul
                      v-for="openHouse in propertyDetail[0].open_houses"
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
              v-if="!isLoading && propertyDetail[0].lead_forms.form.show"
              class="text-gray-700"
            >
              <div>
                <h2 class="text-base font-semibold capitalize">
                  {{ `Contact This Property` }}
                </h2>
                <h3
                  v-if="
                    propertyDetail.length > 0 &&
                    propertyDetail[0].lead_forms.show_provider
                  "
                  class="flex flex-col my-2 text-sm"
                >
                  <span class="font-semibold">{{
                    propertyDetail[0].office.name
                  }}</span>
                  <span>{{ propertyDetail[0].office.phones[0].number }}</span>
                </h3>
              </div>
              <widget-contact-form
                v-bind:propertyName="fullPropertyAddressIdentity"
              >
              </widget-contact-form>
            </div>
            <div id="#RequestForTourModule" class="text-center">
              <h2>Request for tour as early as</h2>
              <p class="font-bold">Today at 2:30pm</p>
              <button
                v-for="(requestType, index) in [
                  'Schedule A Tour',
                  'Request For Info',
                ]"
                :key="requestType"
                v-on:click="getScheduleORRequestModalToOpen(requestType)"
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
      <div id="#HighlightModule" class="w-full border rounded-lg max-h-96">
        <div class="text-gray-700 font-bold text-xl px-5 pt-5 pb-2">
          {{ `Home Highlights` }}
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
      <widget-property-detailed-table
        v-if="!isLoading"
        v-bind:addressOfProperty="propertyAddress"
        v-bind:propertyFeatureDetails="propertyDetail[0].features"
      >
      </widget-property-detailed-table>
      <widget-history-table
        v-if="!isLoading"
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
        v-if="!isLoading"
        propertyTitle="Tax History"
        v-bind:propertyAddressName="propertyAddress"
        v-bind:propertyTableHeaderTitle="['Year', 'Assessment Total', 'Tax']"
        v-bind:propertyContentData="contextProvider.taxHistory"
      >
      </widget-history-table>
      <div id="#contactAnAgentModule" class="relative my-6">
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
          propertyDetail.length > 0 &&
          propertyDetail[0].lead_forms.show_provider
        "
        id="#ListingProviderModule"
        class="relative my-6 top-12"
      >
        <h2 class="relative text-gray-700 font-bold text-xl my-2">
          {{ `Listing provided by` }}
        </h2>
        <p class="text-base text-gray-500">
          {{
            `${propertyDetail[0].office.name}, ${propertyDetail[0].office.phones[0].number}`
          }}
        </p>
      </div>
      <div id="#propertyDescriptionModule" class="relative my-4 top-12">
        <p
          v-if="propertyDetail.length > 0"
          class="text-xs text-gray-500 font-normal text-justify"
        >
          {{
            `${propertyAddress}, ${propertyCity}, ${slug} ${postalCode} is a ${
              contextProvider.bed == 0
                ? "Studio,"
                : `${contextProvider.bed} bedroom,`
            } ${
              contextProvider.bath > 0 ? `${contextProvider.bed} bathroom,` : ""
            } ${
              contextProvider.sqft ? `${contextProvider.sqft} sqft,` : ""
            } ${removeUnderScoresFromAString(
              propertyDetail[0].prop_type
            )} built in ${
              propertyDetail[0].year_built
            }. ${propertyAddress} is located in ${
              propertyDetail[0].address.neighborhood_name
            }, ${propertyCity}. This property is currently available ${removeUnderScoresFromAString(
              propertyDetail[0].prop_status
            )} and was listed by Realtor on ${format(
              new Date(propertyDetail[0].list_date),
              "d/M/yyy"
            )}.`
          }}
        </p>
      </div>
    </div>
  </div>
  <teleport to="body">
    <section
      v-if="isMediaTableModalOpen || isModalOpen"
      :class="{'is-modal-backgound': isModalOpen,
    'transparent-black': isMediaTableModalOpen}"
      class="fixed w-full h-screen top-0 right-0 left-0 z-30"
    >
      <div
        v-if="isMediaTableModalOpen"
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
        <div class="fixed w-11/12 z-10 bg-white rounded-lg">
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
                  'Media'
                ]"
                :key="index"
              >
                <button
                  :id="title"
                  v-bind:class="{
                    'hover:bg-gray-200': activeMappingTable != title,
                  }"
                  type="button"
                  class="
                  text-teal shadow-lg border hover:bg-white
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
            v-on:click="isMediaTableModalOpen = false"
          />
          <div class="text-gray-700 text-base font-semibold px-4 py-1">
            <div>
              {{
                `${propertyAddress} | $${contextProvider.price} | ${
                  contextProvider.bed == 0
                    ? "Studio"
                    : contextProvider.bed > 0
                    ? contextProvider.bed
                    : ""
                } ${contextProvider.bath > 0 ? contextProvider.bath : ""}`
              }}
            </div>
          </div>
        </div>
        <div
          class="relative w-full lm:w-8/12 lg:w-9/12 h-96 top-24 -bottom-8 overflow-y-auto mt-1.5"
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
        <div
          class="
            relative
            float-right
            mf:hidden
            lm:w-4/12
            lg:w-3/12
            h-96
            overflow-y-auto
            bg-white
            py-1
            border
            px-2
            rounded-tl-lg rounded-bl-lg
            shadow-2xl
            transform
            -translate-y-96
            top-24
            -mt-0.5
          "
        >
          <div class="w-11/12 m-auto pt-2">
            <div v-if="propertyDetail.length > 0">
              <h2 class="text-gray-700 text-lg font-semibold pb-2">
                {{
                  propertyDetail[0].lead_forms.form.show
                    ? "Contact This Property"
                    : "Schedule A Tour"
                }}
              </h2>
              <widget-contact-form
                v-if="propertyDetail[0].lead_forms.form.show"
                v-bind:propertyName="fullPropertyAddressIdentity"
              ></widget-contact-form>
              <widget-schedule-tour
                v-else
                v-bind:propertyName="fullPropertyAddressIdentity"
              ></widget-schedule-tour>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="isModalOpen"
        ref="isModalOpenRef"
        class="
          w-full
          min-w-min
          max-w-2xl
          lm:h-5/6
          h-screen
          bg-white
          top-14
          mx-auto
          pb-2
          relative
          rounded-lg
          overflow-hidden
        "
      >
        <div class="mt-2 w-full h-full overflow-y-auto bg-white px-6 py-2">
          <div class="text-gray-700 font-bold text-lg py-1">
            {{ isScheduleTour ? `Schedule A Tour` : "Request For Info" }}
          </div>
          <widget-schedule-tour
            v-if="isScheduleTour"
            v-bind:propertyName="fullPropertyAddressIdentity"
          >
          </widget-schedule-tour>
          <widget-request-info-form
            v-bind:propertyName="fullPropertyAddressIdentity"
            v-else
          >
          </widget-request-info-form>
        </div>
        <close-mobile-menu
          class="
            absolute
            right-5
            border
            bg-white
            rounded-full
            top-5
            hover:text-teal hover:shadow-lg
            text-gray-600
          "
          v-on:click="isModalOpen = false"
        />
      </div>
    </section>
  </teleport>
</template>
<script>
import { useFetchDetail } from "@/api/useFetchDetail.js";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { format } from "date-fns";
import {
  ref,
  watchEffect,
  computed,
  onMounted,
  onUnmounted,
  provide,
} from "vue";
import { addCommaToNumberFormat, removeUnderScoresFromAString } from "@/helper";
import {
  SaveSearch,
  ShareIcon,
  ArrowBackIcon,
  ChevronRight,
  // ChevronLeft,
  DollarIcon,
  ParkingIcon,
  OutdoorIcon,
  TemperatureIcon,
  CloseMobileMenu,
  // InformationIcon,
  ChevronDown,
  ScheduleTourIcon,
} from "@/assets/icons";
import {
  WidgetSaveShare,
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
    postalCode: {
      type: String,
    },
    mediaTable: {
      type: Boolean,
    },
  },
  components: {
    WidgetSaveShare,
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
    CloseMobileMenu,
    SaveSearch,
    ShareIcon,
    ChevronRight,
    // InformationIcon
    ChevronDown,
    ScheduleTourIcon,
    WidgetPropertyDetailedTable,
  },
  setup(props) {
    const route = useRoute();
    const store = useStore();

    const toggleTable = ref(false);

    const isMediaTableModalOpen = ref(false);
    const mediaTableRef = ref(null);

    const showContactForm = ref(false);
    const contactFormRef = ref(null);

    const showHideSecondaryNavBar = ref(false);

    const isModalOpen = ref(false);
    const isModalOpenRef = ref(null);

    const isScheduleTour = ref(false);

    const propertyDetail = ref({});
    const isLoading = ref(true);
    const errorMessage = ref("");

    const contextProvider = ref({});

    const propertyPhotos = ref([]);

    const toggleAndShowMoreDescription = ref(false);
    const descriptionCountMaximum = ref(844);
    const activeMappingTable = ref("Map");

    const isActiveFormType = ref("Schedule A Tour");

    const propertyAddress = removeUnderScoresFromAString(props.address);
    const propertyCity = removeUnderScoresFromAString(props.city);
    const fullPropertyAddressIdentity = `${propertyAddress}, ${propertyCity}, ${props.slug} ${props.postalCode} `;

    const historyRoutePath = localStorage.getItem("historyRoute");

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

      contextProvider.value.status = propertyDetail.value[0].prop_status;
      contextProvider.value.clientFlags =
        propertyDetail.value[0].client_display_flags;
      contextProvider.value.lastUpdates = propertyDetail.value[0].last_update;

      propertyPhotos.value = propertyDetail.value[0].photos;

      contextProvider.value.price = addCommaToNumberFormat(
        propertyDetail.value[0].price
      );
      // propertyPrice.value = addCommaToNumberFormat(
      //   propertyDetail.value[0].price
      // );
      contextProvider.value.bed = Object.hasOwn(propertyDetail.value[0], "beds")
        ? propertyDetail.value[0].beds
        : "";

      let isCommunityARentalProperty = Object.hasOwn(
        propertyDetail.value[0],
        "community"
      );

      contextProvider.value.bedMin = isCommunityARentalProperty
        ? propertyDetail.value[0].community.beds_min
        : "";
      contextProvider.value.bedMax = isCommunityARentalProperty
        ? propertyDetail.value[0].community.beds_max
        : "";

      contextProvider.value.bath = Object.hasOwn(
        propertyDetail.value[0],
        "baths"
      )
        ? propertyDetail.value[0].baths
        : "";
      contextProvider.value.bathMin = isCommunityARentalProperty
        ? propertyDetail.value[0].community.baths_min
        : "";

      contextProvider.value.bathMax = isCommunityARentalProperty
        ? propertyDetail.value[0].community.baths_max
        : "";

      contextProvider.value.sqft = Object.hasOwn(
        propertyDetail.value[0],
        "building_size"
      )
        ? addCommaToNumberFormat(propertyDetail.value[0].building_size.size)
        : "";

      let isPropertyMortgaged = Object.hasOwn(
        propertyDetail.value[0],
        "mortgage"
      );

      contextProvider.value.mortgageMonthlyPayment = isPropertyMortgaged
        ? propertyDetail.value[0].mortgage.estimate.monthly_payment
        : "";
      contextProvider.value.mortgageRateUrl = isPropertyMortgaged
        ? propertyDetail.value[0].mortgage.rates_url
        : "";
      contextProvider.value.priceHistory =
        propertyDetail.value[0].property_history;
      contextProvider.value.taxHistory = propertyDetail.value[0].tax_history;
    });

    provide("displayClientFlags", contextProvider.value);

    const descriptionContentToShowAtDefault = computed(() => {
      let propertyDescription = "";
      if (
        propertyDetail.value[0].description.length >
        descriptionCountMaximum.value
      ) {
        propertyDescription = propertyDetail.value[0].description
          .slice(0, descriptionCountMaximum.value)
          .concat(`...`);
      }
      if (
        propertyDetail.value[0].description.length <=
        descriptionCountMaximum.value
      ) {
        propertyDescription = propertyDetail.value[0].description;
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

    function closeOnOutsideClick(event) {
      if (!mediaTableRef.value || mediaTableRef.value.contains(event.target)) {
        return;
      }
      isMediaTableModalOpen.value = false;
    }
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

    const getScheduleORRequestModalToOpen = (requestType) => {
      isModalOpen.value = true;
      if (requestType == isActiveFormType.value) {
        isScheduleTour.value = true;
      } else {
        isScheduleTour.value = false;
      }

      const closeListener = (event) => {
        if (
          !isModalOpenRef.value ||
          isModalOpenRef.value.contains(event.target)
        ) {
          return;
        }
        document.removeEventListener("mousedown", closeListener);
        document.removeEventListener("touchstart", closeListener);

        isModalOpen.value = false;
      };
      document.addEventListener("mousedown", closeListener);
      document.addEventListener("touchstart", closeListener);
    };
    onMounted(() => {
      let searchPayload = {
        city: props.city,
        state_code: props.slug,
        activeRouteTab: props.name,
      };
      store.commit("setSearchedData", searchPayload);

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
      toggleTable,
      historyRoutePath,
      contextProvider,
      isModalOpen,
      isModalOpenRef,
      isScheduleTour,
      fullPropertyAddressIdentity,
      format,
      mediaTableRef,
      isMediaTableModalOpen,
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
      getScheduleORRequestModalToOpen,
    };
  },
};
</script>
<style scoped>
.transparent-black {
  background: #000000de;
}
.is-modal-backgound {
  background: rgba(0, 0, 0, 0.346);
}
.image-height {
  max-height: 70vh;
  min-height: 30vh;
}
</style>