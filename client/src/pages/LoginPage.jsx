import { useMutation } from "@tanstack/react-query";
// import { FormControl, FormLabel } from "@mui/material";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import { useState } from "react";

import { useLogin } from "./useLogin";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isLoading, error } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    mutate({ email, password });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => {
            e.preventDefault();
            setEmail(e.target.value);
          }}
        />
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging In" : " Log In"}
        </button>
        {error && <p style={{ color: "red" }}>Login failed: {error.message}</p>}
      </form>
    </>
  );
}

export default LoginPage;
