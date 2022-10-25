<template>
  <dropdown-button-options>
    <dropdown-button-option
      v-for="propertyOption in propertyOptions"
      v-bind:key="propertyOption.id"
    >
      <dropdown-button-option-check-box
        v-bind:checked="value.includes(propertyOption.id)"
        @update:checked="check(propertyOption.id, $event)"
        v-bind:fieldId="propertyOption.id"
        v-bind:label="propertyOption.id"
      >
        {{ propertyOption.title }}
      </dropdown-button-option-check-box>
    </dropdown-button-option>
  </dropdown-button-options>
</template>
<script>
// import { ref } from "vue";
// import { useStore } from "vuex";
import {
  // DropdownButton,
  DropdownButtonOptions,
  DropdownButtonOption,
  DropdownButtonOptionCheckBox,
} from "@/components/buttonui/index";
export default {
  name: "DropdownButtonMultiCheckBoxes",
  components: {
    // DropdownButton,
    DropdownButtonOptions,
    DropdownButtonOption,
    DropdownButtonOptionCheckBox,
  },
  props: {
    value: {
      type: Array,
    },
    propertyOptions: {
      type: Array,
      required: true,
    },
  },
  emits: ["update:value"],
  setup(props, context) {
    // const store = useStore();
    const check = (propertyOptionId, checked) => {
      let updatedValue = [...props.value];
      if (checked) {
        updatedValue.push(propertyOptionId);
      } else {
        updatedValue.splice(updatedValue.indexOf(propertyOptionId), 1);
      }
      context.emit("update:value", updatedValue);
    };
    return {
      check,
    };
  },
};
</script>
