import { useMutation } from "@tanstack/react-query";

import { resetPassword } from "../services/auth";
import toast from "react-hot-toast";

export function useResetPassword() {
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ password, passwordConfirm, token }) =>
      resetPassword(password, passwordConfirm, token),
    onError: (error) =>
      console.error(
        "Error occurred during password reset:",
        error.response ? error.response.data : error.message
      ),
  });

  return { isLoading, mutate };
}
