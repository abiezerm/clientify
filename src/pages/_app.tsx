import type { AppProps } from "next/app";
import "../styles/antdesign.less";
import { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";

function MyApp({ Component, pageProps }: AppProps) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(true);

  useEffect(() => {
    //TODO: Check if the redux store has a user token and redirect to dashboard
  }, []);

  return (
    <>
      {isUserAuthenticated ? (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      ) : (
        <div>Login Page</div>
      )}
    </>
  );
}
export default MyApp;
