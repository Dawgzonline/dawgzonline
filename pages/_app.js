import "../styles/globals.scss";
import ThemeProvider from "../context/ThemeProvider";
import AppstateProvider from "../context/AppstateProvider";
import AuthProvider from "../context/AuthProvider";
import UtilityProvider from "../context/UtilityProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppstateProvider>
          <UtilityProvider>
            <Component {...pageProps} />
          </UtilityProvider>
        </AppstateProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
