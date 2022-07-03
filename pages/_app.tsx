import { UserProvider } from "@auth0/nextjs-auth0";
import { GoogleAnalytics } from "../packages/@initializers/google-analytics";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
