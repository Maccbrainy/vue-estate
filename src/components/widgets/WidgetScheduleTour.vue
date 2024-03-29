<template>
  <div class="relative my-4 w-full">
    <ul class="flex items-center justify-evenly">
      <li
        v-for="(title, arrayIndex) in ['In-Person', 'Video Chat']"
        :key="title"
        class="w-1/2 -mx-8"
      >
        <button
          v-on:click="getScheduleTourType(event, title, arrayIndex)"
          :id="title"
          type="button"
          class="
            flex
            justify-center
            items-center
            w-full
            text-base
            font-medium
            text-gray-700
            px-5
            py-2
            rounded-lg
            outline-none
            bg-gray-100
            hover:bg-gray-200
          "
        >
          <div
            :class="{
              'absolute w-1/2 py-2 h-full px-5 bg-white border rounded-lg':
                arrayIndex == buttonSelectionIndex,
              'transform translate-x-0': arrayIndex == 0,
            }"
          ></div>
          <span class="z-10">{{ title }}</span>
        </button>
      </li>
    </ul>
  </div>
  <widget-days-in-a-week-and-working-hours
    v-model="getDateAndTime"
  ></widget-days-in-a-week-and-working-hours>
  <form v-on:submit.prevent="submitForm">
    <contact-form-input
      v-model:data-value="getPhoneNumber"
      labelName="Phone"
      typeName="tel"
      placeholder="Your Phone Number"
      inputName="phone"
      warningInfo="Please enter a valid phone number"
      :isTextAreaType="false"
      :isInputType="true"
    >
    </contact-form-input>
    <contact-form-input
      v-model:data-value="getEmailAddress"
      labelName="Email"
      typeName="email"
      placeholder="Your Email Address"
      inputName="email"
      warningInfo="Please enter a valid email"
      :isTextAreaType="false"
      :isInputType="true"
    >
    </contact-form-input>
    <button
      type="submit"
      class="
        w-full
        border border-red-600
        bg-red-600
        px-4
        py-2
        mt-5
        rounded-lg
        font-bold
        text-base text-white
        hover:bg-transparent hover:text-red-600
      "
    >
      Schedule a Tour
    </button>
    <div class="text-xs text-teal pt-3">
      By pressing Schedule A Tour, you agree that Vue Estate and real estate
      professionals may contact you via phone/text about your inquiry, which may
      involve the use of automated means. You are not required to consent as a
      condition of purchasing any property, goods or services. Message/data
      rates may apply. You also agree to our Terms of Use Vue Estate does not
      endorse any real estate professionals
    </div>
  </form>
</template>
<script>
import { ref } from "vue";
import { format } from "date-fns";
import { setWorkingHoursRangeInADate } from "@/helper";
import ContactFormInput from "@/components/ContactFormInput.vue";
import { WidgetDaysInAWeekAndWorkingHours } from "@/components/widgets";

export default {
  name: "WidgetScheduleTour",
  props: {
    propertyName: {
      type: String,
      required: true,
    },
  },
  components: {
    ContactFormInput,
    WidgetDaysInAWeekAndWorkingHours,
  },
  setup(props) {
    let timeDate = setWorkingHoursRangeInADate(new Date());
    const getDateAndTime = ref(timeDate[0].date);
    const getPhoneNumber = ref("");
    const getEmailAddress = ref("");
    const buttonSelectionIndex = ref(0);
    const inPersonOrVideoChatScheduleType = ref("In-Person");

    const getScheduleTourType = (_, title, arrayIndex) => {
      if (inPersonOrVideoChatScheduleType.value == title) return;
      buttonSelectionIndex.value = arrayIndex;
      inPersonOrVideoChatScheduleType.value = title;
    };

    const submitForm = () => {
      let thisDate = getDateAndTime.value;
      const userData = {};
      let truthy =
        getPhoneNumber.value && getEmailAddress.value && getDateAndTime.value
          ? true
          : false;
      if (!truthy) {
        return;
      }
      userData.propertyInterest = `I am interested in ${props.propertyName}`;
      userData.scheduledTourType = inPersonOrVideoChatScheduleType.value;
      userData.scheduledDate = thisDate;
      userData.scheduledTourTime = format(new Date(thisDate), "hh:mm a");
      userData.phoneNumber = getPhoneNumber.value;
      userData.emailAddress = getEmailAddress.value;
    };

    return {
      getDateAndTime,
      getPhoneNumber,
      getEmailAddress,
      inPersonOrVideoChatScheduleType,
      buttonSelectionIndex,
      getScheduleTourType,
      submitForm,
    };
  },
};
</script>
