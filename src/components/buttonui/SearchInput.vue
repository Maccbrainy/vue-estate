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
        :title="`${home.city}, ${home.state_code}`"
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
          <span :id="`${home.city}`" :nonce="`${home.state_code}`">
            {{ home.city }}, {{ home.state_code}}
            <legend class="text-xs font-normal">City</legend>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, reactive, onMounted, watch, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import jsonProperties from "@/api/autoComplete.json";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import LocationIcon from "@/assets/icons/LocationIcon.vue";
import { useStore } from "vuex";
export default {
  name: "SearchInput",
  inheritAttrs: false,
  components: {
    SearchIcon,
    LocationIcon,
  },
  setup() {
    const searchData = ref("");
    const route = useRoute();
    const store = useStore();
    const searchActive = ref(false);
    const payloadOnSubmit = reactive({});
    const payloadClicked = reactive({});

    watchEffect(async () => {
      if (route.params.slug){
        await store.dispatch("setPropertiesFromRemoteApi", route.params.slug);
      }
    });

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
    onMounted(() => {
      if (localStorage.savedSearchedData){
        searchData.value = localStorage.savedSearchedData;
      }
    });
    return{
      autoComplete,
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
    async onSubmit(e) {
      if (!this.searchFilterIsActive && this.searchData) {
        let defaultSearch = {
          city: "San Francisco",
          state_code: "CA",
        }
        await this.$store.dispatch("setPropertiesFromRemoteApi", defaultSearch);
        this.$store.commit("setSearchedData", defaultSearch);
        console.log("Dispatched is completed:", defaultSearch);
      }; 
      if (this.searchFilterIsActive){
        this.payloadOnSubmit = {
          city: e.target.nextElementSibling.firstChild.children[1].firstChild
            .children[1].id,
          state_code: 
            e.target.nextElementSibling.firstChild.children[1].firstChild
            .children[1].nonce
        }
        await this.$store.dispatch("setPropertiesFromRemoteApi", this.payloadOnSubmit);
        this.$store.commit("setSearchedData", this.payloadOnSubmit);
        console.log("Dispatched is completed:", this.payloadOnSubmit)
      };
      if (!this.searchData) {
        return;
      }
    },
    async submitClicked(e){
      this.payloadClicked = {
        city: e.target.id,
        state_code: e.target.nonce,
      }
      await this.$store.dispatch("setPropertiesFromRemoteApi", this.payloadClicked);
      this.$store.commit("setSearchedData", this.payloadClicked);
      console.log("Dispatched is completed:", this.payloadClicked);
    }
  },
}
</script>