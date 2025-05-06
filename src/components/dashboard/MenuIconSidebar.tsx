import Group from "../../assets/Group.svg";
import dextop from "../../assets/dextop.svg";
import Headphoneicon from "../../assets/Headphoneicon.svg";
import graph from "../../assets/graph.svg";
import Vector from "../../assets/Vector.svg";
import watch from "../../assets/watch.svg";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const MenuIconSidebar = () => {
  const location = useLocation();
  const sidebarMenuIcon = [
    { label: "Dashboard", icon: Group, path: "/voicebot" },
    { label: "AI Agents", icon: Headphoneicon, path: "/voicebot/ai-agents" },
    {
      label: "Conversation History",
      icon: watch,
      path: "/voicebot/conversation-history",
    },
    { label: "Call Data", icon: Vector, path: "/voicebot/call-data" },
    {
      label: "Call Monitoring",
      icon: dextop,
      path: "/voicebot/call-monitoring",
    },
    { label: "Reports", icon: graph, path: "/voicebot/reports" },
  ];

  const navigate = useNavigate();

  return (
    <Box sx={{ width: "72px", height: "966px", background: "#18181B" }}>
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
              background:
                location.pathname === menu.path ? "#FF581C" : "",
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
