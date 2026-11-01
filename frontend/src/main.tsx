import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.css"; // tokens + Tailwind + fonte DM Sans

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
