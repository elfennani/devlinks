import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./tailwind.css";
import AppRouter from "./router";
import { Toaster } from "sonner";

// Register the router instance for type safety
// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <>
      <AppRouter />
      <Toaster
        richColors
        position="bottom-center"
        theme="dark"
        closeButton
        duration={5000}
      />
    </>
  );
}
