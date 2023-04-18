import { defineStore } from "pinia";
export const useUiStore = defineStore("ui", {
  state: () => ({
    bodyScrollDisabled: false,
    muted: true,
  }),
});
