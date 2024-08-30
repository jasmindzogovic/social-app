import { Box, useMediaQuery, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import NavBar from "../components/NavBar";
import Users from "../components/Users";
import PostWidget from "../components/PostWidget";
import UserWidget from "../components/UserWidget";
import SociopediaHeader from "../components/SociopediaHeader";

import { getUser } from "../services/users";

function ProfilePage() {
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-wdith:1000px)");

  const { data, isLoading, error } = useQuery({
    queryFn: () => getUser(userId),
    queryKey: ["user", userId],
  });

  if (isLoading)
    return (
      <>
        <SociopediaHeader />
        <CircularProgress />
      </>
    );

  if (error) return <div>There was an error fetching the user.</div>;

  const { firstName, lastName, image, location, occupation, friends } =
    data.data.user;

  return (
    <Box>
      <NavBar data={data} />
      <Box
        sx={{
          width: "100%",
          p: "2rem 6%",
          display: `${isNonMobileScreens ? "flex" : "block"}`,
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        <Box sx={{ flexBasis: `${isNonMobileScreens ? "26%" : undefined}` }}>
          <UserWidget
            firstName={firstName}
            lastName={lastName}
            image={image}
            location={location}
            occupation={occupation}
            friends={friends}
          />
        </Box>
        <Box
          sx={{
            flexBasis: `${isNonMobileScreens ? "42%" : undefined}`,
            mt: `${isNonMobileScreens ? undefined : "2rem"}`,
          }}
        >
          <PostWidget image={image} />
        </Box>
      </Box>
    </Box>
  );
}

export default ProfilePage;
