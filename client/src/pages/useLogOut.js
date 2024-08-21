import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { logOut } from "../services/auth";

export function useLogOut() {
  const navigate = useNavigate();

  const { isLoading, mutate, error } = useMutation({
    mutationFn: () => logOut(),
    onSuccess: () => navigate("/"),
    onError: (error) => {
      console.error(
        "Error occurred during log in:",
        error.response ? error.response.data : error.message
      );
    },
  });

  return { isLoading, mutate, error };
}
