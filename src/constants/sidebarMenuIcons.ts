import Group from "../assets/Group.svg";
import dextop from "../assets/dextop.svg";
import Headphoneicon from "../assets/Headphoneicon.svg";
import graph from "../assets/graph.svg";
import Vector from "../assets/Vector.svg";
import watch from "../assets/watch.svg";
import mailBot from "../assets/MailBot.svg";
import Chat from "../assets/Chat.svg";

export const voiceSidbarMenu = [
  { label: "Dashboard", icon: Group, path: "/voicebot" },
  { label: "AI Agents", icon: Headphoneicon, path: "/voicebot/ai-agents" },
  {
    label: "Conversation History",
    icon: watch,
    path: "/voicebot/conversation-history",
  },
  { label: "Call Data", icon: Vector, path: "/voicebot/call-data" },
  { label: "Call Monitoring", icon: dextop, path: "/voicebot/call-monitoring" },
  { label: "Reports", icon: graph, path: "/voicebot/reports" },
];
export const chatSidbarMenu = [
  { label: "Dashboard", icon: Group, path: "/chatbot" },
  { label: "AI Agents", icon: Headphoneicon, path: "/chatbot/ai-agents" },
  { label: "Chat", icon: Chat, path: "/chatbot/chat" },
  { label: "Reports", icon: graph, path: "/voicebot/reports" },
];
export const emailSidbarMenu = [
  { label: "Dashboard", icon: Group, path: "/emailBot" },
  {
    label: "AI Agents",
    icon: Headphoneicon,
    path: "/emailBot/emailBotAIAgents",
  },
  {
    label: "Mail Bot Selection",
    icon: mailBot,
    path: "/emailBot/emails",
  },
  { label: "Reports", icon: graph, path: "/voicebot/reports" },
];
