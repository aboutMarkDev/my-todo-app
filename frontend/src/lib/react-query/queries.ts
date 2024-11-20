import { useMutation } from "@tanstack/react-query";
import { logout, signIn, signUp } from "../api";
import { UserData } from "../../types";

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
