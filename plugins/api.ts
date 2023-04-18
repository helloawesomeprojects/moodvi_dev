// import { camelCase, snakeCase, isArray, transform, isObject } from "lodash";
import { useAuthStore } from "~~/store/auth";

// const toCamelCase = (obj: Record<string, unknown>) =>
//   transform(
//     obj,
//     (result: Record<string, unknown>, value: unknown, key: string, target) => {
//       const camelKey = isArray(target) ? key : camelCase(key);
//       result[camelKey] = isObject(value)
//         ? toCamelCase(value as Record<string, unknown>)
//         : value;
//     }
//   );

export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    baseURL: "http://moodvi.javokhmi.beget.tech/api",
    // onResponse: async ({ response }) => {
    //   response._data = toCamelCase(response._data);
    // },
    onRequest: async ({ request, options }) => {
      const authStore = useAuthStore(nuxtApp.$pinia);
      if (!options.headers) {
        options.headers = {};
      }
      if (authStore.token) {
        options.headers["Authorization"] = `Token ${authStore.token}`;
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
