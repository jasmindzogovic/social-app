import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Alert, Button, Snackbar, Typography } from "@mui/material";

import { getUser } from "../services/users";
import { useAddRemoveFriends } from "./useAddRemoveFriends";
import NavBar from "../components/NavBar";
import UserWidget from "../components/UserWidget";

function ProfilePage() {
  const { userId } = useParams();
  const {
    isLoading: friendListLoading,
    mutate,
    status,
    error: friendListError,
  } = useAddRemoveFriends();

  const { data, isLoading, error } = useQuery({
    queryFn: () => getUser(userId),
    queryKey: ["user", userId],
  });

  console.log(data);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>There was an error fetching the user.</div>;

  function handleAddRemoveFriend(operation, friendID) {
    if (!operation || !friendID || !userId) return;

    mutate({ operation, friendID, userId });
  }

  return (
    <>
      <NavBar data={data} />
      <UserWidget />
      <div>
        {data.data.user.friends
          ? data.data.user.friends.map((friend) => {
              return (
                <div key={friend._id}>
                  <Typography variant="h4">
                    {friend.firstName} {friend.lastName}
                  </Typography>
                  <Button
                    type="submit"
                    onClick={() => handleAddRemoveFriend("add", friend._id)}
                  >
                    {friendListLoading && status !== "success"
                      ? "Adding to friends list"
                      : "Add"}
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => handleAddRemoveFriend("remove", friend._id)}
                  >
                    {friendListLoading && status !== "success"
                      ? "Removing from friends list"
                      : "Remove"}
                  </Button>
                </div>
              );
            })
          : ""}
      </div>
      {friendListError && (
        <Snackbar open={Boolean(friendListError)} autoHideDuration={6000}>
          <Alert severity="error">
            There was an error processing your request:{" "}
            {friendListError.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default ProfilePage;
