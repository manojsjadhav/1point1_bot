import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Drag from "../../assets/componentmenuicon/Drag.svg";
import {
  agentFlowMenuItems,
  chatAgentFlowMenuItems,
  groupedByTypes,
} from "../../constants/agentFlowMenuItems";
import { fetchModelParameters, nodeListData } from "../../nodes/utils/nodedata";
import { getSubmenuList } from "../../services/agentFlowServices";
import { useReactFlow } from "@xyflow/react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const selectedBotName = useSelector((state: RootState) => state.selectBot);
  const { addNodes, getNodes } = useReactFlow();
  const toggleMenu = (id: number) => {
    setMenuItems((prev: any) =>
      prev.map((item: any) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };
  const handleAddNode = async (subMenu: any) => {
    const getAllNodes: any = getNodes();
    console.log({ getAllNodes });
    let node: any = nodeListData.find(
      (node: any) => node.nodetype === subMenu.model_type
    );
    const fields = await fetchModelParameters(subMenu.id);
    console.log({ fields });
    node.data.title = subMenu.model_name;
    node.data.nodeIcon = subMenu.thumbnail;
    node.data.fields = fields;
    console.log({ node });
    const isCheckNode = getAllNodes.some(
      (nodeItem: any) => nodeItem?.nodetype === node?.nodetype
    );
    if (isCheckNode) {
      alert("This type of node already exist");
    } else {
      addNodes({ ...node, id: uuidv4() });
    }
  };

  useEffect(() => {
    (async () => {
      if (selectedBotName?.selectedBot === "Voice_Bot") {
        const menuData = await getSubmenuList();
        const groupedByType = groupedByTypes(menuData);
        const menuitem = agentFlowMenuItems(groupedByType);
        setMenuItems(menuitem);
      } else if (selectedBotName?.selectedBot === "Chat_Bot") {
        const menuData = await getSubmenuList(); // call chat menuitem api
        const groupedByType = groupedByTypes(menuData);
        const menuitem = chatAgentFlowMenuItems(groupedByType);
        setMenuItems(menuitem);
      }
    })();
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {menuItems.map((menu: any) => (
        <React.Fragment key={menu.id}>
          <Box
            onClick={() => toggleMenu(menu.id)}
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "40px",
              px: 1.5,
              backgroundColor: menu.isActive ? "#2A2A33" : "transparent",
              border: menu.isActive
                ? "1px solid #FF581C"
                : "1px solid transparent",
              borderRadius: "6px",
              transition: "all 0.3s",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Box
                component="img"
                src={menu.startIcon}
                alt={menu.label}
                sx={{
                  width: 24,
                  height: 24,
                  color: menu.isActive ? "#F7F7F8" : "",
                }}
              />
              <Typography
                sx={{
                  fontFamily: "GeneralSans-m",
                  fontSize: "14px",
                  color: menu.isActive ? "#F7F7F8" : "#B8B9C1",
                }}
              >
                {menu.label}
              </Typography>
            </Box>
            <Box
              component="img"
              src={menu.isActive ? menu.endOpenIcon : menu.endCloseIcon}
              alt="toggle"
              sx={{
                width: 24,
                height: 24,
                color: menu.isActive ? "#F7F7F8" : "",
              }}
            />
          </Box>
          {menu.isActive && menu.subMenuItems.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {menu.subMenuItems.map((sub: any, i: any) => (
                <Box
                  key={i}
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "40px",
                    px: 1.5,
                    backgroundColor: "#2A2A33",
                    borderRadius: "6px",
                  }}
                  onClick={() => handleAddNode(sub)}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <Box
                      component="img"
                      src={sub.thumbnail}
                      alt={sub.model_name}
                      sx={{
                        width: 24,
                        height: 24,
                        color: menu.isActive ? "#F7F7F8" : "",
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "GeneralSans-m",
                        fontSize: "14px",
                        color: menu.isActive ? "#F7F7F8" : "#B8B9C1",
                      }}
                    >
                      {sub.model_name}
                    </Typography>
                  </Box>
                  <Box
                    component="img"
                    src={Drag}
                    alt="drag"
                    sx={{
                      width: 24,
                      height: 24,
                      color: menu.isActive ? "#F7F7F8" : "",
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default MenuItems;
