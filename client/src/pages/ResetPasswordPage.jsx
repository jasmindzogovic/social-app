import { useParams } from "react-router-dom";

import SociopediaHeader from "../components/SociopediaHeader";
import FormResetPassword from "../components/FormResetPassword";

function ResetPasswordPage() {
  const { token } = useParams();

  return (
    <>
      <SociopediaHeader />
      <FormResetPassword token={token} />
    </>
  );
}

export default ResetPasswordPage;
