import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthConstextProvider } from "./context/AuthContext";
import { SearchConstextProvider } from "./context/SearchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthConstextProvider>
      <SearchConstextProvider>
        <App />
      </SearchConstextProvider>
    </AuthConstextProvider>
  </React.StrictMode>
);
