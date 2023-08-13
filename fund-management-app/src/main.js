import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue/es";
import router from "./router";
import "ant-design-vue/dist/reset.css";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(Antd);
app.use(router);
app.use(pinia);

app.mount("#app");
