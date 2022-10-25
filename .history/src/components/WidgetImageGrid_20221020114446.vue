<template>
  <div class="flex relative overflow-hidden justify-center">
    <div class="relative w-full lm:w-9/12 mx-auto cursor-pointer">
      <div class="grid grid-cols-4 grid-rows-2 gap-4">
        <div class="absolute right-3 top-1 z-20">
          <widget-save-share class="relative"></widget-save-share>
        </div>
        <div
          v-bind:class="{
            'animate-pulse bg-gray-200':
              fetchingIsBusy && propertyImages.length == 0,
          }"
          class="
            relative
            lm:rounded-l-xl
            h-96
            col-span-4
            row-span-2
            lm:col-span-3
          "
        >
          <div
            v-show="!fetchingIsBusy && propertyImages.length > 0"
            v-on:click="$emit('openMediaTable', $event)" 
            class="
              absolute
              top-0
              right-0
              left-0
              bottom-0
              h-full
              bg-gradient-to-b
              from-black
              opacity-50
              lm:rounded-l-xl
              z-10
            "
          ></div>
          <widget-client-flags v-if="!fetchingIsBusy">
            <template v-slot:iconSlot>
              <div class="flex m-2 space-x-3 sm:hidden">
                <save-search />
                <share-icon class="text-white" />
              </div>
            </template>
          </widget-client-flags>
          <div
            v-if="!fetchingIsBusy && propertyImages.length > 0"
            class="
              lm:hidden
              absolute
              z-10
              flex
              bg-opacity-80 bg-black
              text-white
              bottom-0
              right-0
              px-2
              py-1
              m-3
              rounded-md
            "
          >
            <span><image-count-icon /></span>
            <span class="pl-1">{{ propertyImages.length }}</span>
          </div>
          <img
            v-if="propertyImages.length > 0"
            v-bind:src="propertyImages[0].href"
            alt=""
            class="
              absolute
              inset-0
              w-full
              h-full
              object-center object-cover
              lm:rounded-l-xl
            "
          />
        </div>
        <div
          v-bind:class="{
            'animate-pulse bg-gray-200':
              fetchingIsBusy && propertyImages.length < 1,
          }"
          class="relative rounded-tr-xl hidden lm:block"
        >
          <div
            v-show="!fetchingIsBusy && propertyImages.length > 1"
            v-on:click="getModalMediaTable"
            class="
              absolute
              top-0
              right-0
              left-0
              bottom-0
              h-full
              bg-gradient-to-b
              from-black
              opacity-50
              rounded-tr-xl
              z-10
            "
          ></div>
          <!-- <widget-save-share></widget-save-share> -->
          <img
            v-if="propertyImages.length > 1"
            v-bind:src="propertyImages[1].href"
            alt=""
            class="
              absolute
              inset-0
              w-full
              h-full
              object-center object-cover
              rounded-tr-xl
            "
          />
        </div>
        <div
          v-bind:class="{
            'animate-pulse bg-gray-200':
              fetchingIsBusy && propertyImages.length < 2,
          }"
          class="relative hidden lm:block rounded-br-xl"
        >
          <div
            v-if="!fetchingIsBusy"
            class="
              absolute
              flex
              bg-opacity-80 bg-black
              text-white
              bottom-0
              right-0
              px-2
              py-1
              m-3
              rounded-md
              z-10
            "
          >
            <span><image-count-icon /></span>
            <span class="pl-1">{{ propertyImages.length }}</span>
          </div>
          <img
            v-if="propertyImages.length > 2"
            v-on:click="getModalMediaTable"
            v-bind:src="propertyImages[2].href"
            alt=""
            class="
              absolute
              inset-0
              w-full
              h-full
              object-center object-cover
              rounded-br-xl
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { ImageCountIcon } from "../assets/icons";
import WidgetClientFlags from "@/components/WidgetClientFlags.vue";
import WidgetSaveShare from "@/components/WidgetSaveShare.vue";
export default {
  name: "WidgetImageGrid",
  props: {
    fetchingIsBusy: {
      type: Boolean
    },
    propertyImages: {
      type: Array,
    },
  },
  components: {
    ImageCountIcon,
    WidgetClientFlags,
    WidgetSaveShare,
  },
  setup() {
    // const store = useStore();
    // const route = useRoute();
    const openMediaTable = ref(false)
    // const getModalMediaTable = () => {
      // let updateRouterParams = {};
      // openMediaTable.value = !openMediaTable.value;
      // context.emit("update:mediaViewTable", openMediaTable.value);
      // updateRouterParams.mediaTable = openMediaTable.value;
      // updateRouterParams.state_code = route.params.slug;
      // updateRouterParams.city = route.params.city;
      // updateRouterParams.postalCode = route.params.postalCode;
      // updateRouterParams.propertyId = route.params.propertyId;
      // updateRouterParams.address = route.params.address;
      // store.commit("setUseRouterPush", updateRouterParams);
      // console.log("DETAILED ROUTER:", route);

    // }
    return { openMediaTable };
  },
};
</script>
