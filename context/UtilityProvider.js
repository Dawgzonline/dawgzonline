import { Backdrop, CircularProgress } from "@mui/material";
import React, { useState } from "react";

export const UtilityContext = React.createContext({});

export default function UtilityProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openLoading = () => {
    setOpen(true);
  };
  const closeLoading = () => {
    setOpen(false);
  };
  const value = {
    openLoading,
    closeLoading,
  };
  return (
    <UtilityContext.Provider value={value}>
      {children}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </UtilityContext.Provider>
  );
}
