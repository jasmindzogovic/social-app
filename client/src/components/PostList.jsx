import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Typography, useTheme, Box } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";

import { getAllPosts } from "../services/posts";
import UserImage from "./UserImage";

function PostList() {
  const { palette } = useTheme();

  const { data, isLoading, error } = useQuery({
    queryFn: getAllPosts,
    queryKey: ["post"],
  });

  if (isLoading)
    return <CircularProgress style={{ display: "block", margin: "auto" }} />;
  if (error) return <div>Error loading posts: {error.message}</div>;

  const { posts } = data ? data.data : [];

  return (
    <Box>
      {posts.length > 0 ? (
        posts.map(({ _id, description, likes, comments, createdAt, user }) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "auto",
              m: "2rem 0",
              p: "1rem",
              borderRadius: "5px",
              backgroundColor: palette.background.alt,
              boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;'
            }}
            key={_id}
          >
            <Box sx={{ height: "auto", width: "auto", fontSize: "1.5rem" }}>
              {description}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: "1rem" }}>
              <Typography mr=".5rem" width="auto">
                {likes}
              </Typography>
              <ThumbUp sx={{ cursor: "pointer" }} />
            </Box>
            <Box>{createdAt}</Box>
            <Box sx={{ display: "flex" }}>
              <UserImage image={user.image} />
              <Box sx={{ mb: "1rem" }}>
                {user.firstName} {user.lastName}
              </Box>
            </Box>
            <Box>
              {comments.map((comment) => (
                <Box
                  key={comment._id}
                  sx={{
                    backgroundColor: palette.primary.light,
                    mb: ".5rem",
                    padding: ".5rem",
                    borderRadius: "5px",
                    border: `2px solid ${palette.primary.dark}`,
                  }}
                >
                  {comment.comment}
                </Box>
              ))}
            </Box>
          </Box>
        ))
      ) : (
        <div>No Posts available</div>
      )}
    </Box>
  );
}

export default PostList;
