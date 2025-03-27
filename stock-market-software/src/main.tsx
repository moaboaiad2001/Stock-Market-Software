import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styling/index.css";
import "./styling/Navbar.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./utils/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
