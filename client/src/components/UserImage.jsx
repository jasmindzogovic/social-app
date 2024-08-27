import { Box } from "@mui/material";

function UserImage({ image, size = "60px" }) {
  return (
    <Box sx={{ width: `${size}`, height: `${size}` }}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`data:image/jpeg;base64,${image}`}
      />
    </Box>
  );
}

export default UserImage;
