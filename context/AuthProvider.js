import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { profile } from "../constant/constant";

export const AuthContext = React.createContext({ user: null });

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const fetchRef = useRef();
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem(profile));
    fetchRef.current = axios.create({
      baseURL: "/",
      headers:
        localData && localData.token
          ? {
              Authorization: `Bearer ${localData.token}`,
            }
          : {},
    });
  }, []);

  const addUser = (data) => {
    setUser(data);
  };
  const addToken = (token) => {
    localStorage.setItem(
      profile,
      JSON.stringify({ token })
    );
    fetchRef.current = axios.create({
      baseURL: "/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser({});
  };

  const value = {
    user,
    fetch: fetchRef.current,
    addUser,
    addToken,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
