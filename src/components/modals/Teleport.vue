<template>
  <teleport to="body">
    <section
      v-if="isMediaTableModalOpen || isModalOpen"
      :class="{
        'transparent-black': isMediaTableModalOpen,
        'is-modal-backgound': isModalOpen,
      }"
      class="fixed w-full h-screen top-0 right-0 left-0 z-30"
    >
      <div
        v-if="isMediaTableModalOpen"
        ref="mediaTableRef"
        class="
          w-11/12
          h-5/6
          bg-white
          m-auto
          relative
          -bottom-14
          rounded-lg
          overflow-hidden
        "
      >
        <div class="fixed w-11/12 z-10 bg-white rounded-lg">
          <div
            class="flex justify-between items-center border-b px-4 pt-2 pb-3"
          >
            <ul
              class="
                flex
                justify-start
                space-x-2
                text-base
                font-medium
                text-gray-700
              "
            >
              <li
                v-for="(title, index) in [
                  'Media',
                  'Map',
                  'Schools',
                  'Shop & Eat',
                ]"
                :key="index"
              >
                <button
                  v-on:click="getMappingIdForContent"
                  :id="title"
                  v-bind:class="{
                    'text-teal shadow-lg border hover:bg-white':
                      activeMappingTable == title,
                    'hover:bg-gray-200': activeMappingTable != title,
                  }"
                  type="button"
                  class="
                    rounded-md
                    text-base
                    font-medium
                    text-gray-700
                    px-5
                    py-2
                  "
                >
                  {{ title }}
                </button>
              </li>
            </ul>
            <div
              class="
                flex
                justify-around
                space-x-4
                items-align
                text-gray-600 text-lg
                font-semibold
                mr-8
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
                  border
                  hover:bg-gray-200 hover:border-transparent
                "
              >
                <save-search class="text-gray-800" />
                <span class="p-1 font-semibold">Save</span>
              </button>
              <button
                class="
                  bg-white
                  px-2
                  rounded-lg
                  cursor-pointer
                  flex
                  py-1
                  items-center
                  border
                  hover:bg-gray-200 hover:border-transparent
                "
              >
                <share-icon class="text-gray-800" />
                <span class="px-1 font-semibold">Share</span>
              </button>
            </div>
          </div>
          <close-mobile-menu
            class="absolute right-3 top-5 hover:text-teal text-gray-600"
            v-on:click="isMediaTableModalOpen = false"
          />
          <div class="text-gray-700 text-base font-semibold px-4 py-1">
            <div>
              {{
                `${propertyAddress} | $${contextProvider.price} | ${
                  contextProvider.bed == 0
                    ? "Studio"
                    : contextProvider.bed > 0
                    ? contextProvider.bed
                    : ""
                } ${contextProvider.bath > 0 ? contextProvider.bath : ""}`
              }}
            </div>
          </div>
        </div>
        <div
          class="
            relative
            w-full
            lm:w-8/12
            lg:w-9/12
            h-96
            top-24
            -bottom-8
            overflow-y-auto
            mt-1.5
          "
        >
          <div class="absolute w-full">
            <div class="text-gray-700 text-lg font-semibold py-3 px-3">
              {{ `Listing Photos (${propertyPhotos.length})` }}
            </div>
            <div class="flex flex-wrap">
              <div
                v-for="(photo, index) in propertyPhotos"
                :key="index"
                class="flex-auto border-4 border-solid border-transparent"
              >
                <picture>
                  <img
                    class="w-full h-full object-center object-cover"
                    v-bind:src="photo.href"
                    :alt="photo.description"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
        <div
          class="
            relative
            float-right
            mf:hidden
            lm:w-4/12
            lg:w-3/12
            h-96
            overflow-y-auto
            bg-white
            py-1
            border
            px-2
            rounded-tl-lg rounded-bl-lg
            shadow-2xl
            transform
            -translate-y-96
            top-24
            -mt-0.5
          "
        >
          <div class="w-11/12 m-auto pt-2">
            <div v-if="propertyDetail.length > 0">
              <h2 class="text-gray-700 text-lg font-semibold pb-2">
                {{
                  propertyDetail[0].lead_forms.form.show
                    ? "Contact This Property"
                    : "Schedule A Tour"
                }}
              </h2>
              <widget-contact-form
                v-if="propertyDetail[0].lead_forms.form.show"
                v-bind:propertyName="fullPropertyAddressIdentity"
              ></widget-contact-form>
              <widget-schedule-tour
                v-else
                v-bind:propertyName="fullPropertyAddressIdentity"
              ></widget-schedule-tour>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="isModalOpen"
        ref="isModalOpenRef"
        class="
          w-full
          lg:w-5/12 lg:h-5/6
          h-full
          bg-white
          top-14
          mx-auto
          pb-2
          relative
          rounded-lg
          overflow-hidden
        "
      >
        <div class="mt-2 w-full h-full overflow-y-auto bg-white px-6 py-2">
          <div class="text-gray-700 font-bold text-lg py-1">
            {{ isScheduleTour ? `Schedule A Tour` : "Request For Info" }}
          </div>
          <widget-schedule-tour
            v-if="isScheduleTour"
            v-bind:propertyName="fullPropertyAddressIdentity"
          >
          </widget-schedule-tour>
          <widget-request-info-form
            v-bind:propertyName="fullPropertyAddressIdentity"
            v-else
          >
          </widget-request-info-form>
        </div>
        <close-mobile-menu
          class="
            absolute
            right-5
            border
            bg-white
            rounded-full
            top-5
            hover:text-teal hover:shadow-lg
            text-gray-600
          "
          v-on:click="isModalOpen = false"
        />
      </div>
    </section>
  </teleport>
</template>
<script>
import { ref } from "vue";
import { CloseMobileMenu } from "@/assets/icons";
import {
  WidgetScheduleTour,
  WidgetRequestInfoForm,
  WidgetContactForm,
} from "@/components/widgets";
export default {
  name: "Teleport",
  components: {
    WidgetRequestInfoForm,
    WidgetScheduleTour,
    WidgetContactForm,
    CloseMobileMenu,
  },
  setup() {
    const isModalOpen = ref(false);
    const isModalOpenRef = ref(null);
    const isMediaTableModalOpen = ref(false);
    const mediaTableRef = ref(null);
    return { isModalOpen, isModalOpenRef, isMediaTableModalOpen, mediaTableRef };
  },
};
</script>
<style scoped>
.transparent-black {
  background: #000000de;
}
.is-modal-backgound {
  background: rgba(0, 0, 0, 0.346);
}
</style>
