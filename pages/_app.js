import "../styles/globals.scss";
import ThemeProvider from "../context/ThemeProvider";
import AppstateProvider from "../context/AppstateProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AppstateProvider>
        <Component {...pageProps} />
      </AppstateProvider>
    </ThemeProvider>
  );
}

export default MyApp;
