<template>
  <div class="pt-4">
    <div
      v-bind:class="{
        'outline-none ring ring-offset-1 ring-offset-white ring-teal-light':
          focused,
      }"
      class="
        w-full
        relative
        border border-gray-500
        rounded-lg
        h-auto
        overflow-hidden
      "
    >
      <label
        v-bind:for="labelName"
        v-show="focused || dataValue"
        v-bind:class="{ 'bg-white w-full': isTextAreaType }"
        class="
          absolute
          w-full
          left-4
          font-semibold
          text-xs text-gray-700
          z-10
          pt-px
          bg-transparent
        "
        >{{ labelName }}</label
      >
      <input
        v-if="isInputType"
        v-on:focus="focused = true"
        v-on:blur="focused = false"
        v-bind:placeholder="focused ? `${placeholder}` : `${labelName}`"
        v-bind:value="dataValue"
        @input="$emit('update:dataValue', $event.target.value)"
        v-bind:type="typeName"
        v-bind:name="inputName"
        class="outline-none w-full h-full bg-transparent py-5 px-4"
        required
      />
      <textarea
        v-if="isTextAreaType"
        v-on:focus="focused = true"
        v-on:blur="focused = false"
        v-bind:placeholder="focused ? `${placeholder}` : `${labelName}`"
        v-bind:value="dataValue"
        @input="$emit('update:dataValue', $event.target.value)"
        v-bind:type="typeName"
        v-bind:name="inputName"
        class="
          w-full
          h-20
          outline-none
          bg-transparent
          py-5
          px-4
          overflow-y-auto
        "
      ></textarea>
    </div>
    <div
      v-show="!focused && focusedCount > 0 && !dataValue"
      class="flex text-red-600 text-xs p-px items-center"
    >
      <information-icon />
      <span class="px-1">{{ warningInfo }}</span>
    </div>
  </div>
</template>
<script>
import { ref, watchEffect } from "vue";
import { InformationIcon } from "@/assets/icons";
export default {
  name: "ContactFormInput",
  props: {
    dataValue: {
      type: [String, Number],
    },
    labelName: {
      type: String,
    },
    typeName: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    inputName: {
      type: String,
    },
    warningInfo: {
      type: String,
    },
    isTextAreaType: {
      type: Boolean,
      required: true,
    },
    isInputType: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    InformationIcon,
  },
  emits: ["update:dataValue", "update:focused"],
  setup(props, context) {
    const focused = ref(null);
    const focusedCount = ref(0);

    watchEffect(() => {
      context.emit("update:dataValue", props.dataValue);
      if (focused.value) {
        focusedCount.value++;
      }
    });
    return {
      focused,
      focusedCount,
    };
  },
};
</script>
