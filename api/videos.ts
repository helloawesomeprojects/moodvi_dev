import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { useGeolocation } from "@vueuse/core";
import { ComputedRef, Ref } from "vue";
import { Video } from "~~/types/entites";

export const useRecommendationList = (enabled = true) => {
  const { $apiClient } = useNuxtApp();
  const route = useRoute();
  const { coords } = useGeolocation();

  const location = computed(() => {
    if (route.query.discover && typeof route.query.discover === "string") {
      const [lat, lon] = route.query.discover.split(",").map(Number);
      return {
        lat,
        lon,
      };
    } else {
      return {
        lat: isFinite(coords.value.latitude)
          ? coords.value.latitude
          : undefined,
        lon: isFinite(coords.value.longitude)
          ? coords.value.longitude
          : undefined,
      };
    }
  });
  return useQuery<Video[]>(
    ["recommendation-list", location],
    async () => {
      return $apiClient
        .get("/v1/rec/", {
          params: {
            lat: location.value.lat,
            lon: location.value.lon,
          },
        })
        .then((res) => res.data.map(Video.fromApi));
    },
    {
      keepPreviousData: true,
      enabled: enabled,
    }
  );
};

export const useVideoLikeMutation = () => {
  const { $apiClient } = useNuxtApp();
  return useMutation((videoId: number) =>
    $apiClient.post("/v1/like/", { video: videoId })
  );
};

export const useVideoSaveMutation = () => {
  const { $apiClient } = useNuxtApp();
  const queryClient = useQueryClient();
  return useMutation(
    (videoId: number) =>
      $apiClient.post(
        "/v1/save/",
        { video: videoId },
        { params: { video: videoId } }
      ),
    {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: ["recommendation-list"],
          type: "all",
        });
      },
    }
  );
};

export const useVideoById = (
  id: Ref<number> | ComputedRef<number> | number,
  enabled: Ref<boolean> | boolean = true
) => {
  const { $apiClient } = useNuxtApp();
  return useQuery<{ video: Video; recommendation: Video[] }>(
    ["video-single", id],
    () =>
      $apiClient.get(`/v1/video/${unref(id)}/`).then((res: any) => ({
        video: Video.fromApi(res.data.video),
        recommendation: res.data.recomendation.map(Video.fromApi),
      })),
    { enabled: unref(enabled) }
  );
};
