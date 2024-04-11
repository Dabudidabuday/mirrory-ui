import { createContext } from "react";

export const AuthContext = createContext({
  auth: {},
  set$auth: () => null,
});
