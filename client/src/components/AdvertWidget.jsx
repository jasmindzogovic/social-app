import { Box, Typography, useTheme } from "@mui/material";

function AdvertWidget() {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: palette.background.alt,
        p: "1rem",
        height: "auto",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
        borderRadius: "5px",
        mb: "2rem",
      }}
    >
      <Box>
        <Typography color={palette.neutral.dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={palette.neutral.medium}>Create Ad</Typography>
      </Box>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhist:8000/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <Box>
        <Typography color={palette.neutral.main}>MikaCosmetics</Typography>
        <Typography color={palette.neutral.medium}>
          mikacosmetics.com
        </Typography>
      </Box>
      <Typography color={palette.neutral.medium}>
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating and shining like a light.
      </Typography>
    </Box>
  );
}

export default AdvertWidget;
