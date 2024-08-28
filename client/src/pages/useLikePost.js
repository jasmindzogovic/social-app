import { useMutation, useQueryClient } from "@tanstack/react-query";

import { likePost } from "../services/posts";
import toast from "react-hot-toast";

export function useLikePost() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ postId }) => likePost(postId),
    onSuccess: () => {
      toast.success("Post was liked successfully.");
      queryClient.invalidateQueries(["post"]);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data ||
        error.message ||
        "An error occurred while liking the post.";
      console.error("Error occurred while liking post:", errorMessage);
      toast.error(errorMessage);
    },
  });

  return { mutate };
}
