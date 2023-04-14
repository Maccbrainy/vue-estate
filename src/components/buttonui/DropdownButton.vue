<template>
  <li>
    <div ref="menuRef" class="mr-2">
      <button-slot v-on:click="buttonIsOpen = !buttonIsOpen">
        <span
          v-if="!isAdvancedDropdown"
          v-show="filterActivated"
          class="my-auto w-3 h-3 rounded-full bg-teal mr-2"
        ></span>
        <span
          v-if="!isAdvancedDropdown"
          v-bind:class="{
            'text-gray-400': storeData.fetchingIsBusy,
          }"
        >
          {{ buttonTitle }}
        </span>
        <chevron-down
          v-if="!isAdvancedDropdown"
          v-bind:class="{
            'transform rotate-180': buttonIsOpen,
            ' text-gray-400': storeData.fetchingIsBusy,
          }"
        />

        <span
          v-if="isAdvancedDropdown"
          class="md:hidden xs:text-sm flex items-center"
        >
          <span v-show="!storeData.filterDescriptionInfo.filterIsActive"
            ><filter-icon
          /></span>
          <span
            v-show="storeData.filterDescriptionInfo.filterIsActive"
            class="my-auto w-3 h-3 rounded-full bg-teal mr-1"
          >
          </span>
          <span class="ml-1">Filters</span>
        </span>
        <span
          v-if="isAdvancedDropdown"
          class="flex items-center sf:hidden lm:hidden"
        >
          <span v-show="!storeData.filterDescriptionInfo.filterIsActive">
            <filter-icon v-show="!isBuyPage" />
          </span>
          <span
            v-show="storeData.filterDescriptionInfo.filterIsActive"
            class="my-auto w-3 h-3 rounded-full bg-teal mr-1"
          >
          </span>
          <span class="ml-1">{{ isBuyPage ? "More" : "Filters" }}</span>
          <chevron-down
            v-show="isBuyPage"
            v-bind:class="{
              'transform rotate-180': buttonIsOpen,
            }"
          />
        </span>
        <span v-if="isAdvancedDropdown" class="hidden lm:flex lm:items-center">
          <span
            v-show="filterMoreActivated"
            class="my-auto w-3 h-3 rounded-full bg-teal mr-1"
          >
          </span>
          <span
            v-bind:class="{
              'text-gray-400': storeData.fetchingIsBusy,
            }"
            class="ml-1"
            >More</span
          >
          <chevron-down
            v-bind:class="{
              'transform rotate-180': buttonIsOpen,
              ' text-gray-400': storeData.fetchingIsBusy,
            }"
          />
        </span>
      </button-slot>
      <fieldset
        v-bind:ref="(el) => (fieldSetRef = el)"
        v-bind="$attrs"
        class="
          overflow-auto
          z-30
          origin-top-right
          absolute
          text-gray-600
          font-normal
          text-base
          pb-2
          mt-1
          w-auto
          max-h-80
          rounded-md
          shadow-lg
          bg-white
          ring-black ring-opacity-5
          focus:outline-none
        "
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
        v-show="buttonIsOpen && !storeData.fetchingIsBusy"
      >
        <div class="py-2 px-2 text-gray-400">
          {{ menuTitle }}
        </div>
        <slot></slot>
      </fieldset>
      <div
        v-if="isAdvancedDropdown"
        v-show="buttonIsOpen"
        class="
          mf:z-50 mf:h-full mf:top-16 mf:fixed
          bg-white
          mf:w-full mf:right-0
          overflow-hidden
        "
      >
        <div class="hidden mf:m-3 mf:relative mf:flex mf:justify-end mf:pb-1">
          <close-mobile-menu
            v-on:click="buttonIsOpen = !buttonIsOpen"
            class="text-teal-light"
          />
        </div>
        <div
          :class="{
            // 'lm:transform lm:-translate-x-3/4': $route.name == 'BuyPage',
            'xlm:transform-none': $route.name !== 'BuyPage',
          }"
          class="
            h-full
            bg-white
            shadow-lg
            rounded-lg
            z-40
            text-base text-gray-600
            font-normal
            lm:w-96
            lm:top-14
            lm:h-96
            lm:absolute
            lm:transform
            lm:-translate-x-3/4
          "
        >
          <slot name="moreAdvancedButtons"></slot>
          <div
            class="
              w-full
              absolute
              md:bottom-0
              bottom-16
              px-4
              py-2
              bg-white
              lm:rounded-lg
            "
          >
            <button
              v-on:click="saveSearchCallback"
              type="button"
              class="
                w-full
                my-2
                bg-white
                border
                p-2
                border-teal-light
                text-teal text-sm
                font-semibold
                rounded-lg
                hover:bg-teal-lighter hover:border-teal
                focus:bg-teal focus:text-white focus:border-teal
              "
            >
              Save Search
            </button>
            <button
              v-on:click="buttonIsOpen = !buttonIsOpen"
              type="button"
              class="
                w-full
                my-2
                bg-teal
                p-2
                border border-teal-light
                text-white text-sm
                font-semibold
                rounded-lg
                hover:bg-teal-lighter hover:text-teal hover:border-teal
                focus:bg-teal focus:text-white focus:border-teal
              "
            >
              {{ storeData.fetchingIsBusy ? "Loading ..." : "View Homes" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>
<script>
import { ref, computed, onMounted, onUnmounted, inject } from "vue";
import { useStore } from "vuex";
import { ChevronDown, CloseMobileMenu, FilterIcon } from "@/assets/icons";
import { ButtonSlot } from "@/components/buttonui";
import settingsData from "@/api/settingsData.json";

// import { useOnClickOutside } from "@/helper";
export default {
  // Button title from the parent
  inheritAttrs: false,
  props: {
    buttonTitle: String,
    menuTitle: String,
    filterActivated: Boolean,
    filterMoreActivated: Boolean,
    isAdvancedDropdown: Boolean,
  },
  components: {
    ButtonSlot,
    ChevronDown,
    CloseMobileMenu,
    FilterIcon,
  },
  setup() {
    const buttonIsOpen = ref(false);
    const store = useStore();
    const { saveSearchCallback } = inject("provider");
    const fieldSetRef = ref(null);
    const menuRef = ref(null);
    const storeData = computed(() => store.getters.getStore);
    const routeNames = [...settingsData.routeNames];
    const isBuyPage = computed(() =>
      storeData.value.activeRoutePath == routeNames[0].id ? true : false
    );

    function listenerOnOutsideClick(event) {
      if (!fieldSetRef.value || fieldSetRef.value.contains(event.target)) {
        return;
      }
      if (menuRef.value.contains(event.target)) {
        return;
      }
      buttonIsOpen.value = false;
    }
    onMounted(() => {
      document.addEventListener("mousedown", listenerOnOutsideClick);
      document.addEventListener("touchstart", listenerOnOutsideClick);
    });
    onUnmounted(() => {
      document.removeEventListener("mousedown", listenerOnOutsideClick);
      document.removeEventListener("touchstart", listenerOnOutsideClick);
    });
    return {
      buttonIsOpen,
      storeData,
      fieldSetRef,
      menuRef,
      isBuyPage,
      saveSearchCallback,
    };
  },
};
</script>
