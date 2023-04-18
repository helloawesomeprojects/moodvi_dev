import { computedAsync } from "@vueuse/core";

const FILE_VALIDATION_DEFAULT = { status: undefined, feedback: undefined };

export default function useVideoValidation(file: Ref<File | undefined | null>) {
  return computedAsync<{
    status: string | undefined;
    feedback: string | undefined;
  }>(
    () =>
      new Promise((resolve) => {
        if (!file.value) {
          return FILE_VALIDATION_DEFAULT;
        }

        window.URL = window.URL || window.webkitURL;
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = function () {
          window.URL.revokeObjectURL(video.src);

          const isLong = video.duration > 300;
          const isLarge = file.value?.size && file?.value.size > 2 * 1e9;

          const status = isLong || isLarge ? "error" : undefined;
          const feedback = isLong
            ? "Video duration exceeds 5 minute limit"
            : isLarge
            ? "File size is too large"
            : undefined;

          video.remove();
          resolve({
            status,
            feedback,
          });
        };
        video.src = URL.createObjectURL(file.value);
      }),
    FILE_VALIDATION_DEFAULT
  );
}
