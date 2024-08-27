import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Typography, useTheme, Box } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";

import { getAllPosts } from "../services/posts";

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
        posts.map((post) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "auto",
              m: "2rem 0",
              p: "1rem",
              borderRadius: "5px",
              backgroundColor: palette.background.alt,
            }}
            key={post._id}
          >
            <Box sx={{ height: "auto", width: "auto", fontSize: "1.5rem" }}>
              {post.description}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "start" }}>
              <Typography mr=".5rem">{post.likes}</Typography>
              <ThumbUp />
            </Box>
            <Box>
              {post.comments.map((comment) => (
                <Box key={comment._id}>{comment.comment}</Box>
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
