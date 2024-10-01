import { useQuery } from "@tanstack/react-query";
import { Box, Divider, Button, useTheme } from "@mui/material";
import { PersonAdd, PersonRemove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useAddRemoveFriends } from "../pages/useAddRemoveFriends";
import { getAllUsers } from "../services/users";
import { CircularProgress } from "@mui/material";
import UserImage from "./UserImage";

function Users({ userId, friends }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { mutate } = useAddRemoveFriends();

  const {
    data,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["user"],
  });

  function handleAddRemoveFriend(operation, friendID) {
    if (!operation || !friendID || !userId) return;

    mutate({ operation, friendID, userId });
  }

  if (usersIsLoading) return <CircularProgress />;

  const { users } = data ? data.data : [];
  const filteredUsers = users.filter((user) => user._id !== userId);

  if (filteredUsers.length > 0)
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.background.alt,
          p: "1rem",
          height: "auto",
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
          borderRadius: "5px",
        }}
      >
        {filteredUsers.map((user) => {
          const isFriend =
            friends && friends.find((friend) => friend._id === user._id);

          return (
            <Box key={user._id} sx={{ height: "auto" }}>
              <Box sx={{ display: "flex", alignItems: 'center' }}>
                <Box>
                  <UserImage image={user.image} />
                </Box>
                <Box sx={{ ml: "1rem" }}>
                  <Box
                    sx={{ fontSize: "1rem", cursor: "pointer" }}
                    onClick={() => navigate(`/profile/${user._id}`)}
                  >
                    {user.firstName} {user.lastName}
                  </Box>
                  <Box>{user.location}</Box>
                </Box>
                <Box>
                  {isFriend ? (
                    <Button
                      sx={{
                        cursor: "pointer",
                        "&:hover": { color: theme.palette.primary.main },
                      }}
                      onClick={() => handleAddRemoveFriend("remove", user._id)}
                    >
                      <PersonRemove />
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        cursor: "pointer",
                        "&:hover": { color: theme.palette.primary.main },
                        width: "2rem",
                      }}
                      onClick={() => handleAddRemoveFriend("add", user._id)}
                    >
                      <PersonAdd />
                    </Button>
                  )}
                </Box>
              </Box>
              {filteredUsers.length > 1 && (
                <Divider sx={{ mb: "1rem", p: "1rem" }} />
              )}
            </Box>
          );
        })}
      </Box>
    );
}

export default Users;
