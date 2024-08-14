import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { signUpVerification } from "../services/auth";

function SignUpVerificationPage() {
  const { activationString } = useParams();

  const { data, isLoading, error, isSuccess } = useQuery({
    queryFn: () => signUpVerification(activationString),
    queryKey: [activationString],
  });

  if (isLoading) {
    return <Typography variant="h3">Verifying your email...</Typography>;
  }

  if (error) {
    console.error("Verification error", error);
    return (
      <Typography sx={{ color: "red" }} variant="h3">
        Error occurred: {error.message}
      </Typography>
    );
  }

  if (isSuccess) {
    return (
      <Typography variant="h3">
        Account has been verified. You may log in to your account now.
      </Typography>
    );
  }

  return null;
}

export default SignUpVerificationPage;
