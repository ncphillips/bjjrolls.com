import { GoogleAnalytics } from "../packages/@initializers/google-analytics";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
