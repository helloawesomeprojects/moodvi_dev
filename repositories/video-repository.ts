export interface UploadVideoPayload {
  title: string;
  description?: string | null;
  latitude: number;
  longitude: number;
  file: File;
  [key: string]: any;
}

export type UploadVideoErrors = {
  [key: keyof UploadVideoPayload]: string;
};

export const videoRepository = {
  upload(payload: UploadVideoPayload) {
    const { $apiClient } = useNuxtApp();
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      if (payload[key]) {
        formData.append(key, payload[key]);
      }
    });
    return $apiClient.post("/v1/video/", formData);
  },
};
