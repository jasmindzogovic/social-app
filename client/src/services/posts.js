import axios from "axios";

export async function getAllPosts() {
  try {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/v1/posts",
      {},
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching the posts:", {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred while fetching the posts."
    );
  }
}

export async function createNewPost(description, image) {
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/v1/posts",
      { description, image },
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error creating a new post:", {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred while creating a new post."
    );
  }
}

export async function likePost(postId) {
  try {
    const res = await axios.patch(
      `http://127.0.0.1:8000/api/v1/posts/${postId}`,
      {},
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error liking post:", {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred while liking the post."
    );
  }
}

export async function getUserPosts() {
  try {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/v1/posts/user-posts",
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching this users posts:", {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred while fetching this users posts."
    );
  }
}
