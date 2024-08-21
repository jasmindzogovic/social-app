import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineRounded,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "./UserImage";
import FlexBetween from "./FlexBetween";
import WidgetContainer from "./WidgetContainer";
import { useNavigate } from "react-router-dom";

function UserWidget({ firstName, lastName, image }) {
  const palette = useTheme();
  const navigate = useNavigate();

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  return <div></div>;
}

export default UserWidget;
