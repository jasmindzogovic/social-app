import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { logOut } from "../services/auth";

export function useLogout() {
  const navigate = useNavigate();

  const { isLoading, mutate, error } = useMutation({
    mutationFn: () => logOut(),
    onSuccess: () => navigate("/", { replace: true }),
    onError: (error) => {
      console.error("Error", error);
    },
  });

  return { isLoading, mutate, error };
}
