import axios from "axios";

export async function signUp() {}

export async function logIn(email, password) {
  try {
    const res = await axios.post("http://127.0.0.1:8000/api/v1/users/login", {
      email,
      password,
    });

    console.log("Login response", res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function logOut() {}

export async function forgotPassword() {}

export async function resetPassword() {}
