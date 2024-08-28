import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function BackButton() {
  const navigate = useNavigate();
  
  return (
    <Button
      onClick={() => navigate(-1)}
      sx={{
        width: "10rem",
        height: "auto",
        zIndex: 10,
        position: "absolute",
        "&:hover": { backgroundColor: "transparent" },
        mt: "1rem",
      }}
    >
      Go back
    </Button>
  );
}

export default BackButton;
