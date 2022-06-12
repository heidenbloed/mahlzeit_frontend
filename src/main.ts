import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { defineRule } from "vee-validate";

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

const app = createApp(App);
app.use(router);
app.mount("#app");
