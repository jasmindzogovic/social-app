import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import { logOut } from "../services/auth";

function HomePage() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryFn: () => logOut(),
  });

  return (
    <>
      <Box>
        <NavBar />
      </Box>
      {isLoading && <Typography>Logging in..</Typography>}

      <Typography>Home Page</Typography>
      <Button
        onClick={() => {
          mutate();
          navigate("/", { replace: true });
        }}
      >
        Log Out
      </Button>
      {error && (
        <Typography sx={{ color: "red" }}>
          There was an error logging you out. Please try again later.
        </Typography>
      )}
    </>
  );
}

export default HomePage;
