import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/api";

const initialUser = {
  id: "",
  username: "",
};

type UserType = {
  id: string;
  username: string;
};

type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  checkUserAuth: () => Promise<boolean>;
};

const initialUserState = {
  user: initialUser,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isLoading: true,
  setIsLoading: () => {},
  checkUserAuth: async () => false as boolean,
};

const UserContext = createContext<UserContextType>(initialUserState);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>(initialUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
  //   const val = localStorage.getItem("isAuth");
  //   return val ? JSON.parse(val) : false;
  // });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  //Async func for fetching current user via token
  const checkUserAuth = async () => {
    setIsLoading(true);
    try {
      const fetchUser = await getCurrentUser();

      if (fetchUser) {
        setUser({
          id: fetchUser._id,
          username: fetchUser.username,
        });
        setIsAuthenticated(true);

        return true;
      }

      setIsAuthenticated(false);
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("isAuth", JSON.stringify(isAuthenticated));
  // }, [isAuthenticated]);

  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
    checkUserAuth,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;

export const useUserContext = () => useContext(UserContext);
