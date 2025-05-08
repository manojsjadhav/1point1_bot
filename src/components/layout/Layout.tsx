import AgentCreationNavban from "../agentcreation/AgentCreationNavbav";
import MenuIconSidebar from "../dashboard/MenuIconSidebar";
import { Box } from "@mui/material";

export const Layout = ({ children }: any) => {
  return (
    <div>
      <AgentCreationNavban />
      <Box sx={{ display: "flex", width: "100%" }}>
        <MenuIconSidebar />
        {children}
      </Box>
    </div>
  );
};
