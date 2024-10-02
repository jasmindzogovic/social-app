import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { createNewPost } from "../services/posts";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ description, image }) => createNewPost(description, image),
    onSuccess: () => queryClient.invalidateQueries(["post"]),
    onError: (error) => {
      console.error(
        "Error occurred while creating post:",
        error.response ? error.response.data : error.message
      );
    },
  });

  return { isLoading, mutate };
}
