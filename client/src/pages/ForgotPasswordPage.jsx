import { useState } from "react";
import { Button, Typography } from "@mui/material";

import { useForgotPassword } from "./useForgotPassword";
import SociopediaHeader from "../components/SociopediaHeader";
import FormForgotPassword from "../components/FormForgotPassword";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { mutate, isLoading, isSuccess, error } = useForgotPassword();

  function handleForgotPassword(e) {
    e.preventDefault();

    if (!email) return;

    mutate({ email });
  }

  return (
    <>
      <SociopediaHeader />
      <FormForgotPassword />
    </>
  );
}

export default ForgotPasswordPage;
