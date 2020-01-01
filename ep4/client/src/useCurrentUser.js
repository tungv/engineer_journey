import { useContext, createContext } from "react";

export const UserContext = createContext();
export default function useCurrentUser() {
  return useContext(UserContext);
}
