import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  Box,
  Button,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  ListItemButton,
  ListItemText,
  ListItem,
  List,
} from "@mui/material";

import {
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";

import { useLogOut } from "../pages/useLogOut";
import { getAllUsers } from "../services/users";

function NavBar({ data }) {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [userClicked, setUserClicked] = useState(false);
  const navigate = useNavigate();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { mutate, isLoading, error } = useLogOut();

  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["user"],
  });

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  const fullName = `${data.data.user.firstName} ${data.data.user.lastName}`;
  const { users } = usersData ? usersData.data : [];

  function handleLogOut() {
    mutate();
  }

  function handleClick(userId) {
    setUserClicked(true);
    navigate(`/profile/${userId}`);
  }

  function handleFocus(e) {
    e.target.placeholder = "";
  }

  function handleBlur(e) {
    e.target.placeholder = "Search...";
    setTimeout(() => {
      if (userClicked) {
        setSearchTerm("");
        setUsersList([]);
      }
    }, 200);
  }

  function handleKeyUp(e) {
    if (e.key === "Backspace" && searchTerm.length < 2) {
      setSearchTerm("");
      setUsersList([]);
    }

    setSearchTerm(e.target.value.toLowerCase());

    if (searchTerm.length < 2) return;

    const filter = users.filter((user) =>
      user.firstName.toLowerCase().includes(searchTerm)
    );
    setUsersList(filter);
  }

  return (
    <Box
      sx={{
        height: "60px",
        padding: "0.5rem 1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: alt,
      }}
    >
      <Box
        sx={{
          gap: "1.75rem",
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "clamp(1rem, 2rem, 2.25rem)",
            color: theme.palette.primary.main,
            cursor: "pointer",
          }}
          onClick={() => navigate(`/home/${data.data.user._id}`)}
        >
          Sociopedia
        </Typography>
        {isNonMobileScreens && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: neutralLight,
              borderRadius: "9px",
              padding: "0.1rem 1.5rem",
              position: "relative",
              width: "100%",
              maxWidth: "22.5rem",
            }}
          >
            <InputBase
              placeholder="Search..."
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyUp={handleKeyUp}
              sx={{ width: "100%" }}
            />
            {usersList.length > 0 && (
              <List
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  width: "100%",
                  backgroundColor: theme.palette.background.alt,
                  borderRadius: "9px",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                  zIndex: 10,
                }}
              >
                {usersList.map((user) => (
                  <ListItem key={user._id}>
                    <ListItemButton
                      onClick={() => handleClick(user._id)}
                      sx={{ "&:hover": { backgroundColor: "transparent" } }}
                    >
                      <ListItemText
                        primary={user.firstName}
                        sx={{ textAlign: "center", pb: "1rem" }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        )}
      </Box>

      {isNonMobileScreens ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            marginLeft: "10rem",
          }}
        >
          <IconButton sx={{ flexShrink: 1, width: "45px" }}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
        </Box>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          sx={{
            position: "fixed",
            right: "0",
            bottom: "0",
            height: "100%",
            zIndex: "10",
            maxWidth: "500px",
            minWidth: "300px",
            backgroundColor: background,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: "1rem" }}>
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <IconButton sx={{ fontSize: "25px" }}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "120px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": { pr: "0.25rem", width: "2rem" },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem>Log Out</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      )}
      <Button onClick={handleLogOut} sx={{ width: "10rem" }}>
        {isLoading ? "Logging out" : "Log out"}
        {error && (
          <Typography>
            Error while trying to log out. {error.message}
          </Typography>
        )}
      </Button>
    </Box>
  );
}
export default NavBar;
