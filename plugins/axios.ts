import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { useAuthStore } from "~~/store/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const client = applyCaseMiddleware(
    axios.create({
      baseURL: "http://43.207.180.183:4000/api",
    })
  );

  client.interceptors.request.use(function (config) {
    const authStore = useAuthStore(nuxtApp.$pinia);
    if (!config.headers) {
      config.headers = {} as any;
    }
    if (authStore.token) {
      config.headers["Authorization"] = `Token ${authStore.token}`;
    }
    return config;
  });
  return {
    provide: {
      apiClient: client,
    },
  };
});
