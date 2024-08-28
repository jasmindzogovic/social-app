import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  useMediaQuery,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import NavBar from "../components/NavBar";
import UserWidget from "../components/UserWidget";
import SociopediaHeader from "../components/SociopediaHeader";
import PostWidget from "../components/PostWidget";
import Users from "../components/Users";

import { getUser } from "../services/users";

function ProfilePage() {
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

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
    <>
      <NavBar data={data} />
      <Box
        sx={{
          width: "100%",
          p: "2rem 6%",
          display: `${isNonMobileScreens ? "flex" : "block"}`,
          gap: ".5rem",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flexBasis: `${isNonMobileScreens ? "26%" : undefined}` }}>
          {isLoading ? (
            <Typography variant="h3">Loading...</Typography>
          ) : (
            <UserWidget
              firstName={firstName}
              lastName={lastName}
              image={image}
              location={location}
              occupation={occupation}
              friends={friends}
            />
          )}
        </Box>
        <Box
          sx={{
            flexBasis: `${isNonMobileScreens ? "42%" : undefined}`,
            mt: `${isNonMobileScreens ? undefined : "2rem"}`,
          }}
        >
          <PostWidget image={image}/>
        </Box>
        {isNonMobileScreens && (
          <Box sx={{ flexBasis: "26%" }}>
            <Users userId={userId} friends={friends}/>
          </Box>
        )}
      </Box>
    </>
  );
}

export default ProfilePage;
