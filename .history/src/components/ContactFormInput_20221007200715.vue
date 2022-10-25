<template>
  <div class="pt-4">
    <div
      v-bind:class="{
        'outline-none ring ring-offset-2 ring-offset-white ring-teal-light':
          focused,
      }"
      class="relative border border-gray-500 rounded-lg h-auto overflow-hidden"
    >
      <label
        v-show="focused || getContactValue"
        class="
          absolute
          text-gray-400
          left-4
          font-semibold
          text-xs text-gray-700
          z-10
          pt-px
        "
        >Phone</label
      >
      <input
        v-on:focus="focused = true"
        v-on:blur="focused = false"
        v-bind:placeholder="focused ? 'Your Phone Number' : 'Phone'"
        v-bind:value="dataValue"
        @input="$emit('update:dataValue', $event.target.value)"
        type="tel"
        name="phone"
        class="outline-none w-full h-full bg-transparent py-5 px-4"
      />
    </div>
    <div
      v-show="!focused && focusedCount > 0 && !getContactValue"
      class="flex text-red-600 text-xs p-1 items-center"
    >
      <information-icon />
      <span class="px-1">Please enter a valid phone number.</span>
    </div>
  </div>
</template>
<script>
import { ref, watchEffect } from "vue";
export default {
  name: "ContactFormInput",
  emits: ['update:dataValue', 'update:inFocus'],
  setup(_, context) {
    const getContactValue = ref("");
    const focused = ref(null);
    const focusedCount = ref(0);

    watchEffect(() => {
      context.emit('update:inFocus', focused);
      if (focused.value){
        focusedCount.value++;
      }
    });
    return {
      focused,
      focusedCount,
      getContactValue,
    };
  },
};
</script>
