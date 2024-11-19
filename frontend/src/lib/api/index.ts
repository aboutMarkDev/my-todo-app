import { UserData } from "../../types";

const url = import.meta.env.VITE_BACKEND_LOCAL_URL;

export const getCurrentUser = async () => {
  const res = await fetch(`${url}/user/current`, {
    credentials: "include", // Include credentials (cookies, authorization headers)
  });

  if (!res.ok) {
    return false;
  }

  const data = await res.json();
  return data;
};

export const signIn = async (userData: UserData) => {
  const res = await fetch(`${url}/user/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const { message } = await res.json();

  if (!res.ok) {
    throw message;
  }

  return message;
};

export const logout = async () => {
  const res = await fetch(`${url}/user/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();
  return data;
};
