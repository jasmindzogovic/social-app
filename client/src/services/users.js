import axios from "axios";
axios.defaults.withCredentials = true;

export async function getAllUsers() {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/v1/users", {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching users:", {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred while fetching users."
    );
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
    console.error("Error fetching user:", {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred while fetching user."
    );
  }
}

export async function addOrRemoveFriends(operation, friendID, userId) {
  try {
    const res = await axios.patch(
      `http://127.0.0.1:8000/api/v1/users/${userId}`,
      { operation, friendID },
      { withCredentials: true }
    );

    return res.data;
  } catch (error) {
    console.error(
      `Error ${
        operation === "add" ? "adding" : "removing"
      } user from friends list:`,
      {
        message: error.message,
        response: error.response ? error.response.data : null,
        status: error.response ? error.response.status : null,
      }
    );
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        `An error occurred while ${
          operation === "add" ? "adding" : "removing"
        } user from friends list.`
    );
  }
}
