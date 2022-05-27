<template>
  <div class="w-1/2 sf:w-full block relative flex-1 -bottom-16">
    <div class="flex flex-auto flex-col px-2 py-1">
      <div 
        class="animate-pulse flex justify-between flex-col flex-auto flex-start pl-2 pb-2">
        <div class="mt-5">
          <h1 class="mb-1 pt-1 h-3 w-1/2 bg-gray-200 rounded-xl"></h1>
        </div>
        <div class="flex w-full mt-4 justify-between items-center">
          <h1 class="pt-1 h-3 w-2/5 bg-gray-200 rounded-xl"></h1>
          <dropdown-button-select-box>
            <dropdown-button-select class="shadow-none border-none">
              <dropdown-button-select-option value>
                Sort: Just For You
              </dropdown-button-select-option>
            </dropdown-button-select>
          </dropdown-button-select-box>
        </div>
        <ul class="flex flex-wrap">
          <li 
            class="
              block
              mt-4 
              flex-initial
              border-solid border-transparent border-r-8 border-l-8 border-t-8
              xs:w-full 
              sm:w-full 
              md:w-full 
              lg:w-6/12 
              xl:w-6/12 
              2xl:w-4/12
              3xl:w-3/12">
            <div>
              <div>
                <div 
                  class="
                    relative 
                    w-full 
                    h-44 
                    bg-gray-200 
                    rounded-xl 
                    overflow-hidden">
                </div>
                <div class="block mt-3">
                  <div class="mt-1 h-3 w-3/12 bg-gray-200 rounded"></div>
                  <div class="flex mt-2">
                    <div class="ml-3 h-3 w-7 bg-gray-200 rounded"></div>
                    <div class="ml-3 h-3 w-7 bg-gray-200 rounded"></div>
                    <div class="ml-3 h-3 w-7 bg-gray-200 rounded"></div>
                  </div>
                  <div class="space-y-2 mt-2">
                    <h4 class="h-3 w-6/12 bg-gray-200 rounded"></h4>
                    <h4 class="h-3 w-7/12 bg-gray-200 rounded"></h4>
                  </div>
                </div>
                <div class="mt-5 h-3 w-8/12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </li>
          <li 
            class="
              block
              mt-4 
              flex-initial
              border-solid border-transparent border-r-8 border-l-8 border-t-8
              xs:w-full 
              sm:w-full 
              md:w-full 
              lg:w-6/12 
              xl:w-6/12 
              2xl:w-4/12
              3xl:w-3/12">
            <div>
              <div>
                <div 
                  class="
                    relative 
                    w-full 
                    h-44 
                    bg-gray-200 
                    rounded-xl 
                    overflow-hidden">
                </div>
                <div class="block mt-3">
                  <div class="mt-1 h-3 w-3/12 bg-gray-200 rounded"></div>
                  <div class="flex mt-2">
                    <div class="ml-3 h-3 w-7 bg-gray-200 rounded"></div>
                    <div class="ml-3 h-3 w-7 bg-gray-200 rounded"></div>
                    <div class="ml-3 h-3 w-7 bg-gray-200 rounded"></div>
                  </div>
                  <div class="space-y-2 mt-2">
                    <h4 class="h-3 w-6/12 bg-gray-200 rounded"></h4>
                    <h4 class="h-3 w-7/12 bg-gray-200 rounded"></h4>
                  </div>
                </div>
                <div class="mt-5 h-3 w-8/12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </li>
          <li 
            class="
              block
              mt-4 
              flex-initial
              border-solid border-transparent border-r-8 border-l-8 border-t-8
              xs:w-full 
              sm:w-full 
              md:w-full 
              lg:w-6/12 
              xl:w-6/12 
              2xl:w-4/12
              3xl:w-3/12">
            <div>
              <div>
                <div 
                  class="
                    relative 
                    w-full 
                    h-44 
                    bg-gray-200 
                    rounded-xl 
                    overflow-hidden">
                </div>
                <div class="block mt-3">
                  <div class="mt-1 h-3 w-3/12 bg-gray-200 rounded"></div>
                  <div class="flex mt-2">
                    <div class="ml-3 h-3 w-7 bg-gray-200 rounded"></div>
                    <div class="ml-3 h-3 w-7 bg-gray-200 rounded"></div>
                    <div class="ml-3 h-3 w-7 bg-gray-200 rounded"></div>
                  </div>
                  <div class="space-y-2 mt-2">
                    <h4 class="h-3 w-6/12 bg-gray-200 rounded"></h4>
                    <h4 class="h-3 w-7/12 bg-gray-200 rounded"></h4>
                  </div>
                </div>
                <div class="mt-5 h-3 w-8/12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { 
  DropdownButtonSelect, 
  DropdownButtonSelectOption, 
  DropdownButtonSelectBox 
} from "@/components/buttonui";
export default {
  name: "IsLoading",
  components: {
    DropdownButtonSelect,
    DropdownButtonSelectOption,
    DropdownButtonSelectBox  
  }, 
}
</script>