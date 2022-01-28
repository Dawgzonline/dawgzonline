import React from "react";
import { brown } from "@mui/material/colors";
import { createTheme, ThemeProvider as Provider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "rgb(121,120,114)",
      main: "rgb(81,80,74)",
      dark: "rgb(61,60,54)",
      contrastText: "rgb(253,246,214)",
    },
    myprimary: {
      main: "rgb(121,120,114)",
      dark: "rgb(81,80,74)",
    },
    mytext: {
      main: "rgb(253,246,214)",
      background: "orange",
    },
    error: brown,
  },
  typography: {
    h1: {
      //Normal font
      fontFamily: "FranklinGothicBookRegular",
      fontSize: "2rem",
      fontWeight: 800,
    },
    h2: {
      //Curvy font
      fontSize: "5rem",
      fontWeight: 800,
    },
    h4: {
      fontFamily: "FranklinGothicHeavyRegular",
      fontSize: "1.5rem",
      fontWeight: 800,
    },
    subtitle1: {
      fontFamily: "FranklinGothicHeavyRegular",
      fontSize: "1rem",
      fontWeight: 800,
    },
    subtitle2: {
      fontFamily: "FranklinGothicBookRegular",
      fontSize: "1rem",
      fontWeight: 600,
    },
    body1: {
      fontFamily: "FranklinGothicBookRegular",
      fontSize: "0.8rem",
      fontWeight: 600,
    },
    body2: {
      fontFamily: "FranklinGothicBookRegular",
      fontWeight: 400,
      fontSize: "0.8rem",
    },
  },
});

export default function ThemeProvider({ children }) {
  return <Provider theme={theme}>{children}</Provider>;
}
