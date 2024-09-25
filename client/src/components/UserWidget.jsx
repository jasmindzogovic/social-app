import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineRounded,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";

import UserImage from "./UserImage";

function UserWidget({
  firstName,
  lastName,
  image,
  location,
  occupation,
  friends,
}) {
  const { palette } = useTheme();

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  return (
    <Box
      sx={{
        backgroundColor: palette.background.alt,
        borderRadius: "5px",
        height: "auto",
        display: "flex",
        p: "1.5rem 1.5rem 0.75rem 1.5rem",
        width: "20rem",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          pb: "1.1rem",
        }}
      >
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <UserImage image={image} />
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "500",
                color: `${dark}`,
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography sx={{ color: `${medium}`, fontWeight: "bold" }}>
              Friends: {friends ? friends.length : ""}
            </Typography>
          </Box>
          <ManageAccountsOutlined />
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "1rem 0",
            gap: "1rem",
            alignItems: "center",
            mb: ".5rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <LocationOnOutlined sx={{ color: main, fontSize: "large" }} />
            <Typography sx={{ color: `${medium}` }}>{location}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <WorkOutlineRounded sx={{ color: main, fontSize: "large" }} />
            <Typography sx={{ color: `${medium}` }}>{occupation}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default UserWidget;
