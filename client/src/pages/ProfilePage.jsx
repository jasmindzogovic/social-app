import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery, Box, Typography } from "@mui/material";

import NavBar from "../components/NavBar";
import UserWidget from "../components/UserWidget";
import SociopediaHeader from "../components/SociopediaHeader";
import PostWidget from "../components/PostWidget";

import { getUser } from "../services/users";
import { useAddRemoveFriends } from "./useAddRemoveFriends";
import { getAllPosts } from "../services/posts";

function ProfilePage() {
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const {
    isLoading: friendListLoading,
    mutate,
    error: friendListError,
  } = useAddRemoveFriends();

  const { data, isLoading, error } = useQuery({
    queryFn: () => getUser(userId),
    queryKey: ["user", userId],
  });

  const {
    data: postData,
    isLoading: postLoadingStatus,
    error: postError,
  } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["post"],
  });

  if (isLoading)
    return (
      <>
        <SociopediaHeader />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading...
        </div>
        ;
      </>
    );

  if (error) return <div>There was an error fetching the user.</div>;

  const { firstName, lastName, image, location, occupation, friends } =
    data.data.user;

  function handleAddRemoveFriend(operation, friendID) {
    if (!operation || !friendID || !userId) return;

    mutate({ operation, friendID, userId });
  }

  return (
    <>
      <NavBar data={data} />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap=".5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
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
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <PostWidget image={image}/>
        </Box>
        {isNonMobileScreens && <Box flexBasis="26%"></Box>}
      </Box>
    </>
  );
}

export default ProfilePage;
