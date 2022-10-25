<template>
  <div class="relative outline-none mt-1">
    <button
      v-show="!isChevronLeftVisibility == 0"
      v-on:click="moveSlide(-1)"
      class="absolute z-10 -left-2 transform translate-y-full"
    >
      <chevron-left
        class="
          text-gray-600
          w-5
          h-5
          p-1
          bg-white
          rounded-full
          shadow-md
          transform
          hover:scale-105
          active:bg-gray-300
        "
      />
    </button>
    <button
      v-show="isChevronLeftVisibility == 0 || isChevronRightVisibility"
      class="absolute z-10 -right-2 transform translate-y-full"
    >
      <chevron-right
        v-on:click="moveSlide(1)"
        class="
          text-gray-600
          w-5
          p-1
          bg-white
          h-5
          hover:scale-105
          rounded-full
          shadow-md
          transform
          active:bg-gray-300
        "
      />
    </button>
    <ul
      ref="dateContentWidthRef"
      class="overflow-hidden flex flex-row gap-2 flex-nowrap"
    >
      <li
        v-for="(date, index) in getTheDaysInAWeekRange"
        :key="date"
        v-bind:ref="(el) => (dateItemRefs[index] = el)"
      >
        <button
          v-on:click="getDateAndTime($event, date, index)"
          v-bind:value="date"
          v-bind:id="date"
          v-bind:class="{
            'border-2 border-teal-light hover:border-teal-light':
              index == isActiveDate,
            border: index != isActiveDate,
          }"
          class="
            border-gray-400
            w-14
            min-w-max
            rounded-lg
            bg-white
            h-auto
            text-gray-600 text-sm
            px-3
            py-1
            inline-block
            hover:bg-gray-100 hover:border-gray-200
          "
        >
          <div>{{ date.dayOfWeek }}</div>
          <div class="font-bold text-base">
            {{ date.dayOfMonth }}
          </div>
          <div>{{ date.month }}</div>
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, watchEffect } from "vue";
import { setTheDaysInAWeekRange, setWorkingHoursRangeInADate } from "@/helper";
export default {
  setup() {
    const dateContentWidthRef = ref(null);
    const dateItemRefs = ref([]);
    const getDateWorkingHours = ref([]);
    const getTheDaysInAWeekRange = ref([]);
    const isActiveDate = ref(0);

    const moveSlideDirectionIndex = ref(0);
    const isChevronLeftVisibility = ref(0);
    const isChevronRightVisibility = ref(true);

    getDateWorkingHours.value = setWorkingHoursRangeInADate(new Date());

    getTheDaysInAWeekRange.value = setTheDaysInAWeekRange();

    const moveSlide = (direction) => {
      let overAllScrollWidthLength = dateContentWidthRef.value.scrollWidth;
      let contentWidthTheVisibleArea = dateContentWidthRef.value.offsetWidth;
      // let contentWidthTheVisibleArea = dateContentWidthRef.value.clientWidth;
      if (direction === 1) {
        moveSlideDirectionIndex.value -= contentWidthTheVisibleArea;
      }
      if (direction === -1) {
        moveSlideDirectionIndex.value += contentWidthTheVisibleArea;
      }

      dateItemRefs.value.forEach((data) => {
        data.style.transform = `translateX(${moveSlideDirectionIndex.value}px)`;
      });

      isChevronLeftVisibility.value = moveSlideDirectionIndex.value;
      //moveSlideDirectionIndex is a negative value, it is the scrollBy amount
      // thus convert to a positive value;
      let setMoveSlideDirectionIndexToPositiveValue =
        -moveSlideDirectionIndex.value;
      //Remainder of scroll length width after content is scrolled;
      let remainderOfOverAllScrollWidthLength =
        overAllScrollWidthLength - setMoveSlideDirectionIndexToPositiveValue;
      //Show the chevronRight Icon when the remaining scroll length width is greater
      //than the Visible area of the contentWidth or otherwise;
      isChevronRightVisibility.value =
        remainderOfOverAllScrollWidthLength > contentWidthTheVisibleArea
          ? true
          : false;
    };

    const getDateAndTime = (_, date, index) => {
      isActiveDate.value = index;
      getDateWorkingHours.value = setWorkingHoursRangeInADate(date.rawDate);
      return;
    };

    watchEffect(() => {
      console.log("Get Working Hours", getDateWorkingHours.value);
    });

    return {
      dateContentWidthRef,
      dateItemRefs,
      getDateWorkingHours,
      getTheDaysInAWeekRange,
      isActiveDate,
      moveSlideDirectionIndex,
      isChevronLeftVisibility,
      isChevronRightVisibility,
      moveSlide,
      getDateAndTime,
    };
  },
};
</script>
