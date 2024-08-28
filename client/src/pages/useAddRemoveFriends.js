import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addOrRemoveFriends } from "../services/users";
import toast from "react-hot-toast";

export function useAddRemoveFriends() {
  const queryClient = useQueryClient();
  const { isLoading, mutate, error } = useMutation({
    mutationFn: ({ operation, friendID, userId }) =>
      addOrRemoveFriends(operation, friendID, userId),
    onSuccess: (_, variables) => {
      const { operation } = variables;
      toast.success(
        `User has been ${
          operation === "add" ? "added" : "removed"
        } from friends list.`
      );
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      console.error(
        "Error occurred while adding or removing from friends list:",
        error.response ? error.response.data : error.message
      );
    },
  });

  return { isLoading, mutate, error };
}
