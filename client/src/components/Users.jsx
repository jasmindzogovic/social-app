import { useQuery } from "@tanstack/react-query";
import { Box, Divider, useTheme } from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

import { useAddRemoveFriends } from "../pages/useAddRemoveFriends";
import { getAllUsers } from "../services/users";
import { CircularProgress } from "@mui/material";
import UserImage from "./UserImage";

function Users(userId) {
  const theme = useTheme();
  const { isLoading, mutate, error } = useAddRemoveFriends();

  const {
    data,
    isLoading: userIsLoading,
    error: userError,
  } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["user"],
  });

  function handleAddRemoveFriend(operation, friendID) {
    if (!operation || !friendID || !userId) return;

    mutate({ operation, friendID, userId });
  }

  if (userIsLoading) return <CircularProgress />;

  const { users } = data ? data.data : [];

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.alt,
        p: "1rem",
        height: "auto",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
      }}
    >
      {users.map((user) => (
        <Box key={user._id} sx={{ height: "auto" }}>
          <Box sx={{ display: "flex" }}>
            <UserImage image={user.image} />
            <Box sx={{ ml: "1rem" }}>
              <Box sx={{ fontSize: "1rem" }}>
                {user.firstName} {user.lastName}
              </Box>
              <Box>{user.location}</Box>
            </Box>
            <Box>
              <Box
                sx={{
                  cursor: "pointer",
                  "&:hover": { color: theme.palette.primary.main },
                }}
              >
                <AddCircle />
              </Box>
              <Box
                sx={{
                  cursor: "pointer",
                  "&:hover": { color: theme.palette.primary.main },
                }}
              >
                <RemoveCircle />
              </Box>
            </Box>
          </Box>
          <Divider sx={{ mb: "1rem", p: "1rem" }} />
        </Box>
      ))}
    </Box>
  );
}

export default Users;
