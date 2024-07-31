import { Button } from "@mui/material";

import { useLogout } from "./useLogout";

function HomePage() {
  const { mutate, isLoading, error } = useLogout();

  return (
    <>
      {isLoading && <p>Logging out..</p>}

      <div>Home Page</div>
      <Button onClick={mutate}>Log Out</Button>
      {error && (
        <p>There was an error logging you out. Please try again later.</p>
      )}
    </>
  );
}

export default HomePage;
