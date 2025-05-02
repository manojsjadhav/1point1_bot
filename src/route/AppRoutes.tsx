import { Route, Routes } from "react-router-dom";
import PriveteRoute from "./PrivateRoute";
import BotPage from "../pages/BotPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import VoiceBot from "../pages/voicebot/VoiceBot";

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
            <VoiceBot />
          </PriveteRoute>
        }
      />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRoutes;
