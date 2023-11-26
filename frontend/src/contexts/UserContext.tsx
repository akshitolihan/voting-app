import { createContext, useContext } from "react";

export const UserContext = createContext({
  user:"aadlkoi2094",
});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = UserContext.Provider;
