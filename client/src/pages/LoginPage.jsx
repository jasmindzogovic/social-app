import {
  Button,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import FormLogin from "../components/FormLogin";

function LoginPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        width="100%"
        height="auto"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sociopedia
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "90%"}
        height='auto'
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem", height: "auto" }}
        >
          Welcome to Sociopedia, the Social Media for Sociopaths!
        </Typography>
        <FormLogin />
      <Box mt="1rem" display='flex'>  
        <Button
          onClick={() => navigate("/signup")}
          fullWidth
          sx={{ mb: "1rem" }}
        >
          Not a member yet? Sign up.
        </Button>
        <Button onClick={() => navigate("/forgot-password")} fullWidth>
          Forgot your password?
        </Button>
      </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
