import { Ref } from "vue";
import { useAuthStore } from "~~/store/auth";
import { useVideoLikeMutation, useVideoSaveMutation } from "~~/api/videos";

export default function (id: Ref<number> | number, emit) {
  const { mutate: toggleLike } = useVideoLikeMutation();
  const { mutate: toggleSave } = useVideoSaveMutation();
  const route = useRoute();
  const authStore = useAuthStore();

  const like = () => {
    if (!authStore.isLoggedIn) {
      navigateTo({ query: { ...route.query, modal: "login-required" } });
      return;
    }
    emit("like");
    toggleLike(unref(id));
  };
  const save = () => {
    if (!authStore.isLoggedIn) {
      navigateTo({ query: { ...route.query, modal: "login-required" } });
      return;
    }
    toggleSave(unref(id), {
      onSuccess: () => {
        emit("save");
      },
    });
  };

  return { like, save };
}
