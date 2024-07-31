import { useMutation } from "@tanstack/react-query";

import { forgotPassword } from "../services/auth";

export function useForgotPassword() {
  const { isLoading, mutate, isSuccess, error } = useMutation({
    mutationFn: ({ email }) => forgotPassword(email),
    onError: (error) => {
      console.error(
        "Error occurred during password reset:",
        error.response ? error.response.data : error.message
      );
    },
  });

  return { isLoading, mutate, isSuccess, error };
}
