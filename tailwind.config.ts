import { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Config>{
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "#4285F4",
          dark: "#2472f2",
        },
        black: {
          DEFAULT: "#161823",
        },
        text: {
          primary: "#161823",
          secondary: "rgba(22,24,35,0.75)",
          tertiary: "rgba(22,24,35,0.5)",
          quaternary: "rgba(22,24,35,0.34)",
        },
        "bg-input": {
          DEFAULT: "rgba(22,24,35,0.06)",
        },
        "bg-hover": {
          DEFAULT: "rgba(22,24,35,0.06)",
        },
        "bg-view": {
          DEFAULT: "rgba(22,24,35,0.03)",
        },
        line: {
          secondary: "rgba(22,24,35,0.12)",
        },
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
    require("@tailwindcss/line-clamp"),
  ],
};
