import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import {
  chatSidbarMenu,
  emailSidbarMenu,
  voiceSidbarMenu,
} from "../../constants/sidebarMenuIcons";

const MenuIconSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedBotName = useSelector((state: RootState) => state.selectBot);
  const [sidebarMenuIcon, setSidebarMenuIcon] = useState<any>([]);


  useEffect(() => {
    if (selectedBotName?.selectedBot === "Voice_Bot") {
      setSidebarMenuIcon(voiceSidbarMenu);
    } else if (selectedBotName?.selectedBot === "Email_Bot") {
      setSidebarMenuIcon(emailSidbarMenu);
    } else if (selectedBotName?.selectedBot === "Chat_Bot") {
      setSidebarMenuIcon(chatSidbarMenu);
    } else if (selectedBotName?.selectedBot === "Voice_Analysis_Tool") {
      setSidebarMenuIcon(voiceSidbarMenu);
    }
  }, []);
    
  return (
    <Box sx={{ width: "72px", background: "#18181B" }}>
      <Box
        sx={{
          px: "20px",
          py: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {sidebarMenuIcon.map((menu: any, index: any) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "7px",
              width: "31px",
              height: "31px",
              background: location.pathname === menu.path ? "#FF581C" : "",
            }}
            onClick={() => navigate(menu.path)}
          >
            <Box
              component="img"
              src={menu.icon}
              alt="group"
              sx={{ width: 15.5, height: 15.5 }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MenuIconSidebar;
