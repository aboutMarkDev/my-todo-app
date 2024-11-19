import { useMutation } from "@tanstack/react-query";
import { logout, signIn } from "../api";
import { UserData } from "../../types";

export const useLogin = () => {
  return useMutation({
    mutationFn: (userData: UserData) => signIn(userData),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};
