import { Box, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SociopediaHeader() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      width="100%"
      height="auto"
      backgroundColor={theme.palette.background.alt}
      p="1rem 6%"
      textAlign="center"
    >
      <Button
        type="submit"
        sx={{
          fontWeight: "bold",
          fontSize: "2rem",
          color: "primary",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={() => navigate("/")}
      >
        Sociopedia
      </Button>
    </Box>
  );
}

export default SociopediaHeader;
