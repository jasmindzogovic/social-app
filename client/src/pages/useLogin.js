import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { logIn } from "../services/auth";

export function useLogin() {
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationFn: ({ email, password }) => logIn(email, password),
    onSuccess: (data) => navigate(`/home/${data.user._id}`, { replace: true }),
    onError: (error) => {
      console.error("Error occurred during log in:", {
        message: error.message,
        response: error.response ? error.response.data : null,
        status: error.response ? error.response.status : null,
      });
    },
  });

  return { isLoading, mutate };
}
