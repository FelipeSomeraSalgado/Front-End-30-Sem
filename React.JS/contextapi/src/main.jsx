import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UsuarioProvider from "./context/UsuarioProvider.jsx";
import ProdutoProvider from "./context/ProdutoProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UsuarioProvider>
      <ProdutoProvider>
        <App />
      </ProdutoProvider>
    </UsuarioProvider>
  </StrictMode>,
);