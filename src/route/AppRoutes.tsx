import { Route, Routes } from "react-router-dom";
import PriveteRoute from "./PrivateRoute";
import BotPage from "../pages/BotPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import VoiceBotDashboard from "../pages/voicebot/dashboard/VoiceBotDashboard";
import AiAgent from "../pages/voicebot/aiAgent/AiAgent";
import ConversationHistory from "../pages/voicebot/conversationHistory/ConversationHistory";
import { ToastContainer } from "react-toastify";
import ContactGroups from "../pages/voicebot/contanctGroups/ContactGroups";
import EmailBotDashboard from "../pages/voicebot/dashboard/EmailBotDashboard";
import EmailBotAIAgent from "../pages/emailBot/emailBotAiAgent/EmailBotAIAgent";
import EmailConversation from "../pages/emailBot/EmailComponent/EmailConversation";
import ChatbotDashboard from "../pages/chatbot/dashboard/ChatbotDashboard";
import ChatBotAiAgent from "../pages/chatbot/aiAgent/ChatBotAiAgent";
import TestBot from "../pages/chatbot/aiAgent/TestBot";
import AiAgentFlow from "../pages/chatbot/aiAgent/AiAgentFlow";
import AiVoiceAgentFlow from "../pages/voicebot/aiAgent/AiVoiceAgentFlow";
import Chat from "../pages/chatbot/chatmessage/Chat";

const AppRoutes = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
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
          path="voicebot/ai-agents/:id"
          element={
            <PriveteRoute>
              <AiVoiceAgentFlow />
            </PriveteRoute>
          }
        />
        <Route
          path="voicebot/conversation-history"
          element={
            <PriveteRoute>
              <ConversationHistory />
            </PriveteRoute>
          }
        />
        <Route
          path="voicebot/call-data"
          element={
            <PriveteRoute>
              <ContactGroups />
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
        <Route
          path="emailBot"
          element={
            <PriveteRoute>
              <EmailBotDashboard />
            </PriveteRoute>
          }
        />

        <Route
          path="emailBot/emailBotAIAgents"
          element={
            <PriveteRoute>
              <EmailBotAIAgent />
            </PriveteRoute>
          }
        />

        <Route
          path="emailBot/emails"
          element={
            <PriveteRoute>
              <EmailConversation />
            </PriveteRoute>
          }
        />

        <Route
          path="chatbot"
          element={
            <PriveteRoute>
              <ChatbotDashboard />
            </PriveteRoute>
          }
        />
        <Route
          path="chatbot/ai-agents"
          element={
            <PriveteRoute>
              <ChatBotAiAgent />
            </PriveteRoute>
          }
        />
        <Route
          path="chatbot/ai-agents/:id"
          element={
            <PriveteRoute>
              <AiAgentFlow />
            </PriveteRoute>
          }
        />
        <Route
          path="chatbot/ai-agents/testbot/:id"
          element={
            <PriveteRoute>
              <TestBot />
            </PriveteRoute>
          }
        />
        <Route
          path="chatbot/chat"
          element={
            <PriveteRoute>
              <Chat />
            </PriveteRoute>
          }
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
