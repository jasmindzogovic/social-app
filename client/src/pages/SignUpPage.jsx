import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import { Formik } from "formik";

import FlexBetween from "../components/FlexBetween";
import { useSignUp } from "./useSignUp";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  image: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
});

function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");

  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const { mutate, isLoading, isSuccess, error } = useSignUp();

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
      <Formik onSubmit={handleSubmit} validationSchema={registerSchema}>
        {({
          values,
          error,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <>
                <TextField
                  id="firstName"
                  type="text"
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    e.preventDefault();
                    setFirstName(e.target.value);
                  }}
                  placeholder="Enter your first name"
                  value={firstName}
                  error={Boolean(touched.firstName) && Boolean(error.firstName)}
                  helperText={touched.firstName && error.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  id="lastName"
                  type="text"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    e.preventDefault();
                    setLastName(e.target.value);
                  }}
                  placeholder="Enter your last name"
                  value={lastName}
                  error={Boolean(touched.lastName) && Boolean(error.lastName)}
                  helperText={touched.lastName && error.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  id="email"
                  type="email"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    e.preventDefault();
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email"
                  value={email}
                  error={Boolean(touched.email) && Boolean(error.email)}
                  helperText={touched.email && error.email}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  id="password"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    e.preventDefault();
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter your password"
                  value={password}
                  error={Boolean(touched.password) && Boolean(error.password)}
                  helperText={touched.password && error.password}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  id="passwordConfirm"
                  type="password"
                  label="Password Confirm"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    e.preventDefault();
                    setPasswordConfirm(e.target.value);
                  }}
                  placeholder="Confirm your password"
                  value={passwordConfirm}
                  error={
                    Boolean(touched.passwordConfirm) &&
                    Boolean(error.passwordConfirm)
                  }
                  helperText={touched.passwordConfirm && error.passwordConfirm}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  id="image"
                  type="file"
                  label="image"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    e.preventDefault();
                    setImage(e.target.value);
                  }}
                  placeholder="Enter your image"
                  value={image}
                  error={Boolean(touched.image) && Boolean(error.image)}
                  helperText={touched.image && error.image}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  id="location"
                  type="text"
                  label="Location"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    e.preventDefault();
                    setLocation(e.target.value);
                  }}
                  placeholder="Enter your location"
                  value={location}
                  error={Boolean(touched.location) && Boolean(error.location)}
                  helperText={touched.location && error.location}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  id="occupation"
                  type="text"
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    e.preventDefault();
                    setOccupation(e.target.value);
                  }}
                  placeholder="Enter your occupation"
                  value={occupation}
                  error={
                    Boolean(touched.occupation) && Boolean(error.occupation)
                  }
                  helperText={touched.occupation && error.occupation}
                  sx={{ gridColumn: "span 2" }}
                />
              </>
            </Box>
            <Button type="submit">
              {isLoading ? "Signing Up" : " Sign Up"}
            </Button>
            {isSuccess && (
              <Typography>
                Sign up was successful. Please check your email to activate your
                account.
              </Typography>
            )}
            {error && (
              <Typography sx={{ color: "red" }}>
                Login failed: {error.message}
              </Typography>
            )}
          </form>
        )}
      </Formik>
    </>
  );
}

export default SignUpPage;
