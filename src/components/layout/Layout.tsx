import AgentCreationNavban from "../agentcreation/AgentCreationNavbav";
import MenuIconSidebar from "../dashboard/MenuIconSidebar";
import { Box } from "@mui/material";

export const Layout = ({ children }: any) => {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <AgentCreationNavban />
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <MenuIconSidebar />
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            height: "100%",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
