import {
  ManageAccountsOutlined,
  EditOutlined,
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
      height="auto"
      display="flex"
      p="1.5rem 1.5rem 0.75rem 1.5rem"
      width="20rem"
      sx={{ backgroundColor: palette.background.alt, borderRadius: "0.75rem" }}
    >
      <Box display="flex" flexDirection="column" gap="0.5rem" pb="1.1rem">
        <Box display="flex" gap="1rem">
          <UserImage image={image} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": { color: palette.primary.light, cursor: "pointer" },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium} fontWeight="bold">
              Friends: {friends ? friends.length : ""}
            </Typography>
          </Box>
          <ManageAccountsOutlined />
        </Box>
        <Divider />

        <Box
          display="flex"
          flexDirection='column'
          p="1rem 0"
          gap="1rem"
          alignItems="center"
          mb=".5rem"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="1rem"
          >
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="1rem"
          >
            <WorkOutlineRounded fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default UserWidget;
