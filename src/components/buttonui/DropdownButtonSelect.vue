<template>
  <select
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="
      inline-flex
      w-full
      justify-center
      rounded-md
      shadow-sm
      px-3
      py-2
      bg-white
      focus:outline-none
      focus:ring
      focus:ring-offset-2
      focus:ring-offset-white
      focus:ring-teal-light
      border border-gray-500
    "
  >
    <slot></slot>
  </select>
</template>
<script>
export default {
  props: ["modelValue"],
  emits: ["update:modelValue"],
};
</script>
