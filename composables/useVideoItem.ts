import { useDocumentVisibility, useIntersectionObserver } from "@vueuse/core";
import { Ref } from "vue";
export function useVideoItem(rootEl: Ref<HTMLElement | null>, player: any) {
  const documentVisibility = useDocumentVisibility();
  const wasPlaying = ref(false);
  watch(documentVisibility, (visibility) => {
    if (!player.value) {
      return;
    }

    if (visibility === "hidden") {
      wasPlaying.value = !player.value.paused();
      player.value.pause();
    } else if (wasPlaying.value) {
      player.value.play();
    }
  });

  useIntersectionObserver(
    rootEl,
    ([{ isIntersecting }]) => {
      if (!player.value) {
        return;
      }

      if (isIntersecting) {
        player.value.play();
      } else {
        player.value.pause();
      }
    },
    {
      threshold: 1,
    }
  );
}
