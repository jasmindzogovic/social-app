import { useMutation } from "@tanstack/react-query";

import { addOrRemoveFriends } from "../services/users";

export function useAddRemoveFriends() {
  const { isLoading, mutate, status,error } = useMutation({
    mutationFn: ({ operation, friendID, userId }) => 
      addOrRemoveFriends(operation, friendID, userId),
    onError: (error) => {
      console.error(
        "Error occurred while adding or removing from friends list:",
        error.response ? error.response.data : error.message
      );
    },
  });

  return { isLoading, mutate, status, error };
}
