import { useQuery } from "@tanstack/vue-query";

export const useMyVideosQuery = () => {
  const { $apiClient } = useNuxtApp();
  return useQuery(["profile-my-videos"], () =>
    $apiClient.get("/v1/myvideos/").then((res: any) => res.data)
  );
};

export const useMyLikesQuery = () => {
  const { $apiClient } = useNuxtApp();
  return useQuery(["profile-my-likes"], () =>
    $apiClient.get("/v1/mylikedvideos/").then((res: any) => res.data.videos)
  );
};

export const useMySavesQuery = () => {
  const { $apiClient } = useNuxtApp();
  return useQuery(["profile-my-saves"], () =>
    $apiClient.get("/v1/mysavedvideos/").then((res: any) => res.data.videos)
  );
};
