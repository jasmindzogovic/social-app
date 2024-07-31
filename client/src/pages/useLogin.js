import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { logIn } from "../services/auth";

export function useLogin() {
  const navigate = useNavigate();

  const { isLoading, mutate, error } = useMutation({
    mutationFn: ({ email, password }) => logIn(email, password),
    onSuccess: () => navigate("/home", { replace: true }),
    onError: (error) => {
      console.error(
        "Error occurred during log in:",
        error.response ? error.response.data : error.message
      );
    },
  });

  return { isLoading, mutate, error };
}
