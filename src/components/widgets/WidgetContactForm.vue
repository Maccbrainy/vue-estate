<template>
  <form v-on:submit.prevent="submitForm">
    <div
      v-if="$route.name == 'RentPage'"
      class="flex flex-row gap-3 text-gray-500 py-3"
    >
      <div class="h-20 w-20 rounded-xl overflow-hidden">
        <img
          class="object-center object-cover h-full w-full"
          :src="propertyDetail.photo"
        />
      </div>
      <div class="flex flex-col text-sm">
        <span>{{ propertyDetail.address }}</span>
        <span>{{ propertyDetail.city }}</span>
        <span>{{ propertyDetail.price }}</span>
      </div>
    </div>
    <div class="flex mf:flex-col lm:flex-row gap-2">
      <contact-form-input
        class="w-full"
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
        class="w-full"
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
      Check availability
    </button>
    <div
      v-if="$route.name == 'SalesPageDetail' || $route.name == 'RentPageDetail'"
      class="text-xs text-teal pt-3"
    >
      You agree to Vue Estate Terms of Use & Privacy Policy By choosing to
      contact a property, you also agree that property managers may call or text
      you about any inquiries you submit through our services, which may involve
      use of automated means and prerecorded/artificial voices. You don't need
      to consent as a condition of renting any property, or buying any other
      goods or services. Message/data rates may apply.
    </div>
  </form>
</template>
<script>
import { ref } from "vue";
import ContactFormInput from "@/components/ContactFormInput.vue";

export default {
  name: "WidgetContactForm",
  props: {
    propertyName: {
      type: String,
      required: true,
    },
    propertyDetail: {
      type: Object,
      required: false,
    },
  },
  components: {
    ContactFormInput,
  },
  setup(props) {
    const getFirstAndLastName = ref("");
    const getPhoneNumber = ref("");
    const getEmailAddress = ref("");
    const getMessage = ref(
      `I am interested in ${props.propertyName} and would like to schedule a viewing. Please let me know when this would be possible.`
    );

    const submitForm = () => {
      const userData = {};
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
      userData.fullName = getFirstAndLastName.value;
      userData.phoneNumber = getPhoneNumber.value;
      userData.emailAddress = getEmailAddress.value;
      userData.message = getMessage.value;
    };

    return {
      getFirstAndLastName,
      getPhoneNumber,
      getEmailAddress,
      getMessage,
      submitForm,
    };
  },
};
</script>
