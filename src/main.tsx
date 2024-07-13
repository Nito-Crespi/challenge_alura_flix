import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes";
import { GlobalProvider } from "./context/GlobalContext";
import GlobalStyles from "./components/GlobalStyles";

const rootElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <GlobalProvider>
      <GlobalStyles />
      <AppRoutes />
    </GlobalProvider>
  </React.StrictMode>
);
