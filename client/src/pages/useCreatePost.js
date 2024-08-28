import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { createNewPost } from "../services/posts";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ description }) => createNewPost(description),
    onSuccess: () => {
      toast.success("Post has been successfully created.");
      queryClient.invalidateQueries(["post"]);
    },
    onError: (error) => {
      toast.error("There was an error creating this post.");
      console.error(
        "Error occurred while creating post:",
        error.response ? error.response.data : error.message
      );
    },
  });

  return { isLoading, mutate };
}
