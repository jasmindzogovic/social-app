import axios from "axios";

export async function getAllPosts() {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/v1/posts", {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error(
      "Error fetching posts:",
      error.response ? error.response.data : error.message
    );
    throw new Error(error.response ? error.response.data : error.message);
  }
}

export async function createNewPost(description) {
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/v1/posts",
      {
        withCredentials: true,
      },
      { description }
    );

    return res.data;
  } catch (error) {
    console.error(
      "Error creating a new post:",
      error.response ? error.response.data : error.message
    );
    throw new Error(error.response ? error.response.data : error.message);
  }
}

export async function likePost(userId) {
  try {
    const res = await axios.patch(
      `http://127.0.0.1:8000/api/v1/posts/${userId}`,
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    console.error(
      "Error liking post:",
      error.response ? error.response.data : error.message
    );
    throw new Error(error.response ? error.response.data : error.message);
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
    console.error(
      "Error fetching this users posts:",
      error.response ? error.response.data : error.message
    );
    throw new Error(error.response ? error.response.data : error.message);
  }
}
