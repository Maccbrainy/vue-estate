<template>
  <li>
    <div class="mr-2">
      <button 
        type="button"
        ref="menubutton"
        class="
          z-30
          inline-flex
          justify-center 
          w-full 
          rounded-md 
          border border-gray-300 
          shadow-sm 
          px-4 
          py-2 
          bg-white 
          text-base 
          font-medium 
          text-gray-700
          hover:bg-gray-200 
          active:bg-gray-400"
        v-on:click="toggleButtonOpenClose">
        {{ buttonTitle}}
        <chevron-down v-bind:class="{ 'transform rotate-180': buttonIsOpen }" />
      </button>
      <fieldset
        class="
          overflow-auto
          z-30
          origin-top-right 
          absolute 
          pb-2 
          mt-1
          w-72
          max-h-64
          rounded-md 
          shadow-lg 
          bg-white 
          ring-black ring-opacity-5 
          focus:outline-none"
        role="menu" 
        aria-orientation="vertical" 
        aria-labelledby="menu-button" 
        tabindex="-1"
        v-show="buttonIsOpen">
        <div class="py-2 px-2 text-gray-400">
          {{menuTitle}}
        </div>
        <slot></slot>
      </fieldset>
    </div>  
  </li>
</template>
<script>
import { ref } from 'vue';
import ChevronDown from "@/assets/icons/ChevronDown.vue";
export default {
  // Button title from the parent
  props: ["buttonTitle", "menuTitle"],
  components:{
    ChevronDown,
  },
  setup() {
    const buttonIsOpen = ref(false)
    return {
      buttonIsOpen,
    }
  },
  methods: {
    toggleButtonOpenClose(){
      //Toggle between open or closed ( true || false )
      // const closeButtonToggleListener = (e) => {
      //   if (this.catchOutsideClick(e, this.$refs.menubutton)) {
      //     window.removeEventListener  ('click', closeButtonToggleListener)
      //     this.buttonIsOpen = false;
      //   }
      // };
      // const closeButtonToggleListener = ($event) => {
      //   console.log("Window clicked", $event);
      // }
      // window.addEventListener ('click', closeButtonToggleListener)
      this.buttonIsOpen = !this.buttonIsOpen;
    },
    // catchOutsideClick(event, button){
    //   if (button == event.target){
    //     return false;
    //   }
    //   if (this.buttonIsOpen && button != event.target) {
    //     return true;
    //   };
    // }
  }
}
</script>