import { VueQueryPlugin } from "@tanstack/vue-query";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueQueryPlugin, {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: import.meta.env.PROD,
          refetchOnMount: import.meta.env.PROD,
          retry: import.meta.env.PROD,
        },
      },
    },
  });
});
