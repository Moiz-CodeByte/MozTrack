import RootLayout from "./layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
