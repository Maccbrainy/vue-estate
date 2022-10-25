<template>
  <div
    v-bind:class="{
      'animate-pulse': fetchingIsBusy,
    }"
    class="flex relative overflow-hidden justify-center"
  >
    <div class="w-full lm:w-9/12 mx-auto cursor-pointer">
      <div class="grid grid-cols-4 grid-rows-2 gap-4">
        <div
          class="
            relative
            bg-gray-200
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
              h-96
              top-image-gradient
              opacity-
              lm:rounded-l-xl
              z-10
            "
          ></div>
          <widget-client-flags
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
            class="
              lm:hidden
              absolute
              z-10
              flex
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
            v-show="!fetchingIsBusy"
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
        <div class="relative bg-gray-200 rounded-tr-xl hidden lm:block">
          <div
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
            v-show="!fetchingIsBusy"
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
        <div class="relative hidden lm:block bg-gray-200 rounded-br-xl">
          <div
            class="
              absolute
              flex
              bg-opacity-50 bg-black
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
            v-show="!fetchingIsBusy"
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
import { ImageCountIcon, SaveSearch, ShareIcon } from "../assets/icons";
import WidgetClientFlags from "@/components/WidgetClientFlags.vue";
export default {
  name: "WidgetImageGrid",
  props: {
    fetchingIsBusy: {
      type: Boolean,
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
};
</script>
<style scoped>
.top-image-gradient {
  background: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
}
</style>
