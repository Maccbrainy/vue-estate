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
      v-show="isChevronRightVisibility"
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
      class="overflow-hidden flex flex-row gap-2 flex-nowrap w-full"
    >
      <li
        v-for="(date, index) in getTheDaysInAWeekRange"
        :key="date"
        v-bind:ref="(el) => (dateItemRefs[index] = el)" class="flex-1"
      >
        <button
          v-on:click="getTheDayInformation($event, date, index)"
          v-bind:value="date"
          v-bind:id="date"
          v-bind:class="{
            'border-2 border-teal-light hover:border-teal-light':
              index == isActiveDate,
            border: index != isActiveDate,
          }"
          class="
            border-gray-400
            w-full
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
    <div class="pt-4">
      <div
        v-bind:class="{
          'outline-none ring ring-offset-1 ring-offset-white ring-teal-light':
            focused,
        }"
        class="
          relative
          border border-gray-500
          rounded-lg
          h-auto
          overflow-hidden
        "
      >
        <label
          for="Time"
          v-show="focused || modelValue"
          class="
          bg-white
            absolute
            w-full
            left-4
            font-semibold
            text-xs text-gray-700
            z-10
            pt-px
            bg-transparent
          "
          >Time</label
        >
        <select
          v-bind:value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          v-on:focus="focused = true"
          v-on:blur="focused = false"
          placeholder="Select time"
          class="
            outline-none
            w-full
            h-full
            bg-transparent
            py-5
            px-4
            font-semibold
            text-gray-600
          "
        >
          <option
            v-for="date in getDateWorkingHours"
            v-bind:key="date.date"
            v-bind:value="date.date"
          >
            {{ date.time }}
          </option>
        </select>
      </div>
      <div
        v-show="!focused && !modelValue"
        class="flex text-red-600 text-xs p-px items-center"
      >
        <information-icon />
        <span class="px-1">Select your choice of your tour time</span>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { setTheDaysInAWeekRange, setWorkingHoursRangeInADate } from "@/helper";
import { ChevronRight, ChevronLeft, InformationIcon } from "@/assets/icons";
export default {
  name: "WidgetDaysInAWeekAndWorkingHours",
  props: ['modelValue'],
  components: {
    ChevronRight,
    ChevronLeft,
    InformationIcon
  },
  emits: ['update:modelValue', 'update:focused'],
  setup(_, context) {
    const focused = ref(null);
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
      let containerWidthVisibleArea = dateContentWidthRef.value.offsetWidth;
      // let containerWidthVisibleArea = dateContentWidthRef.value.clientWidth;
      if (direction === 1) {
        moveSlideDirectionIndex.value -= containerWidthVisibleArea;
      }
      if (direction === -1) {
        moveSlideDirectionIndex.value += containerWidthVisibleArea;
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
      //than the Visible area of the contentWidth or otherwise hide chevronRight Icon;
      isChevronRightVisibility.value =
        remainderOfOverAllScrollWidthLength > containerWidthVisibleArea
          ? true
          : false;
    };

    const getTheDayInformation = (_, date, index) => {
      isActiveDate.value = index;
      getDateWorkingHours.value = setWorkingHoursRangeInADate(date.rawDate);
      context.emit('update:modelValue', getDateWorkingHours.value[0].date);
      return;
    };

    onMounted(() => {
      let contentScrollWidth = dateContentWidthRef.value.scrollWidth;
      let containerWidthVisibleArea = dateContentWidthRef.value.clientWidth;

      setTimeout(() => {
        if (getTheDaysInAWeekRange.value.length > 0){
          isChevronRightVisibility.value =
            containerWidthVisibleArea >= contentScrollWidth ? false : true;
          console.log("Client Width:", containerWidthVisibleArea);
          console.log("Scroll Width:", contentScrollWidth);
        }
        
      }, 10000);

    })

    return {
      focused,
      dateContentWidthRef,
      dateItemRefs,
      getDateWorkingHours,
      getTheDaysInAWeekRange,
      isActiveDate,
      moveSlideDirectionIndex,
      isChevronLeftVisibility,
      isChevronRightVisibility,
      moveSlide,
      getTheDayInformation,
    };
  },
};
</script>
