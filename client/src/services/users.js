import axios from "axios";

export async function getAllUsers() {}

export async function getUser(userID) {
  try {
    const res = await axios(`http://127.0.0.1:8000/api/v1/users/${userID}`);
  } catch (error) {
    console.error(
      "Error fetching user:",
      error.response ? error.response.data : error.message
    );
    throw new Error(error.response ? error.response.data : error.message);
  }
}

export async function addOrRemoveFriends() {}
