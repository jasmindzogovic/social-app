import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

import { useLogin } from "../pages/useLogin";
import toast from "react-hot-toast";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

function FormLogin() {
  const { mutate, isLoading } = useLogin();

  function handleSubmit(values, { setSubmitting, resetForm }) {
    mutate(values, {
      onSuccess: () => {
        resetForm();
        toast.success("Login was successful.");
      },
      onError: (error) => {
        console.error("Login failed", error.message);
        toast.error(`Login failed: ${error.message}`);
      },
      onSettled: () => setSubmitting(false),
    });
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <Field
              name="email"
              id="email"
              as={TextField}
              type="email"
              label="Email"
              placeholder="Enter your email"
              fullWidth
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ height: "auto" }}
            />
            <Field
              name="password"
              id="password"
              as={TextField}
              type="password"
              label="Password"
              placeholder="Enter your password"
              fullWidth
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ height: "auto" }}
            />
          </Box>
          <Button
            type="submit"
            disabled={isLoading}
            sx={{ mt: "1rem", p: ".5rem" }}
          >
            {isLoading ? "Logging In" : "Log In"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default FormLogin;
