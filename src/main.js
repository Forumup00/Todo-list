import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./Router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./style.css";
import "swiper/css";
import "swiper/css/pagination";

createApp(App).use(router).use(createPinia()).mount("#app");
