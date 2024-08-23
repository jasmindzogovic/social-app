import { useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { signUpVerification } from "../services/auth";
import SociopediaHeader from "../components/SociopediaHeader";

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
      {isLoading && (
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Verifying your email...
        </Typography>
      )}
      {error && (
        <Typography sx={{ color: "red", textAlign: "center" }} variant="h3">
          Error occurred: {error.message}
        </Typography>
      )}
      {isSuccess && (
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Account has been verified. You may log in to your account now.
          <Button type="submit" onClick={() => navigate("/")}>
            Take me to login page.
          </Button>
        </Typography>
      )}
    </>
  );
}

export default SignUpVerificationPage;
