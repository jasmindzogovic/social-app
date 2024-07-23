import axios from "axios";

export async function signUp() {}

export async function logIn() {
  const data = axios
    .get("127.0.0.1:8000/api/v1/users/login")
    .then((res) => res.data);

  console.log(data);
}

export async function logOut() {}

export async function forgotPassword() {}

export async function resetPassword() {}
