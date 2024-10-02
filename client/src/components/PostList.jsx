import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Typography, useTheme, Box } from "@mui/material";
import { FavoriteBorder, FavoriteOutlined } from "@mui/icons-material";

import UserImage from "./UserImage";

import { getAllPosts } from "../services/posts";
import { useLikePost } from "../pages/useLikePost";

function PostList({ userId }) {
  const { palette } = useTheme();
  const { mutate } = useLikePost();

  const { data, isLoading, error } = useQuery({
    queryFn: getAllPosts,
    queryKey: ["post"],
  });

  function handleLike(postId) {
    mutate({ postId });
  }

  if (isLoading)
    return (
      <CircularProgress sx={{ display: "block", m: "auto", mt: "1rem" }} />
    );

  if (error && error !== null)
    return (
      <Box sx={{ mt: "1rem", textAlign: "center" }}>
        Error loading posts: {error.message}
      </Box>
    );

  const { posts } = data ? data.data : [];

  return (
    <Box>
      {posts && posts.length > 0 ? (
        posts.map(
          ({
            _id,
            description,
            likes,
            comments,
            createdAt,
            user,
            likedBy,
            image,
          }) => {
            const hasLiked = likedBy.includes(userId);

            return (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "auto",
                  m: "2rem 0",
                  p: "1rem",
                  borderRadius: "5px",
                  backgroundColor: palette.background.alt,
                  boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
                }}
                key={_id}
              >
                <Box sx={{ height: "auto", width: "auto", fontSize: "1.5rem" }}>
                  {description}
                </Box>
                <Box>
                  <img src={image} />
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", mb: "1rem" }}
                  onClick={() => handleLike(_id)}
                >
                  <Typography mr=".5rem" width="auto">
                    {likes}
                  </Typography>
                  {hasLiked ? (
                    <FavoriteOutlined sx={{ cursor: "pointer" }} />
                  ) : (
                    <FavoriteBorder sx={{ cursor: "pointer" }} />
                  )}
                </Box>
                <Box>{createdAt}</Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    mt: "1rem",
                    alignItems: "center",
                  }}
                >
                  <UserImage image={user.image} size="40px" />
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
                        mb: "1rem",
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
            );
          }
        )
      ) : (
        <Box>No Posts available</Box>
      )}
    </Box>
  );
}

export default PostList;
