import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import UserProvider from "./context/User.tsx";
import { QueryProvider } from "./lib/react-query/QueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </QueryProvider>
  </StrictMode>
);
