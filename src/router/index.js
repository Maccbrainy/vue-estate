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
      title: "Homesive: Real Estate Listings, Homes For Sale, Housing Data"
    }
  },
  {
    path: "/for_rent/",
    name: "RentPage",
    component: HomePage,
    meta: {
      title: "Rental Listings in your Neighbourhood | Homesive.com"
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
      title: "Homesive"
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
      title: "Homes in Nigeria"
    }
  },
  {
    path: "/:slug/:city/:address",
    name: "HomeDetail",
    component: SearchResultDetailedContentLayout,
    // route level code-splitting
    // this generates a separate chunk (mortgage.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(
    //     /* webpackChunkName: "HomeDetail" */ "../layouts/SearchResultDetailedContentLayout.vue"),
    props: (route) => ({
      address: route.params.address,
      // title: route.params.title,
    }),
    meta: {
      title: "Homesive"
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
