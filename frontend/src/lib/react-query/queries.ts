import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTodo,
  deleteTodo,
  editTodo,
  getTodoByUser,
  logout,
  signIn,
  signUp,
  toggleDone,
} from "../api";
import { UserData } from "../../types";
import { QUERY_KEYS } from "./queryKeys";

// USER QUERIES
export const useLogin = () => {
  return useMutation({
    mutationFn: (userData: UserData) => signIn(userData),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (userData: UserData) => signUp(userData),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};

// TODO QUERIES
export const useGetTodosByUser = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_TODOS, userId],
    queryFn: getTodoByUser,
    enabled: !!userId,
  });
};

export const useAddTodo = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: string) => addTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_TODOS, userId],
      });
    },
  });
};

export const useEditTodo = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      updatedTodo,
      todoId,
    }: {
      updatedTodo: string;
      todoId: string;
    }) => editTodo(updatedTodo, todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_TODOS, userId],
      });
    },
  });
};

export const useDeleteTodo = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: string) => deleteTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_TODOS, userId],
      });
    },
  });
};

export const useToggleDone = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ isDone, todoId }: { isDone: boolean; todoId: string }) =>
      toggleDone(todoId, isDone),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_TODOS, userId],
      });
    },
  });
};
