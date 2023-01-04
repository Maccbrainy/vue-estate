import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import provider from "./provider";
import store from "./store";
import "./assets/style/app.css";
const app = createApp(App);
app.use(provider).use(store).use(router).mount("#app");
