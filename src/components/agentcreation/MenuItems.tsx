import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addNode } from "../../redux/nodeSlice/nodeSlice";
import { RootState } from "../../redux/store";
import { agentFlowMenuItems } from "../../constants/agentFlowMenuItems";
import { EmailConfigurationLLM, fetchModelParameters, nodeListData } from "../../nodes/utils/nodedata";
import { getSubmenuList } from "../../services/agentFlowServices";

interface Model {
  id: number;
  model_name: string;
  url: string;
  library_details: string;
  thumbnail: string;
  model_type: string;
}

const groupModelsByType = (menuData: Model[]) => {
  return menuData.reduce((acc: Record<string, Model[]>, model) => {
    const type = model.model_type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(model);
    return acc;
  }, {});
};

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const allNodes = useSelector((state: RootState) => state.nodes);
  const dispatch = useDispatch();
  const selectedBotName = useSelector((state: RootState) => state.selectBot);
  const mailBotSelected = selectedBotName?.selectedBot === "Email_Bot";

  const toggleMenu = (id: number) => {
    setMenuItems((prev: any) =>
      prev.map((item: any) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const handleAddNode = async (subMenu: any) => {
    const nodeTemplate: any = nodeListData.find(
      (node: any) => node.nodetype === subMenu.model_type
    );

    if (!nodeTemplate) {
      console.error("Node template not found for type:", subMenu.model_type);
      return;
    }

    const fields = await fetchModelParameters(subMenu.id);
    const newNode = {
      ...nodeTemplate,
      id: uuidv4(),
      data: {
        ...nodeTemplate.data,
        title: subMenu.model_name,
        nodeIcon: "",
        fields,
      },
    };

    const isDuplicate = allNodes.find(
      (nodeItem: any) => nodeItem.nodetype === nodeTemplate?.nodetype
    );

    if (isDuplicate) {
      alert("This type of node already exists");
      return;
    }

    dispatch(addNode(newNode));
  };
  useEffect(() => {
    (async () => {
      const menuData = await getSubmenuList();
      const grouped = groupModelsByType(menuData);
      const menuitem = agentFlowMenuItems(grouped);
      setMenuItems(menuitem);
    })();
  }, [selectedBotName.selectedBot]);

  const filterData = mailBotSelected ? menuItems.filter((elem: any) => elem.label === "LLM Models") : menuItems

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {filterData.map((menu: any) => (
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
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
