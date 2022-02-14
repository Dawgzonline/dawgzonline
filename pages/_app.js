import "../styles/globals.scss";
import ThemeProvider from "../context/ThemeProvider";
import AppstateProvider from "../context/AppstateProvider";
import AuthProvider from "../context/AuthProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppstateProvider>
          <Component {...pageProps} />
        </AppstateProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
