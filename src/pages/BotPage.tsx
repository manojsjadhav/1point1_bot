import { Box, Button, Typography } from "@mui/material";
import onepointone from "../assets/onepointone.svg";
import BotType from "../components/BotType.tsx";
import voicebot from "../assets/voicebot.svg";
import chatbot from "../assets/chatbot.svg";
import emailbot from "../assets/emailbot.svg";
import voiceanalysistool from "../assets/voiceanalysistool.svg";
import Headphones from "../assets/Headphones.svg";
import bgImage from "../assets/bg.png";
const BotPage = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          px: "44px",
          paddingTop: "64px",
          paddingBottom: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "664px",
            display: "flex",
            flexDirection: "column",
            gap: "64px",
          }}
        >
          <Box>
            <Box sx={{ textAlign: "center" }}>
              <Box
                component="img"
                src={onepointone}
                alt="Onepointone logo"
                sx={{ width: 160, height: 43 }}
              />
            </Box>
            <Typography
              sx={{
                color: "#fff",
                textAlign: "center",
                fontFamily: "GeneralSans-r",
                fontSize: "24px",
              }}
            >
              Chatbot
            </Typography>
          </Box>
          <Box sx={{ color: "#fff" }}>
            <Typography
              sx={{
                fontFamily: "GeneralSans-r",
                fontSize: "14px",
                textAlign: "center",
                color: "#D9D9DE",
                mb: "34px",
              }}
            >
              Choose the right AI Agent to build—no code, just drag, drop, and
              deploy.
            </Typography>
            <Box
              sx={{
                display: "flex",
                mb: "18px",
                gap: "18px",
              }}
            >
              <BotType
                route="/voicebot"
                icon={voicebot}
                botName="Voice Bot"
                description="Build conversational voice agents with intuitive drag-and-drop tools. Deploy on calls, IVR systems, or virtual assistants. "
              />
              <BotType
                icon={chatbot}
                botName="Chat Bot"
                description="Create dynamic, context-aware chatbots for web, mobile, or messaging platforms. Deploy privately with ease."
              />
            </Box>
            <Box sx={{ display: "flex", mb: "34px", gap: "18px" }}>
              <BotType
                icon={emailbot}
                botName="Email Bot"
                description="Automate smart email workflows with powerful language models. Send, respond, and analyse emails-Quick setup, instant testing."
              />
              <BotType
                icon={voiceanalysistool}
                botName="Voice Analysis Tool"
                description="Analyse voice data with AI-driven insights. Detect intent, sentiment, and key moments from calls using our no-code flow builder. "
              />
            </Box>
          </Box>
          <Box sx={{}}></Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
          <Button
            sx={{
              background: "#2A2A33",
              textTransform: "none",
              borderRadius: "100px",
              display: "flex",
              alignItems: "center",
              fontSize: "12px",
              fontFamily: "5GeneralSans-m",
              color: "#B8B9C1",
              width: "113px",
            }}
          >
            <Box
              component="img"
              src={Headphones}
              alt="Google"
              sx={{ width: 24, height: 24, mr: "3px" }}
            />
            Help Center
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BotPage;
