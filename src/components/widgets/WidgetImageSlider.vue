<template>
  <div
    v-on:mouseenter="isHover = true"
    v-on:mouseleave="isHover = false"
    v-bind:class="{
      'animate-pulse': storeData.fetchingIsBusy,
    }"
    class="
      relative
      flex
      w-full
      h-44
      bg-gray-200
      flex-nowrap
      justify-start
      items-center
      rounded-xl
      overflow-hidden
    "
  >
    <router-link
      :to="{
        name: routeName,
        params: {
          slug: stateCode,
          city: cityName,
          address: addressLocation,
          propertyId: propertyIdCode,
          zipCode: postalAddressCode,
        },
      }"
      target="_blank"
      rel="noopener noreferrer"
      ref="slideContainer"
      class="
        hide-horizontal__scrollbar
        flex flex-row flex-nowrap
        w-full
        h-full
        min-w-full
        overflow-x-auto
        snap-x snap-mandatory
      "
    >
      <img
        v-show="!storeData.fetchingIsBusy"
        v-for="(photo, index) in listingImages"
        :key="photo[index]"
        v-bind:ref="(el) => (slideItemRef[index] = el)"
        v-bind:src="photo.href"
        alt=""
        class="
          snap-always snap-center
          w-full
          min-w-full
          flex-initial
          h-full
          object-center object-cover
          transform
          delay-300
          duration-300
          ease-in
          hover:scale-105
          cursor-pointer
        "
      />
    </router-link>
    <span
      v-for="navigation in slideNavigations"
      :key="navigation.id"
      v-show="
        (isHover && $route.name === 'RentPage') ||
        (isHover && $route.name === 'RentsNearMe')
      "
      v-on:click="slideHandle(navigation.id)"
      :class="{
        hidden: slideCounter == 0 && navigation.id == 'left',
        'left-0': navigation.id == 'left',
        'right-0': navigation.id == 'right',
      }"
      class="
        absolute
        w-10
        h-full
        inline-flex
        justify-center
        items-center
        bg-transparent
        top-0
        z-10
        cursor-pointer
      "
      ><component
        class="p-0.5 text-gray-100"
        :is="navigation.icon"
        :title="navigation.name"
      ></component
    ></span>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { ChevronRight, ChevronLeft } from "@/assets/icons";
import { useStore } from "vuex";
export default {
  name: "WidgetImageSlider",
  props: {
    routeName: {
      type: String,
    },
    stateCode: {
      type: String,
    },
    cityName: {
      type: String,
    },
    addressLocation: {
      type: String,
    },
    propertyIdCode: {
      type: String,
    },
    postalAddressCode: {
      type: String,
    },
    listingPhotos: {
      type: [Object, Array, String],
    },
    maxVisibleIndicator: {
      type: Number,
      required: false,
      default: 6,
    },
  },
  components: {
    ChevronRight,
    ChevronLeft,
  },
  setup(props) {
    const slideNavigations = [
      {
        id: "left",
        name: "Left Arrow",
        icon: ChevronLeft,
      },
      {
        id: "right",
        name: "Right Arrow",
        icon: ChevronRight,
      },
    ];
    const store = useStore();
    const isHover = ref(null);
    const slideContainer = ref(null);
    const slideItemRef = ref([]);
    const slideCounter = ref(0);
    const storeData = computed(() => store.getters.getStore);

    const listingImages = computed(() =>
      typeof props.listingPhotos === "string"
        ? [{ href: props.listingPhotos.split() }]
        : props.listingPhotos
    );

    const carousalIndicators = computed(() => {
      let indicators = [];
      for (let i = 0; i < props.listingPhotos.length; i++) {
        indicators[i] = i;
      }
      return indicators;
    });

    const slideHandle = (direction) => {
      const { offsetWidth } = slideContainer.value.$el;
      let scrollBySize;

      if (direction == "right") {
        slideCounter.value++;
        scrollBySize = offsetWidth;
      }
      if (direction == "left") {
        scrollBySize = -offsetWidth;
        slideCounter.value--;
      }
      slideContainer.value.$el.scrollBy({
        top: 0,
        left: scrollBySize,
        behavior: "smooth",
      });
    };
    return {
      isHover,
      storeData,
      slideNavigations,
      slideHandle,
      carousalIndicators,
      slideContainer,
      slideItemRef,
      slideCounter,
      listingImages,
    };
  },
};
</script>
<style scoped>
.hide-horizontal__scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-horizontal__scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
