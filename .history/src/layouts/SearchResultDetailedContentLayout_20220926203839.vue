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
              <div class="w-3/12">
                <div
                  v-bind:class="{
                    'animate-pulse bg-gray-200 w-full h-8': isLoading,
                  }"
                >
                  <h3 v-show="propertyPrice && !isLoading">
                    <div class="text-3xl text-gray-700 font-bold inline-flex">
                      ${{ propertyPrice }}
                    </div>
                  </h3>
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
                    <div class="w-full h-56 rounded-lg bg-gray-200 mt-4">
                      <span class="p-4">Content Coming Soon</span>
                    </div>
                  </div>
                </div>
                <div id="#descriptionModule" class="relative my-6">
                  <div class="text-gray-700 font-bold text-xl my-4">
                    Description
                  </div>
                  <p class="text-gray-700 text-base">
                    {{ propertyDetail[0].description }}
                  </p>
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
        <div class="w-4/12 border mt-8 rounded-lg h-auto">
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useFetchDetail } from "@/api/useFetchDetail.js";
import { useRouter } from "vue-router";
import { ref, watchEffect } from "vue";
import { getValueIfPropertyExist } from "@/composables";
import { addCommaToNumberFormat, removeUnderScoresFromAString } from "@/helper";
import WidgetImageGrid from "@/components/WidgetImageGrid.vue";
import WidgetUtilitySummary from "@/components/WidgetUtilitySummary.vue";
import { ArrowBackIcon, ChevronRight } from "@/assets/icons";

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

    return {
      isLoading,
      propertyDetail,
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
