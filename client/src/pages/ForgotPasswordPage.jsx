import { useState } from "react";
import { Button } from "@mui/material";

import { useForgotPassword } from "./useForgotPassword";

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
      <form onSubmit={handleForgotPassword}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => {
            e.preventDefault();
            setEmail(e.target.value);
          }}
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Forgot Password"}
        </Button>
        {isSuccess && <p>Please check your email</p>}
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      </form>
    </>
  );
}

export default ForgotPasswordPage;
