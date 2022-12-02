<template>
  <div id="#homePriceHistory" class="relative my-8 flex flex-col">
    <div class="text-gray-700 font-bold text-xl my-4 capitalize">
      {{ propertyTitle }} for {{ propertyAddressName }}
    </div>
    <table
      v-if="propertyHistories"
      class="
        table-fixed
        bg-gray-100
        w-full
        h-auto
        overflow-hidden
        text-gray-600
        my-2
        rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-lg
      "
    >
      <thead
        v-bind:class="{ 'sf:hidden': propertyTableHeaderTitle.length > 3 }"
      >
        <tr class="w-full py-3 text-gray-600">
          <th
            v-for="title in propertyTableHeaderTitle"
            :key="title"
            :class="{
              'w-1/5': propertyTableHeaderTitle.length == 5,
              'w-1/4': propertyTableHeaderTitle.length == 4,
              'w-1/3': propertyTableHeaderTitle.length == 3,
              'w-1/2': propertyTableHeaderTitle.length == 2,
              'w-full': propertyTableHeaderTitle.length == 1,
            }"
            class="text-left py-2 px-4"
          >
            {{ title }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr
          v-for="propertyHistory in propertyHistories"
          :key="propertyHistory.date || propertyHistory.assessment"
          class="border w-full"
        >
          <td
            v-if="propertyTableHeaderTitle.length > 3"
            class="w-auto py-2 px-3 md:hidden"
            colspan="1"
          >
            <div class="flex flex-row">
              <div class="w-9/12 flex flex-col sm:px-4">
                <span
                  v-if="propertyHistory.date"
                  class="w-auto font-semibold text-gray-700"
                >
                  {{ format(new Date(propertyHistory.date), " d/M/yyy") }}
                </span>
                <span
                  v-if="propertyHistory.event_name"
                  class="w-auto font-semibold text-gray-700"
                >
                  {{ propertyHistory.event_name }}
                </span>
                <span class="w-auto">{{ propertyHistory.source }}</span>
              </div>
              <div class="w-3/12 flex flex-col pr-4">
                <span
                  v-if="propertyHistory.price"
                  class="w-auto font-semibold text-gray-700"
                >
                  {{
                    `Price: $${addCommaToNumberFormat(propertyHistory.price)}`
                  }}
                </span>
                <span class="w-auto xs:hidden">
                  {{
                    `Price/Sqft: $${addCommaToNumberFormat(
                      propertyHistory.sqft
                    )}`
                  }}
                </span>
              </div>
            </div>
          </td>

          <td v-if="propertyHistory.date" class="w-auto py-2 px-4 sf:hidden">
            {{ format(new Date(propertyHistory.date), " d/M/yyy") }}
          </td>
          <td v-else class="w-auto py-2 px-4">
            {{ propertyHistory.year }}
          </td>

          <td v-if="propertyHistory.price" class="w-auto py-2 px-4 sf:hidden">
            ${{ addCommaToNumberFormat(propertyHistory.price) }}
          </td>
          <td v-else-if="propertyHistory.assessment" class="w-auto py-2 px-4">
            ${{ addCommaToNumberFormat(propertyHistory.assessment.total) }}
          </td>
          <td v-else class="w-auto py-2 px-4">
            {{ `N/A` }}
          </td>

          <td
            v-if="propertyHistory.event_name"
            class="w-auto py-2 px-4 sf:hidden"
          >
            {{ propertyHistory.event_name }}
          </td>
          <td v-if="propertyHistory.tax" class="w-auto py-2 px-4">
            ${{ addCommaToNumberFormat(propertyHistory.tax) }}
          </td>

          <td class="w-auto py-2 px-4 sf:hidden">
            ${{ addCommaToNumberFormat(propertyHistory.sqft) }}
          </td>

          <td class="w-auto py-2 px-4 flex justify-between sf:hidden">
            <span>{{
              propertyHistory.datasource_name
                ? `${propertyHistory.source} | ${propertyHistory.datasource_name}`
                : propertyHistory.source
            }}</span>
            <button
              class="sf:hidden"
              v-show="propertyHistory.event_name == `Sold`"
              v-on:click="openRecord = !openRecord"
            >
              <chevron-down
                :class="{ 'transform rotate-180': openRecord }"
                class="
                  text-gray-600
                  bg-white
                  border
                  rounded-full
                  hover:shadow-md
                  active:bg-gray-300
                "
              />
            </button>
          </td>
        </tr>
        <tr
          v-show="openRecord"
          class="w-full bg-gray-100 py-3 text-gray-600 border sf:hidden"
        >
          <td class="w-auto py-2 px-3" colspan="5">
            <div class="flex flex-wrap">
              <div
                class="
                  w-1/5
                  flex-initial
                  block
                  border-solid
                  border-transparent
                  border-t-4
                  border-b-0
                  border-r-8
                  border-l-8
                "
              >
                <dt class="block font-bold text-gray-600">Recording Date</dt>
                <dd class="block font-normal">N/A</dd>
              </div>
              <div
                class="
                  w-1/5
                  flex-initial
                  block
                  border-solid
                  border-transparent
                  border-t-4
                  border-b-0
                  border-r-8
                  border-l-8
                "
              >
                <dt class="block font-bold text-gray-600">
                  County Transfer Tax
                </dt>
                <dd class="block font-normal">N/A</dd>
              </div>
              <div
                class="
                  w-1/5
                  flex-initial
                  block
                  border-solid
                  border-transparent
                  border-t-4
                  border-b-0
                  border-r-8
                  border-l-8
                "
              >
                <dt class="block font-bold text-gray-600">
                  Total Transfer Tax
                </dt>
                <dd class="block font-normal">N/A</dd>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="text-gray-400 text-lg -mt-3">
      No {{ propertyTitle }} for this property
    </div>
    <span
      v-show="propertyContentData.length > 2 && !toggleTable"
      class="bg-gradient-to-t from-white h-10 w-full -mt-12"
    >
    </span>
    <button
      v-show="propertyContentData.length > 2"
      v-on:click="toggleTable = !toggleTable"
      class="
        w-28
        mt-6
        px-4
        py-2
        text-gray-500
        font-semibold
        text-base
        border
        rounded-lg
        bg-white
        hover:border-gray-700
        active:border-gray-800
      "
    >
      {{ toggleTable ? "See Less" : "See More" }}
    </button>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { format } from "date-fns";
import { addCommaToNumberFormat } from "@/helper";
import { ChevronDown } from "@/assets/icons";
export default {
  name: "WidgetHistoryTable",
  props: {
    propertyTitle: {
      type: String,
    },
    propertyAddressName: {
      type: String,
    },
    propertyTableHeaderTitle: {
      type: Array,
    },
    propertyContentData: {
      type: Array,
    },
  },
  components: {
    ChevronDown,
  },
  setup(props) {
    const toggleTable = ref(false);
    const openRecord = ref(false);

    const propertyHistoriesToShowAtDefault = computed(() => {
      let historyData = "";
      if (props.propertyContentData.length > 2) {
        historyData = props.propertyContentData.filter((data, index) =>
          index < 2 ? data : ""
        );
      }
      if (
        props.propertyContentData.length > 0 &&
        props.propertyContentData.length <= 2
      ) {
        historyData = props.propertyContentData;
      }
      return historyData;
    });
    const propertyHistories = computed(() => {
      return toggleTable.value
        ? props.propertyContentData
        : propertyHistoriesToShowAtDefault.value;
    });
    return {
      format,
      toggleTable,
      openRecord,
      propertyHistories,
      addCommaToNumberFormat,
    };
  },
};
</script>
