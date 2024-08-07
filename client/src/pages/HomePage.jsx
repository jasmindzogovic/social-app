import { Box, Button } from "@mui/material";

import { useLogout } from "./useLogout";

import NavBar from "../components/NavBar";

function HomePage() {
  const { mutate, isLoading, error } = useLogout();

  return (
    <>
      <Box>
        <NavBar />
      </Box>
      {isLoading && <p>Logging in..</p>}

      <div>Home Page</div>
      <Button onClick={mutate}>Log Out</Button>
      {error && (
        <p>There was an error logging you out. Please try again later.</p>
      )}
    </>
  );
}

export default HomePage;
