import { useParams } from "react-router-dom";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import SociopediaHeader from "../components/SociopediaHeader";

import { signUpVerification } from "../services/auth";

function SignUpVerificationPage() {
  const navigate = useNavigate();
  const { activationString } = useParams();

  const { isLoading, error, isSuccess } = useQuery({
    queryFn: () => signUpVerification(activationString),
    queryKey: [activationString],
  });

  return (
    <>
      <SociopediaHeader />
      {isLoading && <CircularProgress sx={{ mt: "1rem" }} />}
      {error && (
        <Typography
          sx={{ color: "red", textAlign: "center", mt: "1rem" }}
          variant="h4"
        >
          Error occurred: {error.message}
        </Typography>
      )}
      {isSuccess && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Typography variant="h4" sx={{ textAlign: "center", mt: "1rem" }}>
            Account has been verified. You may log in to your account now.
            <Button
              type="submit"
              onClick={() => navigate("/")}
              sx={{ width: "10rem", height: "auto" }}
            >
              Take me to login page. &rarr;
            </Button>
          </Typography>
        </Box>
      )}
    </>
  );
}

export default SignUpVerificationPage;
