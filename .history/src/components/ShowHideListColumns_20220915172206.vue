<template>
  <div class="w-full xs:p-4 md:w-10/12 lg:w-60 border-transparent md:border-8">
    <h3 class="font-medium text-base text-gray-700">
      {{ listColumnTitle}}
    </h3>
    <ul class="mt-2 xs:flex xs:flex-wrap xs:list-disc xs:list-inside xs:justify-center">
      <div v-for="list in listColumns" v-bind:key="list">
        <router-link :to="list.state_code || list.url">
          <li 
            class="
              xs:pr-3
              font-normal 
              text-xs text-gray-600 
              pb-1 
              cursor-pointer 
              hover:underline">
            <span class="xs:-ml-1">{{ list.state || list.name }} {{ suffix }}</span>
          </li>
        </router-link>
      </div>
      <span 
        v-if="listColumnData.length > 4"
        v-on:click="toggleShowHideData" 
        class="flex text-teal text-sm cursor-pointer hover:underline"
        v-bind:class="{'hidden': showHide}">
        More<chevron-down/>
      </span>
      <div class="xs:flex xs:flex-wrap xs:justify-center" v-if="showHide">
        <div v-for="list in fullListColumns" v-bind:key="list">
          <router-link :to="list.state_code || list.url">
            <li 
              class="
                xs:pr-3
                font-normal 
                text-xs text-gray-600 
                pb-1 
                cursor-pointer 
                hover:underline">
              <span class="xs:-ml-1">{{ list.state || list.name }} {{ suffix }}</span>
            </li>
          </router-link>
        </div>
        <span 
          v-on:click="toggleShowHideData" 
          class="flex text-teal text-sm cursor-pointer hover:underline">
          Less<chevron-down class="transform rotate-180"/>
        </span>
      </div>
    </ul>
  </div>
</template>
<script>
import { ref, watchEffect, computed } from "vue";
import ChevronDown from "@/assets/icons/ChevronDown.vue";
export default {
  name: "ShowHideListColumns",
  components: {
    ChevronDown
  },
  props: {
    listColumnTitle: String,
    suffix: String,
    listColumnData: Array 
  },
  setup(props){
    const showHide = ref(false);
    const listColumns = ref({});
    watchEffect(() => {
      if (props.listColumnData.length > 4){
        listColumns.value = props.listColumnData.slice(0, 4);
        return listColumns.value;
      };
      if (props.listColumnData.length <= 4){
        listColumns.value = props.listColumnData;
        return listColumns.value;
      };
    });
    const fullListColumns = computed(() => {
      return props.listColumnData.slice(4);
    });
    function toggleShowHideData(){
      showHide.value = !showHide.value
    };
    return {
      showHide,
      toggleShowHideData,
      listColumns,
      fullListColumns
    }
  }
}
</script>