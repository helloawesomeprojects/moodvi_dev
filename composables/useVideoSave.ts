import { Ref } from "vue";
import { useVideoSaveMutation } from "~~/api/videos";
import { useAuthStore } from "~~/store/auth";
import { Video } from "~~/types/entites";

export default function (video: Ref<Video | undefined>) {
  const { mutate: toggleSave, isLoading } = useVideoSaveMutation();
  const isSaved = ref(!!video.value?.isSaved);
  const savesCount = ref<number>(video.value?.savesCount || 0);

  watch(video, () => {
    if (video.value) {
      isSaved.value = !!video.value.isSaved;
      savesCount.value = video.value.savesCount;
    }
  });

  const route = useRoute();
  const authStore = useAuthStore();

  const save = () => {
    if (!authStore.isLoggedIn) {
      navigateTo({ query: { ...route.query, modal: "login-required" } });
      return;
    }
    if (isSaved.value) {
      savesCount.value--;
    } else {
      savesCount.value++;
    }

    isSaved.value = !isSaved.value;
    if (video.value) {
      toggleSave(video.value?.id, { onError() {} });
    }
  };

  return { save, isSaved, isLoading, savesCount };
}
