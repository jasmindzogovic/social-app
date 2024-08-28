import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

import { useForgotPassword } from "../pages/useForgotPassword";
import toast from "react-hot-toast";

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
});

function FormForgotPassword() {
  const { mutate, isLoading, isSuccess, error } = useForgotPassword();

  function handleSubmit(values, { setSubmitting, resetForm }) {
    mutate(values, {
      onSuccess: () => {
        resetForm();
        toast.success(
          "An email with password reset instructions has been sent to your email."
        );
      },
      onError: (error) => {
        console.error(
          "There was an error while submitting the forgot password form.",
          error.message
        );
        toast.error(
          "There was an error while submitting the form.",
          error.message
        );
      },
      onSettled: () => setSubmitting(false),
    });
  }

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={forgotPasswordSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: "2rem",
            }}
          >
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
              sx={{ height: "auto", width: "auto", mb: "1rem" }}
            />
            <Button
              type="submit"
              disabled={isLoading}
              sx={{ height: "auto", width: "auto", fontSize: "1rem" }}
            >
              {isLoading ? "Sending..." : "Forgot Password"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default FormForgotPassword;
