import { Button } from "@mui/material";
import { useState } from "react";

import { useSignUp } from "./useSignUp";

function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");

  const { mutate, isLoading, error } = useSignUp();

  function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      image,
      location,
      occupation,
    };

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !passwordConfirm ||
      !image ||
      !location
    )
      return;

    if (password !== passwordConfirm) {
      throw new Error("Passwords do not match.");
    }

    mutate(formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          placeholder="Enter your first name"
          onChange={(e) => {
            e.preventDefault();
            setFirstName(e.target.value);
          }}
        />
        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          type="text"
          placeholder="Enter your last name"
          onChange={(e) => {
            e.preventDefault();
            setLastName(e.target.value);
          }}
        />
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
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          placeholder="Enter your image"
          onChange={(e) => {
            e.preventDefault();
            setImage(e.target.value);
          }}
        />
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          placeholder="Enter your location"
          onChange={(e) => {
            e.preventDefault();
            setLocation(e.target.value);
          }}
        />
        <label htmlFor="occupation">Occupation</label>
        <input
          id="occupation"
          type="occupation"
          placeholder="Enter your occupation"
          onChange={(e) => {
            e.preventDefault();
            setOccupation(e.target.value);
          }}
        />
        <Button type="submit">{isLoading ? "Signing Up" : " Sign In"}</Button>
        {error && <p style={{ color: "red" }}>Login failed: {error.message}</p>}
        <div></div>
      </form>
    </>
  );
}

export default SignUpPage;
