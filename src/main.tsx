import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// Contexts
import { MessageProvider } from "@root/contexts/messageProvider.tsx";
// Styles
import "./index.css";
import "antd/dist/reset.css";
// Components
import { ThemeSwitcher } from "@root/components/theme-switcher/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MessageProvider>
      <App />
      <div className="fixed bottom-5 left-[25px]">
        <ThemeSwitcher />
      </div>
    </MessageProvider>
  </StrictMode>
);
