import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/TheHomePage.vue";
import SearchResultContentLayout from "@/layouts/SearchResultContentLayout.vue";
import SearchResultDetailedContentLayout from "@/layouts/SearchResultDetailedContentLayout.vue";
import SiteMapsContentLayout from "@/layouts/SiteMapsContentLayout.vue";

//Route in the home page
const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    meta: {
      title: "Vue-estate: Real Estate Listings, Homes For Sale, Housing Data"
    }
  },
  {
    path: "/for_rent",
    name: "list-for-rent",
    component: HomePage,
    meta: {
      title: "Rental Listings in your Neighbourhood | Vue-estate.com"
    }
  },
  {
    path: "/:slug/:city?",
    name: "BuyPage",
    component: SearchResultContentLayout,
    props: (route) => ({
      slug: route.params.slug,
      city: route.params.city,
      title: route.params.title,
    }),
    meta: {
      title: "Vue-estate"
    }
  },
  {
    path: "/rent/:slug/:city?",
    name: "RentPage",
    component: SearchResultContentLayout,
    props: (route) => ({
      slug: route.params.slug,
      city: route.params.city,
      title: route.params.title,
    }),
    meta: {
      title: "Vue-estate"
    }
  },
  {
    path: "/sold/:slug/:city?",
    name: "SoldPage",
    component: SearchResultContentLayout,
    props: (route) => ({
      slug: route.params.slug,
      city: route.params.city,
      title: route.params.title,
    }),
    meta: {
      title: "Vue-estate"
    }
  },
  {
    path: "/new-for-sale-properties/:slug",
    redirect: {
      name: "BuyPage",
    },
  },
  {
    path: "/sitemaps/",
    name: "SiteMaps",
    component: SiteMapsContentLayout,
    meta: {
      title: "Homes in USA"
    }
  },
  {
    path: "/",
    name: "list-sold",
    component: HomePage,
    alias: "/list-sold",
    meta: {
      title: "Vue-estate: Real Estate Sold Listings, and Housing Data"
    }
  },
  {
    path: "/:slug/:city/:address?/:propertyId/:postalCode?",
    name: "HomeDetail",
    component: SearchResultDetailedContentLayout, 
    // route level code-splitting
    // this generates a separate chunk (mortgage.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(
    //     /* webpackChunkName: "HomeDetail" */ "../layouts/SearchResultDetailedContentLayout.vue"),
    props: (route) => ({
      slug: route.params.slug,
      city: route.params.city,
      address: route.params.address,
      propertyId: route.params.propertyId,
      postalCode: route.params.postalCode,
      // title: route.params.title,
    }),
    meta: {
      title: "Vue-estate"
    }
  },
  {
    path: "/mortgage",
    name: "TheMortgagePage",
    // route level code-splitting
    // this generates a separate chunk (mortgage.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "mortgage" */ "../views/TheMortgagePage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// router.beforeEach((to, from, next) => {
//   // console.log(to);
//   let documentDefaultTitle = to.meta.title;
//   let toParamsTitle = to.params.title;
//   document.title = toParamsTitle ? toParamsTitle : documentDefaultTitle;
//   next()
// })
router.afterEach((to) => {
  let documentDefaultTitle = to.meta.title;
  let toParamsTitle = to.params.title;
  document.title = toParamsTitle ? toParamsTitle : documentDefaultTitle;
});

export default router;
