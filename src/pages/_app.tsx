import type { AppProps } from "next/app";
import "../styles/antdesign.less";
import { useState } from "react";

import AdminLayout from "../components/AdminLayout";

function MyApp({ Component, pageProps }: AppProps) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(true);

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
