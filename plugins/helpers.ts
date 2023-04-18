import { Video } from "~~/types/entites";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      getMediaUrl(url: string) {
        return `https://api.moodvi.com/${url.replace("public/", "storage/")}`;
      },
      getVideoUrl(video: Video) {
        return `https://moodvi.com/${video.userDetail.email}/video/${video?.id}`;
      },
    },
  };
});
