<template>
  <form 
    role="search"
    aria-autocomplete="list" 
    aria-labelledby="search-label"
    autocomplete="off" 
    v-on:submit.prevent="onSubmit">
    <input  
      v-model="searchData"
      v-bind:class="{
        'rounded-b-lg focus:shadow-md ': !searchFilterIsActive,
      }"
      class="
        w-full 
        text-gray-700 
        placeholder-gray-500
        rounded-t-lg
        focus:outline-none 
        overflow-truncate
        focus:ring-teal-light
        focus:ring
        focus:ring-offset-1 
        focus:ring-offset-white
        pl-4
        py-1 
        pr-20"
      v-bind="$attrs" 
      type="search" 
      aria-label="Search for State, City, Postal Code"
      aria-controls="places-search-list" 
      placeholder="Search for State, District/City, Zip, Neigbourhood/Area"
    />
    <button
      v-bind:class="{
        'rounded-br-lg': !searchFilterIsActive}"
      class="
        bg-red-600 
        hover:bg-red-800 
        absolute 
        right-0 
        top-0
        w-14
        rounded-tr-lg
        cursor-pointer"
      v-bind="$attrs" 
      role="button">
      <search-icon />
    </button>
  </form>
  <div 
    v-show="searchActive"
    v-bind:class="{
      'relative border-t-0 border text-gray-600 w-full max-h-40 overflow-auto bg-white z-20 rounded-b-lg': 
        searchFilterIsActive }">
    <ul 
      role="listbox" 
      aria-labelledby="search-label" 
      id="places-search-list" 
      v-on:keydown="nextItem">
      <span 
        v-bind:class="{
          'bg-gray-100 block pl-4 py-3 text-xs font-medium': 
            searchFilterIsActive 
        }" disabled> 
        {{ placeListTag }}
      </span>
      <li 
        v-for="(home, index) in searchPreferences" 
        :key="index"
        :data-suggestion-item="index"
        :title="`${home.city}, ${home.state_code}`"
        :id="`${home.city}`"
        :nonce="`${home.state_code}`"
        role="option"
        v-on:click="submitClicked" 
        aria-selected="false"
        class="
          text-gray-600 
          border-b 
          font-normal 
          text-sm 
          hover:bg-gray-100 
          py-1 
          px-3" 
        v-bind:class="{
          'bg-gray-100 focus:bg-gray-200': currentDataIndex == index}">
        <div class="flex space-x-2">
          <span>
            <location-icon class="mt-1 text-gray-600 text-xs"/>
          </span>
          <span 
            :id="`${home.city}`" 
            :nonce="`${home.state_code}`" 
            class="w-full">
            {{ home.city }}, {{ home.state_code}}
            <legend class="text-xs font-normal">City</legend>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { 
  ref, 
  reactive, 
  onMounted, 
  watch, 
  computed, 
  onBeforeUnmount, 
  watchEffect
} from "vue";
import { useStore } from "vuex";
import jsonProperties from "@/api/autoComplete.json";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import LocationIcon from "@/assets/icons/LocationIcon.vue";

export default {
  name: "SearchInput",
  inheritAttrs: false,
  components: {
    SearchIcon,
    LocationIcon,
  },
  setup() {
    const searchData = ref("");
    const activeRouteTab = ref("");
    const searchPayload = ref({});
    const store = useStore();
    const searchActive = ref(false);
    const currentDataIndex = ref(-1);

    const autoComplete = reactive({ allProperties: jsonProperties.property });
    const removeDuplicateHomeData = autoComplete.allProperties.reduce(
      (unique, o) => {
        let duplicateScreening = !unique.some(
          (obj) => obj.city === o.city && obj.state === o.state)
        if (duplicateScreening) { 
          // unique.push(o);
          unique.push({
            city: o.city,
            state: o.state,
            state_code: o.state_code,
            postal_code: o.postal_code,
            country: o.country,
          });
        }
        return unique;
      },[]);
    const searchPreferences = computed(() => {
      if (!searchActive.value) return "";
      return removeDuplicateHomeData.filter((data) => {
        let increaseSearchFilterField = 
          data.state + data.city + data.state_code;
        let searched = increaseSearchFilterField
          .toLowerCase()
          .includes(searchData.value.toLowerCase());
        return searched;
      })
    })
    const searchFilterIsActive = computed(() => {
      return !searchActive.value
        ? false 
        : searchPreferences.value.length > 0 
        ? true 
        : false;
    })
    const placeListTag = computed(() =>{
      return searchPreferences.value.length > 0 ? "Places" : ""; 
    })

    watch(searchData, () => {
      let searchedWordIsTwo = searchData.value.length >= 2 ? true : false;
      searchActive.value = searchedWordIsTwo;
    });

    const getIsActiveRouteTab = computed(() => {
      return store.getters.getIsActiveRouteTab;
    });

    watchEffect(() => {

      switch (getIsActiveRouteTab.value) {
        case "RentPage":
        case "list-for-rent":
          activeRouteTab.value = "list-for-rent"
          break;
        case "SoldPage": 
        case "list-sold":
          activeRouteTab.value = "list-sold"
          break;
        default:
          activeRouteTab.value = "list-for-sale"
          break;
      }
    });

    async function onSubmit(e) {
      if (!searchData.value) {
        return;
      };

      if (!searchFilterIsActive.value && searchData.value) {
        let defaultSearch = {
          city: "San Francisco",
          state_code: "CA",
          activeRouteTab: activeRouteTab.value
        }
        await store.dispatch("setPropertiesFromRemoteApi", defaultSearch);
        store.commit("setSearchedData", defaultSearch);
        console.log("ActiveRouteTab:", defaultSearch);
      }; 
      if (searchFilterIsActive.value && currentDataIndex.value <= 0){
        searchPayload.value = {
          city: e.target.nextElementSibling.children["places-search-list"].children[1].id,
          state_code: 
            e.target.nextElementSibling.children["places-search-list"].children[1].nonce,
          activeRouteTab: activeRouteTab.value
        }
        await store.dispatch("setPropertiesFromRemoteApi", searchPayload.value);
        store.commit("setSearchedData", searchPayload.value);
      };
      if (searchFilterIsActive.value && currentDataIndex.value > 0){
        searchPayload.value = {
          city: e.target.nextElementSibling.children["places-search-list"]
            .children[currentDataIndex.value+1].id,
          state_code: 
            e.target.nextElementSibling.children["places-search-list"].children[currentDataIndex.value+1].nonce,
          activeRouteTab: activeRouteTab.value
        };

        await store.dispatch("setPropertiesFromRemoteApi", searchPayload.value);
        store.commit("setSearchedData", searchPayload.value);

      }

    };
    async function submitClicked(e){
      searchPayload.value = {
        city: e.target.id,
        state_code: e.target.nonce,
        activeRouteTab:`${activeRouteTab.value}`
      }
      await store.dispatch("setPropertiesFromRemoteApi", searchPayload.value);
      store.commit("setSearchedData", searchPayload.value);

    };
    onMounted(() => {
      document.addEventListener("keydown", nextItem);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("keydown", nextItem);
    });

    function nextItem(e){
      if (
        searchFilterIsActive.value && 
        e.keyCode == 40 && 
        currentDataIndex.value < searchPreferences.value.length -1){
        currentDataIndex.value++;
      } else if ( 
        searchFilterIsActive.value && 
        e.keyCode == 38 && 
        currentDataIndex.value > -1){
        currentDataIndex.value--;
      }
    };
    return{
      autoComplete,
      searchData,
      activeRouteTab,
      searchPayload,
      removeDuplicateHomeData,
      searchPreferences,
      searchFilterIsActive,
      searchActive,
      placeListTag,
      onSubmit,
      submitClicked,
      currentDataIndex,
      nextItem
    }
  },
}
</script>