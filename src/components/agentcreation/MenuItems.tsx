import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addNode } from "../../redux/nodeSlice/nodeSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { agentFlowMenuItems } from "../../constants/agentFlowMenuItems";
import { nodeListData } from "../../nodes/utils/nodedata";

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState(agentFlowMenuItems);
  const allNodes = useSelector((state: RootState) => state.nodes);
  const dispatch = useDispatch();

  const toggleMenu = (id: number) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };
  const handleAddNode = (nodeName: any) => {
    const node: any = nodeListData.find(
      (node: any) => node.data.title === nodeName
    );
    const isCheckNode = allNodes.find(
      (nodeItem: any) => nodeItem.nodetype === node?.nodetype
    );
    if (isCheckNode) {
      alert("This type of node already exist");
    } else {
      dispatch(addNode({ ...node, id: uuidv4() }));
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {menuItems.map((menu) => (
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

          {/* Submenu */}
          {menu.isActive && menu.subMenuItems.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {menu.subMenuItems.map((sub, i) => (
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
                  onClick={() => handleAddNode(sub.label)}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <Box
                      component="img"
                      src={sub.startIcon}
                      alt={sub.label}
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
                      {sub.label}
                    </Typography>
                  </Box>
                  <Box
                    component="img"
                    src={sub.endIcon}
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
