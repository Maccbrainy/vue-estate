<template>
  <li>
    <div class="mr-2" v-on:click="buttonIsOpen = !buttonIsOpen">
      <button-slot 
        v-bind:class="{ 
          'bg-gray-100': isLoading 
        }" 
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
        v-bind:ref=" el => fieldSet = el"
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
import { ref, computed, watchEffect, onMounted, onUnmounted } from "vue";
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
    const fieldSet = ref(null);
    const loadingIsActive = computed(() => store.getters.getIsLoading);
    watchEffect(() => {
      isLoading.value = loadingIsActive.value;
    });
    function listener(event){
      if (!fieldSet.value || fieldSet.value.contains(event.target)){
        return;
     }
      // handler(event);
      buttonIsOpen.value = false;
    };
    onMounted(() => {
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    //   useOnClickOutside(fieldSet.value, () => {
    //     buttonIsOpen.value = false;
    //  });
    })
    onUnmounted(() => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener); 
    });
    return {
      buttonIsOpen,
      isLoading,
      fieldSet,
      listener
    }
  },
  methods: {
    
    // toggleButtonOpenClose(event){

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
    //   this.buttonIsOpen = !this.buttonIsOpen;
    // },
    // catchOutsideClick(event, button){
    //   if (button == event.target){
    //     return false;
    //   }
    //   if (this.buttonIsOpen && button != event.target) {
    //     return true;
    //   };
    // }
  },
}
</script>