import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Typography } from "@mui/material";

import { useSignUpVerification } from "./useSignUpVerification";

function SignUpVerificationPage() {
  const { activationString } = useParams();
  const { isLoading, mutate, isSuccess, error } = useSignUpVerification();

  useEffect(() => {
    if (activationString) {
      mutate({ param: activationString });
    }
  }, [activationString, mutate]);

  if (isLoading) {
    return <Typography variant="h3">Verifying your email...</Typography>;
  }

  if (isSuccess) {
    return (
      <Typography variant="h3">
        User verification complete. You can log in now.
      </Typography>
    );
  }

  if (error) {
    console.error("Verification error", error);
    return (
      <Typography sx={{ color: "red" }} variant="h3">
        Error occurred: {error.message}
      </Typography>
    );
  }

  return null;
}

export default SignUpVerificationPage;
