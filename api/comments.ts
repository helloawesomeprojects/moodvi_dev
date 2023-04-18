import { Comment } from "./../types/entites";
import { PaginatedData } from "./../types/common";
import { useInfiniteQuery, useMutation } from "@tanstack/vue-query";
import type { Ref } from "vue";

export const useCommentListQuery = (
  id: Ref<number> | number,
  enabled: Ref<boolean> | boolean = true
) => {
  const { $apiClient } = useNuxtApp();
  const fetchComments = ({ pageParam }: { pageParam?: string | null }) => {
    if (pageParam) {
      return $apiClient.get(pageParam).then((res: any) => res.data);
    }

    return $apiClient
      .get(`/v1/commentsvideo/${unref(id)}/`, {
        params: { page: 1, pageSize: 5 },
      })
      .then((res: any) => res.data);
  };
  return useInfiniteQuery<PaginatedData<Comment>>(
    ["comment-list", id],
    fetchComments,
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.next || undefined;
      },
      enabled: unref(enabled),
    }
  );
};

interface CommentCreatePayload {
  video: number;
  comment: string;
}

export const useCommentCreateMutation = () => {
  const { $apiClient } = useNuxtApp();

  return useMutation((payload: CommentCreatePayload) =>
    $apiClient.post("/v1/comment/", payload)
  );
};
