import { Box, Typography, useTheme } from "@mui/material";

function SociopediaHeader() {
    const theme = useTheme()
  return (
    <Box
      width="100%"
      height="auto"
      backgroundColor={theme.palette.background.alt}
      p="1rem 6%"
      textAlign="center"
    >
      <Typography fontWeight="bold" fontSize="32px" color="primary">
        Sociopedia
      </Typography>
    </Box>
  );
}

export default SociopediaHeader;
