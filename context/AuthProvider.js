import React, { useState, useEffect } from "react";
import { profile } from "../constant/constant";
import { setToken} from "../libs/fetch";

export const AuthContext = React.createContext({ user: null });

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem(profile));
    if(localData?.token){
      setToken(localData?.token);
      setUser(true);
    }
  }, []);

  const addUser = (data) => {
    setUser(data);
  };
  const addToken = (token) => {
    localStorage.setItem(
      profile,
      JSON.stringify({ token })
    );
    setToken(token);
    setUser(true);
  };

  const value = {
    user,
    addUser,
    addToken,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
