import { useState } from "react";
import { Button, Typography } from "@mui/material";

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
        {isSuccess && <Typography>Please check your email</Typography>}
        {error && (
          <Typography sx={{ color: "red" }}>Error: {error.message}</Typography>
        )}
      </form>
    </>
  );
}

export default ForgotPasswordPage;
