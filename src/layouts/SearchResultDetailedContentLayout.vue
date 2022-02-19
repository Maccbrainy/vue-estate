<template>
  <nav-bar-container class="border-b">
    <nav-bar-search-form></nav-bar-search-form>
    <nav-bar></nav-bar>
  </nav-bar-container>
  <div 
    class="
      w-full 
      relative 
      -bottom-16 
      bg-white 
      overflow-x-hidden 
      min-h-screen 
      py-3">
    <widget-image-grid></widget-image-grid>
    <div class="w-9/12 mx-auto px-4">
      <div class="flex flex-wrap">
        <div 
          class="
            w-8/12 
            border-solid border-t-8 border-r-4 border-l-4 border-transparent">
          <div class="flex flex-col my-3">
            <div class="flex flex-wrap">
              <div class="w-8/12">
                <div>
                  <h1>
                    <span class="text-2xl text-gray-700 font-semibold">
                      {{ homeFactsShowDetails.street }}
                    </span>
                    <br>
                    <span class="text-base font-normaltext-gray-600">
                      {{ homeFactsShowDetails.city }}, 
                      {{ homeFactsShowDetails.state }} 
                      {{ homeFactsShowDetails.postal_code }}
                    </span>
                  </h1>
                </div>
                <widget-utility-summary 
                  v-bind:bedroom="homeFactsShowDetails.no_bedroom" 
                  v-bind:bathroom="homeFactsShowDetails.no_bathroom" 
                  v-bind:squarefoot="homeFactsShowDetails.no_sqft"
                  class="my-3">
                </widget-utility-summary>
              </div>
              <div class="w-3/12">
                <div>
                  <h3>
                    <div class="text-2xl text-gray-700 font-bold">
                      ${{ homeFactsShowDetails.id }}
                    </div>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div 
          class="
            w-4/12 
            border-solid border-t-8 border-r-4 border-l-4 border-transparent">
          The Request and Shedule tour form
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dataSource from "@/components/homes.json";
import { computed, reactive, ref, watch } from "vue";
import buildRouterParamsUrl from "@/composables/buildRouterParamsUrl";
import { useStore } from "vuex";
import NavBarContainer from "@/components/NavBarContainer.vue";
import NavBarSearchForm from "@/components/NavBarSearchForm.vue";
import WidgetImageGrid from "@/components/WidgetImageGrid.vue";
import WidgetUtilitySummary from "@/components/WidgetUtilitySummary.vue";
import NavBar from "@/components/NavBar.vue";
import { useRouter } from "vue-router";
import checkPresenceOfHyphenAndRemove from "@/composables/checkPresenceOfHyphenAndRemove";
export default {
  name: "SearchResultDetailedContentLayout",
  props: {
    address: {
      type: String,
      required: true,
    },
  },
  components: {
    NavBarContainer,
    WidgetImageGrid,
    WidgetUtilitySummary,
    NavBarSearchForm,
    NavBar,
  },
  setup(props) {
    const router = useRouter();
    const { hyphenFreeProp } = checkPresenceOfHyphenAndRemove(props.address);
    //All Data source
    const homeResources = reactive({
      homeData: dataSource.homes,
    });
    const homeFactsShowDetails = computed(() => {
      return homeResources.homeData.find(
        (computed) => computed.street === hyphenFreeProp.value);
    });
    router.push({
      name: "HomeDetail",
      params: {
        title: `${hyphenFreeProp.value}, ${homeFactsShowDetails.value.city}, ${homeFactsShowDetails.value.postal_code}`,
      }
    });
    const store = useStore();
    const stateSearchedData = ref("");
    const searchedDataFromStore = computed(() => {
      return store.getters.getSearchedData
    });
    watch(searchedDataFromStore, (val) => {
      stateSearchedData.value = val;
      buildRouterParamsUrl(
        stateSearchedData.value["state"], 
        stateSearchedData.value["city"]
      );
    });
    return {
      searchedDataFromStore,
      stateSearchedData,
      homeFactsShowDetails,
    }
  }
}
</script>