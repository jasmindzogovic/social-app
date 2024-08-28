import axios from "axios";

export async function getPostComments(postId) {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/v1/comments/${postId}`,
      { withCredentials: true }
    );

    return res.data;
  } catch (error) {
    console.error("Error getting this posts comments:", {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred while getting this posts comments."
    );
  }
}

export async function createPostComment(commentBody, userId, postId) {
  try {
    const res = await axios.post(
      `http://127.0.0.1:8000/api/v1/comments/${postId}`,
      { withCredentials: true }
    );

    return res.data;
  } catch (error) {
    console.error("Error creating post comment:", {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred while creating post comment."
    );
  }
}
