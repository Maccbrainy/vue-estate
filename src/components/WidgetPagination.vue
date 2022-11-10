<template>
  <ul class="flex justify-center items-center py-4">
    <li>
      <button
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
        type="button"
        class="border rounded-l-md flex-auto px-3 py-1"
      >
        First
      </button>
    </li>
    <li>
      <button
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
        type="button"
        class="border flex-auto px-3 py-1"
      >
        Previous
      </button>
    </li>
    <!-- Visible buttons start -->
    <li v-for="(page, index) in pages" :key="page.name + index">
      <button
        @click="onClickPage(page.name)"
        type="button"
        :class="{
          'border border-teal bg-white text-teal': currentPage === page.name,
          'bg-teal-lighter text-teal': currentPage !== page.name,
        }"
        class="rounded-md flex-auto px-3 py-1"
        :disabled="page.isDisabled"
      >
        {{ page.name }}
      </button>
    </li>
    <!-- Visible buttons ends -->
    <li>
      <button
        @click="onClickNextPage"
        :disabled="isInLastPage"
        type="button"
        class="border flex-auto px-3 py-1"
      >
        Next
      </button>
    </li>
    <li>
      <button
        @click="onClickLastPage"
        :disabled="isInLastPage"
        type="button"
        class="border rounded-r-md flex-auto px-3 py-1"
      >
        last
      </button>
    </li>
  </ul>
</template>
<script>
import { computed } from "vue";
export default {
  name: "WidgetPagination",
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    maxVisiblePageLinks: {
      type: Number,
      required: false,
      default: 2,
    },
  },
  emits: ["pageChanged"],
  setup(props, context) {
    const totalPages = computed(() =>
      Math.ceil(props.totalItems / props.perPage)
    );
    const isInFirstPage = computed(() => props.currentPage === 1);
    const isInLastPage = computed(() => props.currentPage === totalPages.value);
    const startPage = computed(() => {
      // When on the first page
      if (props.currentPage === 1) {
        return 1;
      }
      // When on the last page
      if (props.currentPage === totalPages.value) {
        return totalPages.value - props.maxVisiblePageLinks + 1;
      }
      // When inbetween
      return props.currentPage - 1;
    });

    const endPage = computed(() => {
      return Math.min(
        startPage.value + props.maxVisiblePageLinks - 1,
        totalPages.value
      );
    });

    const pages = computed(() => {
      let range = [];
      for (let i = startPage.value; i <= endPage.value; i += 1) {
        range.push({
          name: i,
          isDisabled: i === props.currentPage,
        });
      }
      return range;
    });
    const onClickFirstPage = () => {
      context.emit("pageChanged", 1);
    };
    const onClickPreviousPage = () => {
      context.emit("pageChanged", props.currentPage - 1);
    };
    const onClickPage = (pageName) => {
      context.emit("pageChanged", pageName);
    };
    const onClickNextPage = () => {
      context.emit("pageChanged", props.currentPage + 1);
    };
    const onClickLastPage = () => {
      context.emit("pageChanged", totalPages.value);
    };
    return {
      totalPages,
      startPage,
      pages,
      isInFirstPage,
      isInLastPage,
      endPage,
      onClickFirstPage,
      onClickPreviousPage,
      onClickPage,
      onClickNextPage,
      onClickLastPage,
    };
  },
};
</script>
