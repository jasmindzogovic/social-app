import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Alert, Button, Snackbar, Typography } from "@mui/material";

import { getUser } from "../services/users";
import { useAddRemoveFriends } from "./useAddRemoveFriends";

function ProfilePage() {
  const { userId } = useParams();
  const {
    isLoading: addingRemovingLoading,
    mutate,
    status,
    error: mutationError,
  } = useAddRemoveFriends();

  const { data, isLoading, error } = useQuery({
    queryFn: () => getUser(userId),
    queryKey: ["user", userId],
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>There was an error fetching the user.</div>;

  function handleAddRemoveFriend(operation, friendID) {
    if (!operation || !friendID || !userId) return;

    mutate({ operation, friendID, userId });
  }

  return (
    <>
      <Typography variant="h3">{data.data.user.firstName}</Typography>
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
                    {addingRemovingLoading && status !== "success"
                      ? "Adding to friends list"
                      : "Add"}
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => handleAddRemoveFriend("remove", friend._id)}
                  >
                    {addingRemovingLoading && status !== "success"
                      ? "Removing from friends list"
                      : "Remove"}
                  </Button>
                </div>
              );
            })
          : ""}
      </div>
      {mutationError && (
        <Snackbar open={Boolean(mutationError)} autoHideDuration={6000}>
          <Alert severity="error">
            There was an error processing your request: {mutationError.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default ProfilePage;
