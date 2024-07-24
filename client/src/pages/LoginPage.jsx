import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { useLogin } from "./useLogin";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isLoading, error } = useLogin();
  const navigate = useNavigate();

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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Logging In" : " Log In"}
        </Button>
        {error && <p style={{ color: "red" }}>Login failed: {error.message}</p>}
        <div>
          <Button onClick={() => navigate("/signup")}>
            Not a member yet? Sign up.
          </Button>
          <Button onClick={() => navigate("/forgot-password")}>
            Forgot your password?
          </Button>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
