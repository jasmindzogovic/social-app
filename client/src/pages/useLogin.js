import { useMutation } from "@tanstack/react-query";
import { logIn } from "../services/auth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();

  const { isLoading, mutate, error } = useMutation({
    mutationFn: ({ email, password }) => logIn(email, password),
    onSuccess: () => navigate("/home", { replace: true }),
    onError: (error) => {
      console.error("Error", error);
    },
  });

  return { isLoading, mutate, error };
}
