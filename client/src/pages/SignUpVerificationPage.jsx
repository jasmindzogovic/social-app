import { useParams } from "react-router-dom";
import { useEffect } from "react";

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
    return <p>Verifying your email...</p>;
  }

  if (isSuccess) {
    return <p>User verification complete. You can log in now.</p>;
  }

  if (error) {
    console.error("Verification error", error);
    return <p>Error occurred: {error.message}</p>;
  }

  return null;
}

export default SignUpVerificationPage;
