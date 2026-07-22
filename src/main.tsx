import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import SmoothScroll from "./components/SmoothScroll.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <SmoothScroll>
    <App />
  </SmoothScroll>,
);
