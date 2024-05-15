import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ReportProvider } from "./context/ReportContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ReportProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ReportProvider>
  </AuthProvider>
);
