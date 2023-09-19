import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
// import { GoogleOAuthProvider } from '@react-oauth/google';

import "@/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId="984597708696-an7j2dtntchg83f342rk2hg4so4j7vtj.apps.googleusercontent.com"> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>
);
