import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  signUp,
  logIn,
  logOut,
  forgotPassword,
  resetPassword,
} from "../services/auth";

function LoginPage() {
  const {
    status,
    error,
    data: user,
  } = useQuery({ queryKey: ["user"], queryFn: logIn });

  return <div>Login Page</div>;
}

export default LoginPage;
