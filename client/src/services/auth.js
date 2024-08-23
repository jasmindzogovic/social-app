import axios from "axios";
axios.defaults.withCredentials = true;

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

export async function signUpVerification(param) {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/v1/users/verify/${param}`
    );

    return res.data;
  } catch (error) {
    console.error(
      "Sign up verification error",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response
        ? error.response.data.message
        : "An error occurred during sign up verification."
    );
  }
}

export async function logIn(email, password) {
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/v1/users/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    return res.data;
  } catch (error) {
    console.error(
      "Log in error",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response
        ? error.response.data.message
        : "An error occurred during log in."
    );
  }
}

export async function logOut() {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/v1/users/logout", {
      withCredentials: true,
    });

    return res;
  } catch (error) {
    console.error(
      "Log out error",
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response
        ? error.response.data.message
        : "An error occurred during log out."
    );
  }
}

export async function forgotPassword(email) {
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/v1/users/forgotPassword",
      { email }
    );

    return res.data;
  } catch (error) {
    console.error(
      "Error sending password reset email:",
      error.response ? error.response.data : error.message
    );
    throw new Error(error.response ? error.response.data : error.message);
  }
}

export async function resetPassword(password, passwordConfirm, { token }) {
  try {
    const res = await axios.patch(
      `http://127.0.0.1:8000/api/v1/users/resetPassword/${token}`,
      { password, passwordConfirm }
    );

    return res.data;
  } catch (error) {
    console.error(
      "Error resetting password:",
      error.response ? error.response.data : error.message
    );
    throw new Error(error.response ? error.response.data : error.message);
  }
}
