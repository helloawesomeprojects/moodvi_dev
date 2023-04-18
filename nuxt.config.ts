import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@pinia/nuxt",
    "unplugin-icons/nuxt",
  ],
  app: {
    head: {
      htmlAttrs: {
        class: "scroll-smooth",
      },
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/moodvi-icon.png",
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: true,
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,400;1,500;1,600;1,700;1,900&display=swap",
        },
      ],
      layoutTransition: { name: "layout", mode: "out-in" },
      pageTransition: { name: "page", mode: "out-in" },
      // script: [
      //   {
      //     id: "yandex-maps",
      //     src: "https://api-maps.yandex.ru/2.1/?apikey=afe691f1-2e2d-49b0-b3ea-46a6fe3640e0&lang=en_US",
      //     defer: "",
      //     async: "",
      //   },
      // ],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/main.scss" as *;',
        },
      },
    },
    plugins: [
      AutoImport({
        imports: [
          "vue",
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
            ],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver(), IconsResolver()],
      }),
      Icons(),
    ],
    optimizeDeps: {
      include:
        process.env.NODE_ENV === "development"
          ? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"]
          : [],
    },
  },
  runtimeConfig: {
    public: {
      baseURL: "https://api.moodvi.com/api",
    },
  },
  build: {
    transpile: [
      "vue-toastification",
      ...(process.env.NODE_ENV === "production"
        ? [
            "naive-ui",
            "vueuc",
            "@css-render/vue3-ssr",
            "@juggle/resize-observer",
          ]
        : ["@juggle/resize-observer"]),
    ],
  },
});
