<template>
  <fieldset class="pt-3">
    <div class="py-2 px-2 text-gray-400">
      {{ fieldsetTitle }}
    </div>
    <slot></slot>
  </fieldset>
</template>
<script>
export default {
  props: {
    fieldsetTitle: [String, Number],
  },
};
</script>
