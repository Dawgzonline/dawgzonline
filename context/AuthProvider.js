import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { profile } from "../constant/constant";
import getLocalFetch, { setToken } from "../libs/fetch";

export const AuthContext = React.createContext({ user: null });

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState({});
  const router = useRouter();
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem(profile));
    if (localData?.token) {
      setToken(localData?.token);
      setUser(true);
    }
  }, []);

  const addToken = (token) => {
    setUser(false);
    localStorage.setItem(profile, JSON.stringify({ token }));
    setToken(token);
    setUser(true);
  };

  const logout = () => {
    router.push("/");
    localStorage.removeItem(profile);
    setUser(false);
    setUserData({});
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getLocalFetch().get("/api/user");
      setUserData(res.data);
    };
    if (user) {
      fetch();
    }
  }, [user]);

  const reload = async () => {
    const res = await getLocalFetch().get("/api/user");
    setUserData(res.data);
  };

  const value = {
    user,
    userData,
    addToken,
    logout,
    reload,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
