import { Box } from "@mui/material";
import AgentCreationNavban from "./../../components/agentcreation/AgentCreationNavbav";
import ComponentMenu from "../../components/agentcreation/VoiceAgentFlow";
import MenuIconSidebar from "../../components/dashboard/MenuIconSidebar";

const VoiceBot = () => {
  return (
    <div>
      <AgentCreationNavban />
      <Box sx={{ display: "flex",width:"100%" }}>
        <MenuIconSidebar />
        <ComponentMenu />
      </Box>
    </div>
  );
};

export default VoiceBot;
