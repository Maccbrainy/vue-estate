<template>
  <li>
    <div class="mr-2">
      <button-slot 
        v-bind:class="{ 
          'bg-gray-100': isLoading 
        }" 
        v-on:click="toggleButtonOpenClose" 
        :disabled="isLoading">
        <span 
          v-show="filterActivated" 
          class="my-auto w-3 h-3 rounded-full bg-teal mr-2"></span>
        <span 
          v-bind:class="{
            'text-gray-400': isLoading 
          }">
          {{ buttonTitle }}
        </span>
        <chevron-down 
          v-bind:class="{
            'transform rotate-180': buttonIsOpen,
            ' text-gray-400': isLoading 
          }"/>
      </button-slot>
      <fieldset
        ref="fieldSet"
        v-bind="$attrs"
        class="
          overflow-auto
          z-30
          origin-top-right 
          absolute
          text-gray-600
          font-normal
          text-base 
          pb-2 
          mt-1
          w-auto
          max-h-80
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
import { ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import ChevronDown from "@/assets/icons/ChevronDown.vue";
import { ButtonSlot } from "@/components/buttonui";
// import { useOnClickOutside } from "@/helper";
export default {
  // Button title from the parent
  inheritAttrs: false,
  props: {
    buttonTitle: String,
    menuTitle: String,
    filterActivated: Boolean,
  },
  components:{
    ButtonSlot,
    ChevronDown,
  },
  setup() {
    const buttonIsOpen = ref(false);
    const store = useStore();
    const isLoading = ref(false);
    const fieldSet = ref([]);
    const loadingIsActive = computed(() => store.getters.getIsLoading);
    // useOnClickOutside(fieldSet, () => { return buttonIsOpen.value = false});

    watchEffect(() => {
      isLoading.value = loadingIsActive.value
    });
    return {
      buttonIsOpen,
      isLoading,
      fieldSet
    }
  },
  methods: {
    toggleButtonOpenClose(event){
      console.log("FFFFFFF SET:", this.fieldSet);
      console.log("FFFFFFF SET  event:", event.target);
      const listener = () => {
        if (this.catchOut(event, this.fieldSet)) {
          document.removeEventListener("click", listener)
          this.buttonIsOpen = false;
        }
      }
      document.addEventListener("click", listener);

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

    catchOut(event, showList){
      if (showList == event.target){
        return false;
      }
      if (this.buttonIsOpen && showList != event.target){
        return true;
      }
    }
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