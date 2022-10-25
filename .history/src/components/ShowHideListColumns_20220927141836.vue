<template>
  <div class="w-full xs:p-4 md:w-10/12 lg:w-60 border-transparent md:border-8">
    <h3 class="font-medium text-base text-gray-700">
      {{ listColumnTitle }}
    </h3>
    <ul
      class="
        mt-5
        xs:flex xs:flex-wrap xs:list-disc xs:list-inside xs:justify-start
      "
    >
      <div v-for="list in listColumns" v-bind:key="list">
        <router-link :to="list.state_code || list.url">
          <li
            class="
              xs:pr-3
              font-normal
              text-xs text-gray-600
              pb-1
              cursor-pointer
              hover:underline
            "
          >
            <span class="xs:-ml-1"
              >{{ list.state || list.name }} {{ suffix }}</span
            >
          </li>
        </router-link>
      </div>
      <span
        v-if="listColumnData.length > 4"
        v-on:click="toggleShowHideData = !toggleShowHideData"
        class="flex text-teal text-sm cursor-pointer hover:underline"
      >
        <span v-show="toggleShowHideData" class="flex"
          >Less <chevron-down class="transform rotate-180"
        /></span>
        <span v-show="!toggleShowHideData" class="flex"
          >More <chevron-down
        /></span>
      </span>
    </ul>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import ChevronDown from "@/assets/icons/ChevronDown.vue";
export default {
  name: "ShowHideListColumns",
  components: {
    ChevronDown,
  },
  props: {
    listColumnTitle: String,
    suffix: String,
    listColumnData: Array,
  },
  setup(props) {
    const toggleShowHideData = ref(false);
    const listColumnsDefault = computed(() => {
      let listData;
      if (props.listColumnData.length > 4) {
        listData = props.listColumnData.slice(0, 4);
      }
      if (props.listColumnData.length <= 4) {
        listData = props.listColumnData;
      }
      return listData;
    });

    const listColumns = computed(() => {
      return toggleShowHideData.value
        ? props.listColumnData
        : listColumnsDefault.value;
    });
    return {
      toggleShowHideData,
      listColumnsDefault,
      listColumns,
    };
  },
};
</script>
