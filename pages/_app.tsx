import { UserProvider } from "@auth0/nextjs-auth0";
import { theme } from "@ds/theme";
import { ThemeProvider } from "styled-components";
import { GoogleAnalytics } from "../packages/@initializers/google-analytics";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <GoogleAnalytics />
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;
