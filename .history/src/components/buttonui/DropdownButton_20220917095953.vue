<template>
  <li>
    <div ref="menuRef" class="mr-2">
      <button-slot
        v-on:click="buttonIsOpen = !buttonIsOpen" 
        v-bind:class="{ 
          'bg-gray-100': storeData.isLoading 
        }" 
        :disabled="storeData.isLoading">
        <span 
          v-show="filterActivated" 
          class="my-auto w-3 h-3 rounded-full bg-teal mr-2"></span>
        <span 
          v-bind:class="{
            'text-gray-400': storeData.isLoading 
          }">
          {{ buttonTitle }}
        </span>
        <chevron-down 
          v-bind:class="{
            'transform rotate-180': buttonIsOpen,
            ' text-gray-400': storeData.isLoading 
          }"/>
      </button-slot>
      <fieldset
        v-bind:ref=" el => fieldSetRef = el"
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
import { ref, computed, onMounted, onUnmounted } from "vue";
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
    const fieldSetRef = ref(null);
    const menuRef = ref(null);
    const storeData = computed(() => store.getters.getStore);

    // useOnClickOutside(
    //   menuRef.value, 
    //   fieldSetRef.value, 
    //   () => buttonIsOpen.value = false)

    function listenerOnOutsideClick(event){
      if (!fieldSetRef.value || fieldSetRef.value.contains(event.target)){
        return;
      } 
      if (menuRef.value.contains(event.target)){
        return;
      }
      buttonIsOpen.value = false;
    };
    onMounted(() => {
      document.addEventListener("mousedown", listenerOnOutsideClick);
      document.addEventListener("touchstart", listenerOnOutsideClick);
    })
    onUnmounted(() => {
      document.removeEventListener("mousedown", listenerOnOutsideClick);
      document.removeEventListener("touchstart", listenerOnOutsideClick); 
    });
    return {
      buttonIsOpen,
      storeData,
      fieldSetRef,
      menuRef,
      // listenerOnOutsideClick
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