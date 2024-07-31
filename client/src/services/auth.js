import axios from "axios";

export async function signUp(
  firstName,
  lastName,
  email,
  password,
  passwordConfirm,
  image,
  location,
  occupation
) {
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/v1/users/signup",
      {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
        image,
        location,
        occupation,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    return res.data;
  } catch (error) {
    console.error(
      "Sign up error",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response
        ? error.response.data.message
        : "An error occurred during sign up."
    );
  }
}

export async function logIn(email, password) {
  try {
    const res = await axios.post("http://127.0.0.1:8000/api/v1/users/login", {
      email,
      password,
    });

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function logOut() {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/v1/users/logout");
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function forgotPassword(email) {
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/v1/users/forgotPassword",
      { email }
    );

    console.log("Password reset email sent successfully.", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "Error sending password reset email:",
      error.response ? error.response.data : error.message
    );
    throw new Error(error.response ? error.response.data : error.message);
  }
}

export async function resetPassword() {}
