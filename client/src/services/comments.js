import axios from "axios";

export async function getPostComments(postId) {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/v1/comments/${postId}`,
      { withCredentials: true }
    );

    return res.data;
  } catch (error) {
    console.error(
      "Error getting post comments:",
      error.response ? error.response.data : error.message
    );
    throw new Error(error.response ? error.response.data : error.message);
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
    console.error(
      "Error creating post comment:",
      error.response ? error.response.data : error.message
    );
    throw new Error(error.response ? error.response.data : error.message);
  }
}
