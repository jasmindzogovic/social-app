import { useQuery } from "@tanstack/react-query";
import { Box, Divider, Button, useTheme } from "@mui/material";
import { PersonAdd, PersonRemove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useAddRemoveFriends } from "../pages/useAddRemoveFriends";
import { getAllUsers } from "../services/users";
import { CircularProgress } from "@mui/material";
import UserImage from "./UserImage";
import { useState } from "react";

function Users({ userId, friends }) {
  const navigate = useNavigate();
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
        borderRadius: "5px",
      }}
    >
      {users.map((user) => {
        const isFriend =
          friends && friends.find((friend) => friend._id === user._id);

        return (
          <Box key={user._id} sx={{ height: "auto" }}>
            <Box sx={{ display: "flex" }}>
              <UserImage image={user.image} />
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
                    }}
                    onClick={() => handleAddRemoveFriend("add", user._id)}
                  >
                    <PersonAdd />
                  </Button>
                )}
              </Box>
            </Box>
            <Divider sx={{ mb: "1rem", p: "1rem" }} />
          </Box>
        );
      })}
    </Box>
  );
}

export default Users;
