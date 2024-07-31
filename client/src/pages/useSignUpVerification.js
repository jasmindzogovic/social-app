import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { signUpVerification } from "../services/auth";

export function useSignUpVerification() {
  const navigate = useNavigate();

  const { isLoading, mutate, isSuccess, error } = useMutation({
    mutationFn: ({ param }) => signUpVerification(param),
    onSuccess: () => navigate("/home", { replace: true }),
    onError: (error) => {
      console.error(
        "Error occurred during sign up verification:",
        error.response ? error.response.data : error.message
      );
    },
  });

  return { isLoading, mutate, isSuccess, error };
}
