<template>
  <div id="#homePriceHistory" class="relative my-8 flex flex-col">
    <div class="text-gray-700 font-bold text-xl my-4 capitalize">
      {{ propertyTitle }} for {{ propertyAddressName }}
    </div>
    <table
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
      <thead>
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
          <td class="w-auto py-2 px-4">
            {{ propertyHistory.date || propertyHistory.year }}
          </td>

          <td v-if="propertyHistory.price" class="w-auto py-2 px-4">
            ${{ propertyHistory.price }}
          </td>
          <td
            v-else-if="propertyHistory.assessment"
            class="w-auto py-2 px-4"
          >
            {{ propertyHistory.assessment.total || "" }}
          </td>
          <td v-else class="w-auto py-2 px-4">
            {{ `N/A` }}
          </td>
          <td class="w-auto py-2 px-4">
            {{ propertyHistory.event_name || propertyHistory.tax }}
          </td>
          <td class="w-auto py-2 px-4">
            {{ propertyHistory.sqft }}
          </td>
          <td class="w-auto py-2 px-4 flex justify-between">
            <span>{{ propertyHistory.source }}</span>
            <button
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
          class="w-full bg-gray-100 py-3 text-gray-600 border"
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
    <span
      v-show="propertyContentData.length > 4 && !toggleTable"
      class="bg-gradient-to-t from-white h-10 w-full -mt-12"
    >
    </span>
    <button
      v-show="propertyContentData.length > 4"
      v-on:click="toggleTable = !toggleTable"
      class="
        w-28
        mt-6
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
      {{ toggleTable ? "See Less" : "See More" }}
    </button>
  </div>
</template>
<script>
import { ref, computed } from "vue";
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
      let historyData;
      if (props.propertyContentData.length > 4) {
        historyData = props.propertyContentData.filter((data, index) =>
          index < 4 ? data : ""
        );
      }
      if (props.propertyContentData.length <= 4) {
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
      toggleTable,
      openRecord,
      propertyHistories,
    };
  },
};
</script>
