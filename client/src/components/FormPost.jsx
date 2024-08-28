import {
  Box,
  Divider,
  Typography,
  useTheme,
  TextField,
  Button,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

import { useCreatePost } from "../pages/useCreatePost";
import UserImage from "./UserImage";
import toast from "react-hot-toast";

const postSchema = yup
  .object()
  .shape({ description: yup.string().required("required") });

function FormPost({ image }) {
  const { mutate, isLoading, error } = useCreatePost();
  const { palette } = useTheme();

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    mutate(values, {
      onSucess: () => {
        resetForm();
        toast.success("Post was created successfully.");
      },
      onError: (error) => {
        console.error("Posting failed", error.message);
        toast.error(`Posting failed ${error.message}`);
      },
      onSettled: () => setSubmitting(false),
    });
  };

  return (
    <Box
      sx={{
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        height: "auto",
        bgcolor: palette.background.alt,
        padding: "1rem 2rem",
        borderRadius: "5px",
      }}
    >
      <UserImage image={image} />
      <Divider />
      <Formik
        initialValues={{ description: "" }}
        validationSchema={postSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Box>
              <Field
                name="description"
                id="description"
                as={TextField}
                type="text"
                label="Whats on your mind..."
                placeholder="Enter your post"
                fullWidth
                error={
                  Boolean(touched.description) && Boolean(errors.description)
                }
                helperText={touched.description && errors.description}
                sx={{ height: "auto", borderRadius: "10px", mt: "1rem" }}
              />
            </Box>
            <Button
              type="submit"
              disabled={isLoading}
              sx={{
                mt: "1rem",
                p: ".5rem",
                height: "auto",
                width: "2rem",
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                "&:hover": { color: palette.primary.dark },
              }}
            >
              {isLoading ? "Posting" : "Post"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default FormPost;
