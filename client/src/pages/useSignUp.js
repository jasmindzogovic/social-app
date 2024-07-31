import { useMutation } from "@tanstack/react-query";
import { signUp } from "../services/auth";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  const navigate = useNavigate();

  const { isLoading, mutate, isSuccess, error } = useMutation({
    mutationFn: ({
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      image,
      location,
      occupation,
    }) =>
      signUp(
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
        image,
        location,
        occupation
      ),
    onError: (error) => {
      console.error("Error", error);
    },
  });

  return { isLoading, mutate, isSuccess, error };
}
