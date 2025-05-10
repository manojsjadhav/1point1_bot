import { useEffect } from "react";
import AgentCreationNavban from "../agentcreation/AgentCreationNavbav";
import MenuIconSidebar from "../dashboard/MenuIconSidebar";
import { Box } from "@mui/material";
import { setSelectedBotName } from "../../redux/nodeSlice/selectBotSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

export const Layout = ({ children }: any) => {
  const dispatch = useDispatch<AppDispatch>()

  const selectedBotName = localStorage.getItem("selectedBotName");

  useEffect(() => {
    dispatch(setSelectedBotName(selectedBotName))
  }, [])
  
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
            // maxWidth: "10%",
            height: "100%",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
