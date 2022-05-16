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
      'relative border-t-0 border text-gray-600 w-full max-h-40 overflow-auto bg-white z-20 rounded-b-lg': searchFilterIsActive }">
    <ul role="listbox" aria-labelledby="search-label">
      <li 
        v-bind:class="{
          'bg-gray-100 pl-4 py-3 text-xs font-medium': searchFilterIsActive 
        }"> 
        {{ placeListTag }}
      </li>
      <li 
        v-for="(home, index) in searchPreferences" 
        :key="index"
        :id="`data-suggestion-item-${index}`"
        :title="`${home.city}, ${home.state}`"
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
          px-3">
        <div class="flex space-x-2">
          <span>
            <location-icon class="mt-1 text-gray-600 text-xs"/>
          </span>
          <span :id="`${home.city}`" :nonce="`${home.state}`">
            {{ home.city }}, {{ home.state}}
            <legend class="text-xs font-normal">City</legend>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, reactive, onMounted, watch, computed } from "vue";
import dataSource from "@/components/homes.json";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import LocationIcon from "@/assets/icons/LocationIcon.vue";
// import { buildRouterParamsUrl } from "@/composables";

export default {
  name: "SearchInput",
  inheritAttrs: false,
  components: {
    SearchIcon,
    LocationIcon,
  },
  setup() {
    const searchData = ref("");
    const searchActive = ref(false);
    const payloadOnSubmit = reactive({});
    const payloadClicked = reactive({});

    //All Home Data source;
    const homeResources = reactive({ allHomes: dataSource.homes });
    const removeDuplicateHomeData = homeResources.allHomes.reduce(
      (unique, o) => {
        let duplicateScreening = !unique.some(
          (obj) => obj.city === o.city && obj.state === o.state)
        if (duplicateScreening) { 
          // unique.push(o);
          unique.push({
            city: o.city,
            state: o.state,
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
          data.state + data.city + data.postal_code;
        let searched = increaseSearchFilterField
          .toLowerCase()
          .includes(searchData.value.toLowerCase());
        return searched;
      })
    })
    const searchFilterIsActive = computed(() => {
      // return searchPreferences.value.length > 0 ? true : false;
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
    onMounted(() => {
      
      if (localStorage.savedSearchedData){
        searchData.value = localStorage.savedSearchedData;
      }
    });
    return{
      homeResources,
      searchData,
      removeDuplicateHomeData,
      searchPreferences,
      searchFilterIsActive,
      searchActive,
      placeListTag,
      payloadOnSubmit,
      payloadClicked,
    }
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch("setPropertiesFromRemoteApi", this.searchData);
      this.$store.commit("setSearchedData", this.searchData);

      console.log("Dispatched is completed");
      // if (!this.searchFilterIsActive && this.searchData) {
      //   this.$store.commit("setSearchedData", this.searchData);
      //   buildRouterParamsUrl(this.searchData);
      // };
      // this.payloadOnSubmit = {
      //   city: e.target.nextElementSibling.firstChild.children[1].firstChild
      //     .children[1].id,
      //   state: 
      //     e.target.nextElementSibling.firstChild.children[1].firstChild
      //       .children[1].nonce,
      // }
      // this.$store.commit("setSearchedData", this.payloadOnSubmit);
    },
    submitClicked(e){
      this.payloadClicked = {
        city: e.target.id,
        state: e.target.nonce,
      }
      this.$store.commit("setSearchedData", this.payloadClicked);
    }
  },
}
</script>