import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@xyflow/react/dist/style.css";
import AuthContext from "./providers/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <AuthContext>
        <App />
      </AuthContext>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
