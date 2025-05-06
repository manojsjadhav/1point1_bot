import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@xyflow/react/dist/style.css";
import AuthContext from "./providers/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import AgentContext from "./providers/AgentContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthContext>
            <AgentContext>
              <App />
            </AgentContext>
          </AuthContext>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
