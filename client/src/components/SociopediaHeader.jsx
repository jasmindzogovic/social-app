import { useNavigate } from "react-router-dom";
import { Box, Button, useTheme } from "@mui/material";

function SociopediaHeader() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
    sx={{width:"100%",
      height:"auto",
      backgroundColor:`${theme.palette.background.alt}`,
      p:"1rem 6%",
      textAlign:"center"}}
      
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
