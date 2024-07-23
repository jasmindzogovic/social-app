import { useQuery } from "@tanstack/react-query";
import { FormControl, FormLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";

import {
  signUp,
  logIn,
  logOut,
  forgotPassword,
  resetPassword,
} from "../services/auth";

function LoginPage() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const {
    status,
    error,
    data: user,
  } = useQuery({ queryKey: ["user"], queryFn: logIn });

  return (
    <>
      <FormControl autoComplete="off">
        <FormLabel htmlFor="email">Email</FormLabel>
        <TextField
          size="small"
          value={formik.values.email}
          id="email"
          type="email"
          placeholder="Enter your email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <TextField
          size="small"
          value={formik.values.password}
          id="password"
          type="password"
          placeholder="Enter your password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Button>Submit</Button>
      </FormControl>
    </>
  );
}

export default LoginPage;
