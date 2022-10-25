<template>
  <div class="px-2">
    <input
      type="search"
      v-on:focus="focused = true"
      v-on:blur="focused = false"
      v-bind:placeholder="placeholder"
      v-bind:value="searchText"
      @input="$emit('update:searchText', $event.target.value)"
      class="
        inline-flex
        w-full
        justify-center
        rounded-md
        border border-gray-500
        shadow-sm
        px-3
        py-2
        bg-white
        focus:outline-none
        focus:ring
        focus:ring-offset-2
        focus:ring-offset-white
        focus:ring-teal-light
      "
    />
    <!-- <p v-show="!isANumber" class="text-sm font-thin italic">Must be a number</p> -->
  </div>
</template>
<script>
import { watchEffect, ref } from "vue";
export default {
  props: {
    placeholder: {
      type: String,
    },
    searchText: [String, Number],
    isANumber: {
      type: Boolean,
    },
  },
  emits: ["update:searchText", "update:inFocus"],
  setup(_, context) {
    const focused = ref(null);
    watchEffect(() => {
      context.emit("update:inFocus", focused.value);
      // console.log("isANUmberProp:", props.isANumber);
    });
    return { focused };
  },
};
</script>
