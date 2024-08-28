import { useMutation } from "@tanstack/react-query";
import { signUp } from "../services/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignUp() {
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
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
    onSuccess: () =>
      toast.success(
        "Sign up was succesful. Please check your email to activate your account."
      ),
    onError: (error) => {
      console.error(
        "Error occurred during sign up:",
        error.response ? error.response.data : error.message
      );
      toast.error(`Error occurred during sign up. ${error.message}`);
    },
  });

  return { isLoading, mutate };
}
