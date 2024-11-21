import { UserData } from "../../types";

const url = import.meta.env.VITE_BACKEND_DEPLOYED_URL;

// USER API
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

export const signUp = async (userData: UserData) => {
  const res = await fetch(`${url}/user/register`, {
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

// TODO API
export const getTodoByUser = async () => {
  const res = await fetch(`${url}/todo/getTodoByUser`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw data.message;
  }

  return data;
};

export const addTodo = async (todo: string) => {
  const res = await fetch(`${url}/todo/add`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todo }),
  });

  const { message } = await res.json();

  if (!res.ok) {
    throw message;
  }

  return message;
};

export const editTodo = async (updatedTodo: string, todoId: string) => {
  const res = await fetch(`${url}/todo/edit/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updatedTodo }),
  });

  const { message } = await res.json();

  if (!res.ok) {
    throw message;
  }

  return message;
};

export const deleteTodo = async (todoId: string) => {
  const res = await fetch(`${url}/todo/delete/${todoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { message } = await res.json();

  if (!res.ok) {
    throw message;
  }

  return message;
};

export const toggleDone = async (todoId: string, isDone: boolean) => {
  const res = await fetch(`${url}/todo/toggleDone/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isDone: !isDone }),
  });

  const { message } = await res.json();

  if (!res.ok) {
    throw message;
  }

  return res;
};
