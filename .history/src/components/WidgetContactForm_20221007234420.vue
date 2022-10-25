<template>
  <form v-on:submit.prevent="onSubmit">
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
  </form>
</template>
<script>
import { ref } from "vue";
import ContactFormInput from "@/components/ContactFormInput.vue";

export default {
  name: "WidgetContactForm",
  components: {
    ContactFormInput,
  },
  setup() {
    const getFirstAndLastName = ref("");
    const getPhoneNumber = ref("");
    const getEmailAddress = ref("");
    const getMessage = ref(
      "I am interested in this property and would like to schedule a viewing. Please let me know when this would be possible."
    );
    return { getFirstAndLastName, getPhoneNumber, getEmailAddress, getMessage };
  },
};
</script>
