import { defineStore } from "pinia";
import { Video } from "~~/types/entites";
export const useShareStore = defineStore("share", {
  state: () => ({
    shareItems: [
      {
        icon: "logos:telegram",
        label: "Share to Telegram",
        network: "telegram",
      },
      {
        icon: "logos:facebook",
        label: "Share to Facebook",
        network: "facebook",
      },
      {
        icon: "logos:twitter",
        label: "Share to Twitter",
        network: "twitter",
      },
    ],
    videoToShare: null as Video | null | undefined,
  }),
});
