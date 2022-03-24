import {
  Backdrop,
  CircularProgress,
  Snackbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";

export const UtilityContext = React.createContext({});

export default function UtilityProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [snakebar, setSnakebar] = useState({ open: false, msg: "" });
  const openLoading = () => {
    setOpen(true);
  };
  const closeLoading = () => {
    setOpen(false);
  };
  const openSnakebar = (msg) => {
    setSnakebar({ open: true, msg });
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {
          setSnakebar({ open: false, msg: "" });
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const value = {
    openLoading,
    closeLoading,
    openSnakebar,
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
      <Snackbar
        open={snakebar.open}
        autoHideDuration={6000}
        onClose={() => {
          setSnakebar({ open: false, msg: "" });
        }}
        message={snakebar.msg}
        action={action}
      />
    </UtilityContext.Provider>
  );
}
