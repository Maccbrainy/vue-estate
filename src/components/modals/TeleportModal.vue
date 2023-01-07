<template>
  <teleport to="body">
    <section
      v-if="teleportModalMediaTable || teleportModalFormRequests.for_modal"
      :class="{
        'sf:bg-white transparent-black': teleportModalMediaTable,
        'is-modal-backgound': teleportModalFormRequests.for_modal,
      }"
      class="fixed w-full h-screen top-0 right-0 left-0 z-30"
    >
      <div
        ref="teleportModalRef"
        :class="{
          'w-full h-screen md:w-11/12 md:h-5/6  m-auto bottom-0 md:-bottom-14':
            teleportModalMediaTable,
          'w-full h-full md:w-8/12 lg:w-5/12 md:h-5/6 top-0 md:top-14 mx-auto pb-2':
            teleportModalFormRequests.for_modal,
        }"
        class="relative bg-white md:rounded-lg overflow-hidden"
      >
        <div
          v-if="
            teleportModalMediaTable &&
            Object.keys(storeData.propertyDetailed).length > 0
          "
          class="relative md:fixed w-full md:w-11/12 z-10 bg-white rounded-lg"
        >
          <div
            class="flex justify-between items-center border-b px-4 pt-2 pb-3"
          >
            <ul
              class="
                flex
                justify-start
                space-x-2
                text-sm
                md:text-base
                font-medium
                text-gray-700
              "
            >
              <li v-for="(title, index) in ['MediaTab']" :key="index">
                <button
                  :id="title"
                  type="button"
                  class="
                    rounded-md
                    text-base
                    xs:text-sm
                    font-medium
                    text-gray-700
                    px-5
                    py-2
                    text-teal
                    shadow-lg
                    border
                    hover:bg-white
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
              <save-search class="text-gray-800" />
              <share-icon class="text-gray-800" />
            </div>
          </div>
          <close-mobile-menu
            class="absolute right-3 top-4 hover:text-teal text-gray-600"
            v-on:click="
              teleportModalCallback({ name: modalName, open_modal: false })
            "
          />
          <div
            class="sf:hidden text-gray-700 xs:text-sm font-semibold px-4 py-1"
          >
            <div>
              {{
                `${storeData.propertyDetailed.address.line} 
                | $${storeData.propertyDetailed.price.toLocaleString()} 
                | ${
                  storeData.propertyDetailed.beds == 0
                    ? "Studio"
                    : storeData.propertyDetailed.beds > 0
                    ? `${storeData.propertyDetailed.beds} bed(s)`
                    : ""
                } | ${
                  storeData.propertyDetailed.baths > 0
                    ? `${storeData.propertyDetailed.baths} bath(s)`
                    : ""
                }`
              }}
            </div>
          </div>
        </div>
        <div
          v-if="
            teleportModalMediaTable &&
            Object.keys(storeData.propertyDetailed).length > 0
          "
          class="
            relative
            w-full
            lm:w-8/12
            lg:w-9/12
            h-screen
            md:h-full
            lm:h-96
            top-0
            md:top-28
            overflow-y-auto
          "
        >
          <div class="absolute w-full">
            <div
              class="mf:hidden text-gray-700 text-lg font-semibold py-3 px-3"
            >
              {{ `Listing Photos (${storeData.propertyDetailed.photo_count})` }}
            </div>
            <div class="flex flex-wrap">
              <div
                v-for="(photo, index) in storeData.propertyDetailed.photos"
                :key="index"
                class="flex-auto border-b-4 md:border-4 border-transparent"
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
          v-if="teleportModalMediaTable"
          class="
            bg-white
            lm:hidden
            absolute
            bottom-0
            w-full
            flex flex-col
            justify-center
            gap-2
            items-center
            gap-x-4
            px-2
            font-medium
            py-1
          "
        >
          <div class="w-full flex flex-row justify-center items-center gap-x-4">
            <button
              v-for="(requestType, index) in [
                'Schedule A Tour',
                'Request For Info',
              ]"
              :key="requestType"
              v-on:click="teleportRequestCallback(requestType)"
              type="button"
              class="w-full border px-2 py-2 rounded-lg text-sm"
              v-bind:class="{
                'border-red-600 bg-red-600 text-white hover:bg-transparent hover:text-red-600':
                  index == 0,
                'border-teal text-teal hover:bg-teal-lighter': index == 1,
              }"
            >
              {{ requestType }}
            </button>
          </div>
          <p class="font-medium text-gray-500 text-xs pb-1">
            Request a tour as early as today!
          </p>
        </div>
        <div
          v-if="
            teleportModalMediaTable &&
            Object.keys(storeData.propertyDetailed).length > 0
          "
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
            top-28
            sf:top-0
          "
        >
          <div class="w-11/12 m-auto pt-2">
            <div v-if="Object.hasOwn(storeData.propertyDetailed, 'lead_forms')">
              <h2 class="text-gray-700 text-lg font-semibold pb-2">
                {{
                  storeData.propertyDetailed.lead_forms[0].form.show
                    ? "Contact This Property"
                    : "Schedule A Tour"
                }}
              </h2>
              <widget-contact-form
                v-if="storeData.propertyDetailed.lead_forms[0].form.show"
                v-bind:propertyName="`${storeData.propertyDetailed.address.line}, ${storeData.propertyDetailed.address.city}, ${storeData.propertyDetailed.address.state_code}, ${storeData.propertyDetailed.address.postal_code}`"
              ></widget-contact-form>
              <widget-schedule-tour
                v-else
                v-bind:propertyName="`${storeData.propertyDetailed.address.line}, ${storeData.propertyDetailed.address.city}, ${storeData.propertyDetailed.address.state_code}, ${storeData.propertyDetailed.address.postal_code}`"
              ></widget-schedule-tour>
            </div>
          </div>
        </div>
        <div
          v-if="teleportModalFormRequests.for_modal"
          class="mt-2 w-full h-full overflow-y-auto bg-white px-6 py-2"
        >
          <div class="text-gray-700 font-bold text-lg py-1">
            {{
              teleportModalFormRequests.name == `Schedule A Tour`
                ? `Schedule A Tour`
                : "Request For Info"
            }}
          </div>
          <widget-schedule-tour
            v-if="teleportModalFormRequests.name == `Schedule A Tour`"
            v-bind:propertyName="
              Object.keys(storeData.propertyDetailed).length > 0
                ? `${storeData.propertyDetailed.address.line}, ${storeData.propertyDetailed.address.city}, ${storeData.propertyDetailed.address.state_code}, ${storeData.propertyDetailed.address.postal_code}`
                : teleportModalFormRequests.description
            "
          >
          </widget-schedule-tour>
          <widget-request-info-form
            v-bind:propertyName="
              Object.keys(storeData.propertyDetailed).length > 0
                ? `${storeData.propertyDetailed.address.line}, ${storeData.propertyDetailed.address.city}, ${storeData.propertyDetailed.address.state_code}, ${storeData.propertyDetailed.address.postal_code}`
                : teleportModalFormRequests.description
            "
            v-else
          >
          </widget-request-info-form>
        </div>
        <close-mobile-menu
          v-show="teleportModalFormRequests.for_modal"
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
          v-on:click="
            teleportModalCallback({ name: modalName, open_modal: false })
          "
        />
      </div>
    </section>
  </teleport>
</template>
<script>
import { ref, watchEffect, inject, computed } from "vue";
import { useStore } from "vuex";
import { CloseMobileMenu, SaveSearch, ShareIcon } from "@/assets/icons";
import {
  WidgetScheduleTour,
  WidgetRequestInfoForm,
  WidgetContactForm,
} from "@/components/widgets";
export default {
  name: "TeleportModal",
  components: {
    WidgetRequestInfoForm,
    WidgetScheduleTour,
    WidgetContactForm,
    CloseMobileMenu,
    SaveSearch,
    ShareIcon,
  },
  setup() {
    const teleportModalRef = ref(null);
    const store = useStore();
    const {
      teleportModalCallback,
      teleportModalMediaTable,
      teleportModalFormRequests,
    } = inject("provider");
    const storeData = computed(() => store.getters.getStore);

    const modalName = computed(() =>
      teleportModalMediaTable.value
        ? "isMediaTable"
        : teleportModalFormRequests.value.name == "Schedule A Tour"
        ? "Schedule A Tour"
        : teleportModalFormRequests.value.name == "Request For Info"
        ? "Request For Info"
        : ""
    );
    watchEffect(() => {
      teleportModalFormRequests.value.for_modal;
      teleportModalMediaTable.value;
      const closeTeleportModal = (event) => {
        if (
          teleportModalRef.value &&
          teleportModalRef.value.contains(event.target)
        ) {
          return;
        }
        document.removeEventListener("mousedown", closeTeleportModal);
        document.removeEventListener("touchstart", closeTeleportModal);
        teleportModalCallback({ name: modalName.value, open_modal: false });
      };
      document.addEventListener("mousedown", closeTeleportModal);
      document.addEventListener("touchstart", closeTeleportModal);
    });
    const teleportRequestCallback = (requestType) => {
      teleportModalCallback({ name: "isMediaTable", open_modal: false });
      teleportModalCallback({ name: requestType, open_modal: true });
    };
    return {
      teleportModalFormRequests,
      teleportModalMediaTable,
      teleportModalRef,
      teleportModalCallback,
      modalName,
      storeData,
      teleportRequestCallback,
    };
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
