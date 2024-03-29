import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import store from "./store";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import BaseMixins from "@/mixins/base";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(store);
app.mixin(BaseMixins);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
