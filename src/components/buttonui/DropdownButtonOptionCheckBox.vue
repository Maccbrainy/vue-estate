<template>
  <div class="items-start">
    <!-- <label for="" class="inline-flex items-center"></label> -->
    <div class="flex items-center h-6">
      <input 
        type="checkbox" 
        class="h-4 w-4 text-teal border border-gray-200 rounded" 
        name="" 
        value=""
        true-value="yes" 
        false-value="no"/>
      <div class="ml-2"><slot></slot></div>
    </div>
  </div>
</template>