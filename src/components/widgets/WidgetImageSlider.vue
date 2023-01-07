<template>
  <div
    ref="carousalChamberRef"
    v-on:mouseenter="isHover = true"
    v-on:mouseleave="isHover = false"
    v-bind:class="{
      'animate-pulse bg-gray-200': storeData.fetchingIsBusy,
    }"
    class="
      relative
      flex
      w-full
      h-44
      flex-nowrap
      justify-start
      items-center
      rounded-xl
      overflow-hidden
    "
  >
    <div
      v-if="listingPhotosIsAString"
      class="w-full h-full min-w-full"
    >
      <router-link
        :to="{
          name: routeName,
          params: {
            slug: stateCode,
            city: cityName,
            address: addressLocation,
            propertyId: propertyIdCode,
            postalCode: postalAddressCode,
          },
        }"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          v-if="!storeData.fetchingIsBusy"
          v-bind:src="listingPhotos"
          alt=""
          class="
            w-full
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
    </div>
    <div
      v-for="(photo, index) in listingImages"
      :key="photo[index]"
      v-bind:ref="(el) => (slideItemRef[index] = el)"
      :class="{
        'animate-pulse bg-gray-200': storeData.fetchingIsBusy,
      }"
      class="w-full h-full min-w-full"
      v-else
    >
      <router-link
        :to="{
          name: routeName,
          params: {
            slug: stateCode,
            city: cityName,
            address: addressLocation,
            propertyId: propertyIdCode,
            postalCode: postalAddressCode,
          },
        }"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          v-if="!storeData.fetchingIsBusy"
          v-bind:src="photo.href"
          alt=""
          class="
            w-full
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
    </div>

    <span
      v-for="navigation in slideNavigations"
      :key="navigation.id"
      v-show="isHover && !listingPhotosIsAString"
      v-on:click="slideHandle(navigation.id)"
      :class="{
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
    <!-- <span
      class="
        absolute
        w-full
        h-10
        flex flex-row flex-nowrap
        justify-center
        items-center
        gap-1
        bg-black
        text-white
        bottom-0
        overflow-hidden
      "
    >
      <div
        class="bg-white w-2 h-2 rounded-full"
        v-for="indicator in carousalIndicators"
        :key="indicator"
      ></div>
    </span> -->
  </div>
</template>
<script>
import { computed, ref, onMounted } from "vue";
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
    const carousalChamberRef = ref(null);
    const slideItemRef = ref([]);
    const slideCounter = ref(0);
    const slideMoveSize = ref(0);
    const storeData = computed(() => store.getters.getStore);


    const listingPhotosIsAString = computed(() =>
      typeof props.listingPhotos === "string" ? true : false
    );
    const listingImages = computed(() =>
      typeof props.listingPhotos === "string"
        ? [...props.listingPhotos]
        : props.listingPhotos
    );

    const isDefaultImage = computed(() =>
      listingImages.value.length < 1 ? true : false
    );

    const carousalIndicators = computed(() => {
      let indicators = [];
      for (let i = 0; i < props.listingPhotos.length; i++) {
        indicators[i] = i;
      }
      return indicators;
    });

    const slideHandle = (direction) => {
      // const carousalChamberRef = carousalChamberRef;
      const clientWidth  = slideItemRef.value[0].clientWidth;
      if (direction == "right") {
        slideCounter.value++;
        slideMoveSize.value -= clientWidth;
        if (slideCounter.value >= slideItemRef.value.length) {
          setTimeout(() => {
            slideItemRef.value.forEach((item) => {
              item.style.transition = `none`;
              item.style.transform = `translateX(${
                slideCounter.value * clientWidth
              }px)`;
            });

            slideCounter.value = 0;
            slideMoveSize.value = 0;
          }, 300);
          return;
        }
      }
      if (direction == "left") {
        slideCounter.value--;
        slideMoveSize.value += clientWidth;
        if (slideCounter.value < 0) {
          slideCounter.value = slideItemRef.value.length - 1;
          slideMoveSize.value = -(slideCounter.value * clientWidth);

          setTimeout(() => {
            slideItemRef.value.forEach((item) => {
              item.style.transition = `none`;
              item.style.transform = `translateX(${slideMoveSize.value}px)`;
            });
          }, 300);
          return;
        }
      }
      slideItemRef.value.forEach((item) => {
        item.style.transition = `all 0.5s ease-in-out`;
        item.style.transform = `translateX(${slideMoveSize.value}px)`;
      });
    };
    const tieBeginingAndEndSlideItemsTogether = () => {
      if (!listingPhotosIsAString.value && props.listingPhotos.length > 0) {
        carousalChamberRef.value.insertAdjacentHTML(
          "afterbegin",
          slideItemRef.value[slideItemRef.value.length - 1].outerHTML
        );
        carousalChamberRef.value.insertAdjacentHTML(
          "beforeend",
          slideItemRef.value[0].outerHTML
        );
      }
    };
    onMounted(() => {
      tieBeginingAndEndSlideItemsTogether();
    });
    return {
      isDefaultImage,
      listingImages,
      listingPhotosIsAString,
      isHover,
      storeData,
      slideNavigations,
      slideHandle,
      carousalIndicators,
      carousalChamberRef,
      slideItemRef,
      slideCounter,
      slideMoveSize,
      tieBeginingAndEndSlideItemsTogether,
    };
  },
};
</script>
