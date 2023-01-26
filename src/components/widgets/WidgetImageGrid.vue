<template>
  <div class="flex relative justify-center">
    <div
      class="
        relative
        w-full
        lm:max-w-5xl lm:rounded-xl
        bg-white
        overflow-hidden
        mx-auto
        cursor-pointer
      "
    >
      <div
        class="
          absolute
          right-4
          top-2
          z-20
          inline-flex
          space-x-4
          items-align
          text-gray-600 text-lg
          xs:hidden
        "
      >
        <save-search />
        <share-icon />
      </div>
      <widget-client-flags v-if="!fetchingIsBusy">
        <template v-slot:iconSlot>
          <div class="sm:hidden flex m-2 space-x-3">
            <save-search />
            <share-icon />
          </div>
        </template>
      </widget-client-flags>
      <div
        v-if="!fetchingIsBusy && propertyImages.length > 0"
        class="
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
      <div
        class="
          grid grid-cols-4 grid-rows-2
          gap-4
          transform
          ease-in
          delay-300
          duration-300
          hover:scale-105
        "
      >
        <div
          v-bind:class="{
            'animate-pulse bg-gray-200':
              fetchingIsBusy && propertyImages.length == 0,
          }"
          class="
            relative
            flex
            mobile-height
            lm:h-96
            col-span-4
            row-span-2
            lm:col-span-3
          "
        >
          <div
            v-show="!fetchingIsBusy && propertyImages.length > 0"
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
              z-10
            "
          ></div>
          <img
            v-if="propertyImages.length > 0"
            v-bind:src="propertyImages[0].href"
            alt=""
            class="
              absolute
              inset-0
              flex-initial
              w-full
              h-full
              object-center object-cover
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
          <img
            v-if="propertyImages.length > 1"
            v-bind:src="propertyImages[1].href"
            alt=""
            class="absolute inset-0 w-full h-full object-center object-cover"
          />
        </div>
        <div
          v-bind:class="{
            'animate-pulse bg-gray-200':
              fetchingIsBusy && propertyImages.length < 2,
          }"
          class="relative hidden lm:block rounded-br-xl"
        >
          <img
            v-if="propertyImages.length > 2"
            v-bind:src="propertyImages[2].href"
            alt=""
            class="absolute inset-0 w-full h-full object-center object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ImageCountIcon, SaveSearch, ShareIcon } from "@/assets/icons";
import { WidgetClientFlags } from "@/components/widgets";
export default {
  name: "WidgetImageGrid",
  props: {
    fetchingIsBusy: {
      type: Boolean,
    },
    propertyImages: {
      type: Array,
    },
  },
  components: {
    ImageCountIcon,
    WidgetClientFlags,
    ShareIcon,
    SaveSearch,
  },
};
</script>
<style scoped>
.mobile-height {
  height: 500px;
  max-height: calc(100vh - 275px);
  min-height: 275px;
}
</style>
