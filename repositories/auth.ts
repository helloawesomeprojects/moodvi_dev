import { AxiosResponse } from "axios";
import { useAuthStore } from "~~/store/auth";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const authRepository = {
  async login(payload: LoginPayload) {
    const { $apiClient } = useNuxtApp();
    const authStore = useAuthStore();

    const { data } = await $apiClient.post<
      LoginPayload,
      AxiosResponse<LoginResponse>
    >("/auth/token/login/", payload);
    authStore.token = data.token;
    return data;
  },
  async fetchUser() {
    const authStore = useAuthStore();
    return authStore.fetchUser();
  },
};
