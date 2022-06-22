import { createApp } from "vue";
import { createPinia } from "pinia";
import { defineRule } from "vee-validate";
import router from "./router";
import App from "./App.vue";
import "./index.css";

defineRule("required", (value: string) => {
  if (!value || !value.length) {
    return "Darf nicht leer sein";
  }
  return true;
});
defineRule("number", (value: string) => {
  if (isNaN(+value) || !isFinite(+value)) {
    return "Muss eine gültige Nummer sein";
  }
  return true;
});
defineRule("positive", (value: string) => {
  if (+value <= 0) {
    return "Muss positiv sein";
  }
  return true;
});
defineRule("integer", (value: string) => {
  if (+value % 1 != 0) {
    return "Muss eine Ganzzahl sein";
  }
  return true;
});

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
