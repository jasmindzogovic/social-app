import { useState } from "react";
import { useParams } from "react-router-dom";

import { useResetPassword } from "./useResetPassword";
import { Button, Typography } from "@mui/material";

function ResetPasswordPage() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { isLoading, mutate, isSuccess, error } = useResetPassword();

  function handleSubmit(e) {
    e.preventDefault();

    if (!password || !passwordConfirm) return;

    mutate({ password, passwordConfirm, token });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        />
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input
          id="passwordConfirm"
          type="password"
          placeholder="Confirm your password"
          onChange={(e) => {
            e.preventDefault();
            setPasswordConfirm(e.target.value);
          }}
        />
        <Button type="submit">
          {isLoading ? (
            <Typography variant="h3">Password is being reset.</Typography>
          ) : (
            <Typography>Reset password</Typography>
          )}
        </Button>
        {isSuccess && (
          <Typography variant="h3">
            Password has been successfully reset.
          </Typography>
        )}
        {error && (
          <Typography variant="h3" sx={{ color: "red" }}>
            The password could not be reset. {error.message}
          </Typography>
        )}
      </form>
    </>
  );
}

export default ResetPasswordPage;
