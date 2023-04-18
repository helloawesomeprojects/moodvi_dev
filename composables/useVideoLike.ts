import { Ref } from "vue";
import { useVideoLikeMutation } from "~~/api/videos";
import { useAuthStore } from "~~/store/auth";
import { Video } from "~~/types/entites";

export default function (video: Ref<Video | undefined>) {
  const { mutate: toggleLike, isLoading } = useVideoLikeMutation();
  const isLiked = ref(!!video.value?.isLiked);
  const likesCount = ref<number>(video.value?.likesCount || 0);

  watch(video, () => {
    if (video.value) {
      isLiked.value = !!video.value?.isLiked;
      likesCount.value = video.value?.likesCount;
    }
  });

  const route = useRoute();
  const authStore = useAuthStore();

  const like = () => {
    if (!authStore.isLoggedIn) {
      navigateTo({ query: { ...route.query, modal: "login-required" } });
      return;
    }
    if (isLiked.value) {
      likesCount.value--;
    } else {
      likesCount.value++;
    }

    isLiked.value = !isLiked.value;
    if (video.value) {
      toggleLike(video.value?.id, { onError() {} });
    }
  };

  return { like, isLiked, isLoading, likesCount };
}
