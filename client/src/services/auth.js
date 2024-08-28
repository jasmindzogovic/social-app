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
    console.error("Sign up error:", {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred during sign up."
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
    console.error("Sign up verification error:", {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred during sign up verification."
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
    console.error("Log in error:", {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred during log in."
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
    console.error("Log out error:", {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred during log out."
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
    console.error("Error sending password reset email:", {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred while sending password reset email."
    );
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
    console.error("Error resetting password:", {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred while resetting password."
    );
  }
}
