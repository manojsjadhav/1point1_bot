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
    <div>
      <AgentCreationNavban />
      <Box sx={{ display: "flex", width: "100%" }}>
        <MenuIconSidebar />
        {children}
      </Box>
    </div>
  );
};
