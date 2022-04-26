<template>
  <div>
    <label :for="forAttr">
      <div class="flex flex-row items-center h-6 cursor-pointer">
        <input
          v-model="checkedHomeType" 
          type="checkbox"
          v-bind="$attrs" 
          class="inline-block h-4 w-6 text-teal border border-gray-200 rounded" 
          true-value="yes" 
          false-value="no">
        <div class="ml-2"><slot></slot></div>
      </div>
    </label>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  inheritAttrs: false,
  setup(props, ctx) {
    // fallthrough attributes are exposed as ctx.attrs
    const forAttr = ref(ctx.attrs.id);
    const checkedHomeType = ref([]);
    return {
      forAttr,
      checkedHomeType
    }
  }
}
</script>