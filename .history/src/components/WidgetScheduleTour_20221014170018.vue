<template>
  <div class="relative my-4 w-full">
    <ul class="flex items-center justify-evenly">
      <li
        v-for="title in ['In-Person', 'Video Chat']"
        :key="title"
        class="w-1/2 -mx-8"
      >
        <button
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
            bg-gray-100 hover:bg-gray-200
          "
        >
          <div
            :class="{'absolute bg-white border left-0': title == `Video Chat`}"
            class=" w-1/2 py-2 h-full px-5 rounded-lg"
          ></div>
          <span class="z-10">{{title}}</span>
        </button>
      </li>
    </ul>
  </div>
  <WidgetDaysInAWeekAndWorkingHours
    v-model="getDateAndTime"
  ></WidgetDaysInAWeekAndWorkingHours>
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
import WidgetDaysInAWeekAndWorkingHours from "@/components/WidgetDaysInAWeekAndWorkingHours.vue";

export default {
  name: "WidgetScheduleTour",
  components: {
    ContactFormInput,
    WidgetDaysInAWeekAndWorkingHours,
  },
  setup() {
    let timeDate = setWorkingHoursRangeInADate(new Date());
    const getDateAndTime = ref(timeDate[0].date);
    const getPhoneNumber = ref("");
    const getEmailAddress = ref("");

    const submitForm = () => {
      let thisDate = getDateAndTime.value;
      const userData = {};
      let truthy = getPhoneNumber.value && getEmailAddress.value ? true : false;
      if (!truthy) {
        return;
      }
      userData.phoneNumber = getPhoneNumber.value;
      userData.emailAddress = getEmailAddress.value;
      userData.scheduledDate = thisDate;
      userData.scheduledTourTime = format(new Date(thisDate), "hh:mm a");
      console.log("Your Info:", userData);
    };

    return {
      getDateAndTime,
      getPhoneNumber,
      getEmailAddress,
      submitForm,
    };
  },
};
</script>
