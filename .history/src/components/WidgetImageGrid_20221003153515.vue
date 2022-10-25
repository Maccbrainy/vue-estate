<template>
  <div class="flex relative overflow-hidden justify-center">
    <div class="w-full lm:w-9/12 mx-auto cursor-pointer">
      <div class="grid grid-cols-4 grid-rows-2 gap-4">
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
          <widget-client-flags
            v-if="!fetchingIsBusy"
            v-bind:propertyClientDisplayFlags="clientDisplayFlags"
            v-bind:presentationStatus="propertyStatus"
            v-bind:lastUpdateTime="propertyLastUpdate"
          >
            <template v-slot:iconSlot>
              <div class="lm:hidden flex m-2 space-x-3">
                <save-search />
                <share-icon class="text-white" />
              </div>
            </template>
          </widget-client-flags>
          <div
            v-if="!fetchingIsBusy"
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
            v-on:click="getModalMediaTable" 
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
            v-if="!fetchingIsBusy"
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
          <div
            v-if="!fetchingIsBusy"
            class="
              flex
              justify-around
              items-align
              mt-3
              text-gray-600 text-lg
              font-semibold
            "
          >
            <button
              class="
                bg-white
                px-2
                py-1
                rounded-lg
                cursor-pointer
                flex
                items-center
                z-10
              "
            >
              <save-search class="text-teal" />
              <span class="p-1">Save</span>
            </button>
            <button
              class="
                bg-white
                px-2
                py-1
                rounded-lg
                cursor-pointer
                flex
                items-center
                z-10
              "
            >
              <share-icon class="text-teal" />
              <span class="px-1">Share</span>
            </button>
          </div>
          <img
            v-if="propertyImages.length > 1"
            v-on:click="getModalMediaTable"
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
// import { computed } from "vue";
// import { useStore } from "vuex";
import { ImageCountIcon, SaveSearch, ShareIcon } from "../assets/icons";
import WidgetClientFlags from "@/components/WidgetClientFlags.vue";
export default {
  name: "WidgetImageGrid",
  props: {
    fetchingIsBusy: {
      type: Boolean
    },
    propertyImages: {
      type: Array,
    },
    clientDisplayFlags: {
      type: Object,
    },
    propertyStatus: {
      type: String,
    },
    propertyLastUpdate: {
      type: String,
    },
  },
  components: {
    ImageCountIcon,
    SaveSearch,
    ShareIcon,
    WidgetClientFlags,
  },
  setup() {
    const getModalMediaTable = () => {
      alert("Open Modal Window!!!");
    }
    return { getModalMediaTable };
  },
};
</script>
