import React from "react";
import { brown } from "@mui/material/colors";
import {
  createTheme,
  ThemeProvider as Provider,
  StyledEngineProvider,
} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "rgb(121,120,114)",
      main: "rgb(81,80,74)",
      dark: "rgb(61,60,54)",
      contrastText: "rgb(253,246,214)",
    },
    secondary: {
      light: "rgb(232,230,213)",
      main: "rgb(206,202,174)",
      dark: "rgb(180,180,150)",
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
      fontFamily: "'Libre Franklin', 'sans-serif'",
      fontSize: "2rem",
      fontWeight: 800,
    },
    h2: {
      //Curvy font
      fontFamily: "'Libre Franklin', 'sans-serif'",
      fontSize: "5rem",
      fontWeight: 800,
    },
    h4: {
      fontFamily: "'Libre Franklin', 'sans-serif'",
      fontSize: "1.5rem",
      fontWeight: 800,
    },
    subtitle1: {
      fontFamily: "'Libre Franklin', 'sans-serif'",
      fontSize: "1.2rem",
      fontWeight: 600,
    },
    subtitle2: {
      fontFamily: "'Libre Franklin', 'sans-serif'",
      fontSize: "1rem",
      lineHeight: 1.2,
      fontWeight: 600,
    },
    body1: {
      fontFamily: "'Libre Franklin', 'sans-serif'",
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontFamily: "'Libre Franklin', 'sans-serif'",
      fontWeight: 400,
      fontSize: "0.8rem",
    },
  },
});

export default function ThemeProvider({ children }) {
  return (
    <StyledEngineProvider injectFirst>
      <Provider theme={theme}>{children}</Provider>
    </StyledEngineProvider>
  );
}
