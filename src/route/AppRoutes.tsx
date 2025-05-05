import { Route, Routes } from "react-router-dom";
import PriveteRoute from "./PrivateRoute";
import BotPage from "../pages/BotPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import VoiceBotDashboard from "../pages/voicebot/dashboard/VoiceBotDashboard";
import AiAgent from "../pages/voicebot/aiAgent/AiAgent";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PriveteRoute>
            <BotPage />
          </PriveteRoute>
        }
      />
      <Route
        path="voicebot"
        element={
          <PriveteRoute>
             <VoiceBotDashboard />
          </PriveteRoute>
        }
      />
      <Route
        path="voicebot/ai-agents"
        element={
          <PriveteRoute>
            <AiAgent />
          </PriveteRoute>
        }
      />
      <Route
        path="voicebot/conversation-history"
        element={
          <PriveteRoute>
            <AiAgent />
          </PriveteRoute>
        }
      />
      <Route
        path="voicebot/call-data"
        element={
          <PriveteRoute>
            <AiAgent />
          </PriveteRoute>
        }
      />
      <Route
        path="voicebot/call-monitoring"
        element={
          <PriveteRoute>
            <AiAgent />
          </PriveteRoute>
        }
      />
      <Route
        path="voicebot/reports"
        element={
          <PriveteRoute>
            <AiAgent />
          </PriveteRoute>
        }
      />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRoutes;
