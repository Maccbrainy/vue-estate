<template>
  <nav-bar-container class="border-b">
    <nav-bar-search-form></nav-bar-search-form>
    <nav-bar></nav-bar>
  </nav-bar-container>
  <!-- <div v-if="isLoading">Loading...</div> -->
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
                      {{ address }}
                    </span>
                    <br>
                    <span class="text-base font-normaltext-gray-600">
                      {{ city }}, 
                      {{ slug }} 
                      {{ postalCode }}
                    </span>
                  </h1>
                </div>
                <widget-utility-summary 
                  v-bind:bedroom="propertyDetail.beds" 
                  v-bind:bathroom="propertyDetail.baths" 
                  v-bind:squarefoot="propertyDetail.sqft"
                  class="my-3">
                </widget-utility-summary>
              </div>
              <div class="w-3/12">
                <div>
                  <h3>
                    <div class="text-2xl text-gray-700 font-bold">
                      ${{ propertyDetail.price }}
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
import { useRouter } from "vue-router";
import { useFetch } from "@/api/useFetch.js";
import { ref, onMounted } from "vue";
import NavBarContainer from "@/components/NavBarContainer.vue";
import NavBarSearchForm from "@/components/NavBarSearchForm.vue";
import WidgetImageGrid from "@/components/WidgetImageGrid.vue";
import WidgetUtilitySummary from "@/components/WidgetUtilitySummary.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "SearchResultDetailedContentLayout",
  props: {
    slug: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    propertyId: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String
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
    const propertyDetail = ref({});
    const isLoading = ref(true);
    const router = useRouter();
    router.push({
      name: "HomeDetail",
      params: {
        slug: props.slug,
        city: props.city,
        address: props.address,
        propertyId: props.propertyId,
        postalCode: props.postalCode,
        title: `${props.address}, ${props.city}, ${props.slug}, ${props.postalCode}`,
      }
    });
    onMounted(async () => {
      const { getPropertyDetails } = useFetch();
      propertyDetail.value = await getPropertyDetails(props.propertyId);
      isLoading.value = false;
    });

    return {
      isLoading,
      propertyDetail,
    }
  }
}
</script>