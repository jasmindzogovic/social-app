import axios from "axios";
axios.defaults.withCredentials = true;

export async function getAllUsers() {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/v1/users", {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error(
      "Error fetching user:",
      error.response ? error.response.data : error.message
    );
    throw new Error(error.response ? error.response.data : error.message);
  }
}

export async function getUser(userId) {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/v1/users/${userId}`,
      { withCredentials: true }
    );

    return res.data;
  } catch (error) {
    console.error(
      "Error fetching user:",
      error.response ? error.response.data : error.message
    );
    throw new Error(error.response ? error.response.data : error.message);
  }
}

export async function addOrRemoveFriends() {}
