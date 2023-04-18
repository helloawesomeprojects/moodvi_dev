import { User } from "./../types/entites";
import { defineStore } from "pinia";

export interface AuthStore {
  token: null | string;
  user: any;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthStore => ({
    token: null,
    user: null as User | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user,
  },
  persist: {
    paths: ["token", "user"],
  },
  actions: {
    async fetchUser() {
      const { $apiClient } = useNuxtApp();
      const { data } = await $apiClient.get<User>("/v1/mydata/");
      this.user = data;
    },
    logout() {
      this.token = null;
      this.user = null;
    },
  },
});
