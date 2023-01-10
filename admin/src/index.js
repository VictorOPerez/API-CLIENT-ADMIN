import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthConstextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthConstextProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </AuthConstextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
