import { Box, Button, Typography } from "@mui/material";

import { useLogout } from "./useLogout";

import NavBar from "../components/NavBar";

function HomePage() {
  const { mutate, isLoading, error } = useLogout();

  return (
    <>
      <Box>
        <NavBar />
      </Box>
      {isLoading && <Typography>Logging in..</Typography>}

      <Typography>Home Page</Typography>
      <Button onClick={mutate}>Log Out</Button>
      {error && (
        <Typography sx={{ color: "red" }}>
          There was an error logging you out. Please try again later.
        </Typography>
      )}
    </>
  );
}

export default HomePage;
