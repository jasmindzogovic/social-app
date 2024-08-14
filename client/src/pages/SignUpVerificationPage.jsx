import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "react-router-dom";

import { signUpVerification } from "../services/auth";

function SignUpVerificationPage() {
  const navigate = useNavigation();
  const { activationString } = useParams();

  const { data, isLoading, error } = useQuery({
    queryFn: () => {
      signUpVerification(activationString);
      navigate("/home", { replace: true });
    },
    queryKey: [param],
  });

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
