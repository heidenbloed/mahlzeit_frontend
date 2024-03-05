import { defineStore } from "pinia";
import { computed, watch } from "vue";
import {
  setErrorInterceptor,
  setAuthToken,
  loginUser as loginUserApi,
} from "../api/recipeDbApi";
import { useLocalStorage } from "@vueuse/core";

export const useAuthentificationStore = defineStore("authentification", () => {
  const authToken = useLocalStorage<string | null>("authToken", null);
  const userIsLoggedIn = computed(() => authToken.value !== null);

  function updateApiAuthToken() {
    if (authToken.value !== null) {
      setAuthToken(authToken.value);
    }
  }

  async function loginUser(
    username: string,
    password: string
  ): Promise<boolean> {
    const tokenInfo = await loginUserApi(username, password);
    if (tokenInfo !== undefined) {
      authToken.value = tokenInfo.token;
      return true;
    } else {
      return false;
    }
  }

  setErrorInterceptor((err) => {
    if (err.response.status === 401) {
      authToken.value = null;
    }
    return err;
  });

  watch(authToken, updateApiAuthToken);
  updateApiAuthToken();

  return {
    userIsLoggedIn,
    loginUser,
  };
});
