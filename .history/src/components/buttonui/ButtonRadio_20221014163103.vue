<template>
  <div
    v-on:click="checkerHandler"
    v-bind:value="value"
    @update="$emit('update:value', $event)"
    class="px-2 pb-2 mt-1 flex items-center cursor-pointer"
  >
    <div
      v-bind:class="{ 'pl-5 bg-teal border-teal': value }"
      class="
        bg-white
        relative
        ml-1
        border-2 border-gray-400
        w-9
        flex
        justify-start
        items-center
        h-5
        rounded-xl
        overflow-visible
      "
    >
      <div
        v-bind:class="{ 'border border-gray-100': value }"
        class="
          bg-white
          -ml-1
          absolute
          h-5
          w-5
          rounded-full
          border-2 border-gray-400
        "
      ></div>
    </div>
    <span class="px-3"><slot></slot></span>
  </div>
</template>
<script>
export default {
  name: "ButtonRadio",
  props: ["value"],
  emits: ["update:value"],
  setup(props, context) {
    const checkerHandler = () => {
      context.emit("update:value", props.value);
    };
    return {
      checkerHandler,
    };
  },
};
</script>
