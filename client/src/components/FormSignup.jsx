import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import * as yup from "yup";
import { Formik } from "formik";

import { useSignUp } from "../pages/useSignUp";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("required"),
  image: yup.mixed().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
});

function FormSignup() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const { mutate, isLoading, isSuccess, error } = useSignUp();

  const handleSubmit = (values) => {
    mutate(values);
  };

  return (
    <Box>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          passwordConfirm: "",
          image: "",
          location: "",
          occupation: "",
        }}
        validationSchema={registerSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (values.image) {
            const reader = new FileReader();

            reader.onloadend = () => {
              values.image = reader.result;
              handleSubmit(values);
            };
            reader.readAsDataURL(values.image);
          } else {
            handleSubmit(values);
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                backgroundColor: `${theme.palette.background.default}`,
                p: "2rem",
                display: "grid",
                gap: "20px",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridTemplateRows: "repeat(4,auto)",
              }}
            >
              <TextField
                id="firstName"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter your first name"
                value={values.firstName}
                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{ width: "100%", height: "auto" }}
              />
              <TextField
                id="lastName"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter your last name"
                value={values.lastName}
                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{ width: "100%", height: "auto" }}
              />
              <TextField
                id="email"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter your email"
                value={values.email}
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ width: "100%", height: "auto" }}
              />
              <TextField
                id="password"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter your password"
                value={values.password}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ width: "100%", height: "auto" }}
              />
              <TextField
                id="passwordConfirm"
                type="password"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Confirm your password"
                value={values.passwordConfirm}
                error={
                  Boolean(touched.passwordConfirm) &&
                  Boolean(errors.passwordConfirm)
                }
                helperText={touched.passwordConfirm && errors.passwordConfirm}
                sx={{ width: "100%", height: "auto" }}
              />
              <TextField
                id="location"
                type="text"
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter your location"
                value={values.location}
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                sx={{ width: "100%", height: "auto" }}
              />
              <TextField
                id="occupation"
                type="text"
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter your occupation"
                value={values.occupation}
                error={
                  Boolean(touched.occupation) && Boolean(errors.occupation)
                }
                helperText={touched.occupation && errors.occupation}
                sx={{ width: "100%", height: "auto" }}
              />
              <Box
                sx={{
                  gridColumn: "span 2",
                  border: `1px solid ${theme.palette.neutral.medium}`,
                  borderRadius: "5px",
                  p: "1rem",
                  maxWidth: "400px",
                  mx: "auto",
                }}
              >
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("image", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      sx={{
                        "&:hover": { cursor: "pointer" },
                        border: `2px dashed ${theme.palette.primary.main}`,
                        p: ".5rem",
                      }}
                    >
                      <input {...getInputProps()} />
                      <Typography>
                        {values.image ? (
                          values.image.name
                        ) : (
                          <>
                            "Drag and drop or click to select an image"
                            <EditOutlined />
                          </>
                        )}
                      </Typography>
                    </Box>
                  )}
                </Dropzone>
                {touched.image && errors.image && (
                  <Typography color="error">{errors.image}</Typography>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                height: "auto",
              }}
            >
              <Button
                type="submit"
                sx={{
                  mt: 3,
                  mb: 2,
                  maxWidth: "200px",
                  mx: "auto",
                  height: "3rem",
                  color: "white",
                }}
                variant="contained"
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
              <Button
                onClick={() => navigate("/")}
                type="submit"
                sx={{
                  mt: 3,
                  mb: 2,
                  maxWidth: "200px",
                  mx: "auto",
                  height: "3rem",
                  color: "white",
                }}
                variant="contained"
              >
                Already a member? Log in here.
              </Button>
            </Box>
            {isSuccess && (
              <Typography textAlign="center">
                Sign up was successful. Please check your email to activate your
                account.
              </Typography>
            )}
            {error && (
              <Typography color="error" textAlign="center">
                Sign up failed: {error.message}
              </Typography>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default FormSignup;
