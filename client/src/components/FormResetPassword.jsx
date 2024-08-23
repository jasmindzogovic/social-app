import { Box, TextField, Button, Typography } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";

import { useResetPassword } from "../pages/useResetPassword";

const resetPasswordSchema = yup.object().shape({
  password: yup.string().required("required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("required"),
});

function FormResetPassword({ token }) {
  const { isLoading, mutate, isSuccess, error } = useResetPassword();

  function handleSubmit(values, { setSubmitting, resetForm }) {
    mutate(values, {
      onSuccess: () => resetForm(),
      onError: (error) => {
        console.error(
          "There was an error while submitting the reset password form.",
          error.message
        );
      },
      onSettled: () => setSubmitting(false),
    });
  }
  return (
    <Formik
      initialValues={{ password: "", passwordConfirm: "", token }}
      validationSchema={resetPasswordSchema}
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
              name="password"
              id="password"
              as={TextField}
              type="password"
              label="Password"
              placeholder="Enter your password"
              fullWidth
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ height: "auto", width: "auto", mb: "1rem" }}
            />
            <Field
              name="passwordConfirm"
              id="passwordConfirm"
              as={TextField}
              type="password"
              label="Password"
              placeholder="Confirm your password"
              fullWidth
              error={
                Boolean(touched.passwordConfirm) &&
                Boolean(errors.passwordConfirm)
              }
              helperText={touched.passwordConfirm && errors.passwordConfirm}
              sx={{ height: "auto", width: "auto", mb: "1rem" }}
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
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default FormResetPassword;
