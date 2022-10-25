<template>
  <form v-on:submit.prevent="onSubmit">
    <WidgetDaysInAWeekAndWorkingHours
      v-model="getDateAndTime"
    ></WidgetDaysInAWeekAndWorkingHours>
    <div class="flex gap-2">
      <contact-form-input
        v-model:data-value="getFirstAndLastName"
        labelName="Name"
        typeName="text"
        placeholder="Your Name"
        inputName="name"
        warningInfo="Please enter your first and last name"
        :isTextAreaType="false"
        :isInputType="true"
      >
      </contact-form-input>
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
    </div>
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
    <contact-form-input
      v-model:data-value="getMessage"
      labelName="Message"
      typeName="text"
      placeholder=""
      inputName="Message"
      warningInfo="Please enter a message"
      :isTextAreaType="true"
      :isInputType="false"
    ></contact-form-input>
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
      Check Availability
    </button>
    <div class="text-xs text-teal pt-3">You agree to Vue Estate Terms of Use & Privacy Policy By choosing to contact a property, you also agree that property managers may call or text you about any inquiries you submit through our services, which may involve use of automated means and prerecorded/artificial voices. You don't need to consent as a condition of renting any property, or buying any other goods or services. Message/data rates may apply.</div>
  </form>
</template>
<script>
import { ref } from "vue";
import { setWorkingHoursRangeInADate } from "@/helper";
import ContactFormInput from "@/components/ContactFormInput.vue";
import WidgetDaysInAWeekAndWorkingHours from "@/components/WidgetDaysInAWeekAndWorkingHours.vue";

export default {
  name: "WidgetContactForm",
  components: {
    ContactFormInput,
    WidgetDaysInAWeekAndWorkingHours
  },
  setup() {
    const getDateAndTime = ref(setWorkingHoursRangeInADate(new Date()));
    const getFirstAndLastName = ref("");
    const getPhoneNumber = ref("");
    const getEmailAddress = ref("");
    const getMessage = ref(
      "I am interested in this property and would like to schedule a viewing. Please let me know when this would be possible."
    );
    const onSubmit = () => {
      let truthy =
        getFirstAndLastName.value &&
        getPhoneNumber.value &&
        getEmailAddress.value &&
        getMessage.value
          ? true
          : false;
      if (!truthy) {
        return;
      }
      const userData = {};
      userData.fullName = getFirstAndLastName.value;
      userData.phoneNumber = getPhoneNumber.value;
      userData.emailAddress = getEmailAddress.value;
      userData.message = getMessage.value;
      userData.date = getDateAndTime.value.date;
      userData.tourTime = getDateAndTime.value.time;
      console.log("Your Info:", userData);
    };

    return {
      getDateAndTime,
      getFirstAndLastName,
      getPhoneNumber,
      getEmailAddress,
      getMessage,
      onSubmit,
    };
  },
};
</script>
