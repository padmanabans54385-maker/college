import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App";
import { AuthProvider } from "./hooks/AuthContext";
import { LanguageProvider } from "./hooks/LanguageContext";
import { SettingsProvider } from "./hooks/SettingsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>
);
