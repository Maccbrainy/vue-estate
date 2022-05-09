<template>
  <div>
    <label :for="label">
      <div class="flex flex-row items-center h-6 cursor-pointer">
        <input
          type="checkbox"
          :checked="checked"
          :id="fieldId"
          @input="$emit('update:checked', $event.target.checked)"
          class="hidden">
        <div v-if="checked" class="flex items-center">
          <checked-box-icon />
          <div class="ml-2"><slot></slot></div>
        </div>
        <div class="flex items-center" v-else>
          <check-box-icon />
          <div class="ml-2"><slot></slot></div>
        </div>
      </div>
    </label>
  </div>
</template>
<script>
import CheckBoxIcon from "@/assets/icons/CheckBoxIcon.vue";
import CheckedBoxIcon from "@/assets/icons/CheckedBoxIcon.vue";
export default {
  // props: ['modelValue'],
  props: {
    checked: {
      type: Boolean
    },
    fieldId: {
      type: String,
      required: true
    },
    label: String,
  },
  emits: ['update:checked'],
  components: {
    CheckBoxIcon,
    CheckedBoxIcon
  }
}
</script>
